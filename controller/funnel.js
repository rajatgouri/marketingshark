const Funnel = require('../models/Funnel');
const Template = require('../models/Template');
const Step = require('../models/FunnelStep');
const PageTemplate = require('../models/pageTemplate');
const PaymentIntegration = require('../models/paymentIntegration');
const fs = require('fs');
const path = require('path');
const awsController = require('./awsController');
const config = require('../config');
const { resolve } = require('path');



exports.getMyFunnel = async (req, res) => {
  try {
    const funnels = await Funnel.find({
        userId: req.session.user._id
      })
      .populate({
          'path': 'steps'
      })

      return res.render('Pages/funnel', {
        funnel: funnels,
      });
                
  } catch (err) {
    console.log(err);
  }
};

exports.getFunnelHome = async (req, res) => {
  try {
    const { funnelId } = req.params;
    
    
    const stepId = req.query.stepid;
    const funnel = await Funnel.findById(funnelId).populate([
      {
        path: 'steps',
        model: 'funnelStep',
      },
    ]);

    const step = await Step.findById(stepId);
    // console.log(stepId)
    // console.log(funnel)
    if (funnel && step) {
      // req.session.temp = funnel.pathLanding
      req.session.tempPath =  funnel.steps.pathFolder + '/' + funnel.steps.stepName + '.html';
      
      await req.session.save();
      let pages = []
      let optIn =  await PageTemplate.find({type: 'Opt-in-page'}).limit(10)
      let confirmation =  await PageTemplate.find({type: 'Confirmation-page'}).limit(10);
      
      pages.push({type: 'Opt in Pages', pages: optIn })
      pages.push({type: 'Confirmation Pages', pages: confirmation })


      PaymentIntegration.find({userId: req.session.user._id})
        .then((data) => {
          console.log(data)
            return res.render('Pages/funnel_home', {
              funnel,
              step,
              pages,
              payments: data
            });
        })
        .catch(err => {
          console.log(err)
         return res.redirect('/templates');
        
        })

    }
  } catch (err) {
    console.log(err);
  }
};


exports.getPages = (req,res,next) => {
  try {
    const { type, total } = req.body;
    
    let skipped = +total;

    PageTemplate
      .find({type: type})
      .skip(skipped)
      .limit(10)
      .then((pages) => {
        return res.status(200).json({'msg':'pages fetch successsfully', pages:  pages, total: pages.length})
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Something went wrong!'})
      })

  } catch (err) {
    console.log(err);
  }
}

exports.addFunnelName = async (req, res) => {
  try {

    var tempid = '',
      template;
    const { name, tempId } = req.body;


    if (!tempId) {
      template = await Template.findOne({ name: 'narrow-jumbotron' });
      if (template) {
        tempid = template.id;
      }
    } else {
      tempid = tempId;
    }

    const isMatch = await Funnel.findOne({ funnelname: name });

    if (isMatch) {
      return res.status(401).json({ msg: 'Name is Already Taken' });
    }


    Template
      .findById(tempid)
      .populate('steps.pageId')
      .then(async (template) => {

        const folder = `${name}${req.session.user._id}`


          var stepInfo = new Promise((resolve, reject) => {
          var steps = [];

          template.steps.forEach(async step => {
            let funnelStep = await awsController.readAws(config.bucket.pageBucket, step.pageId.path);
            let filePath = `/${step.pageId.name}.html`
            let page = await awsController.uploadAws(config.bucket.funnelBucket, (folder + filePath), funnelStep.Body, funnelStep.ContentType);
            
            fs.mkdir(
              path.join(__dirname, '../funnels', `${name}${req.session.user._id}`),
              () => {
                fs.createWriteStream(
                  path.join(
                    __dirname,
                    `../funnels/${name}${req.session.user._id}`,
                    filePath
                  )
                ).write(funnelStep.Body);
              })


            const newStep = new Step({
              stepName: step.pageId.name,
              stepUrl: config.pageLocation + page.Key,
              pathLanding: `funnels/${name}${req.session.user._id}${filePath}`,
              pathFolder: `funnels/${name}${req.session.user._id}`,
              thumbnail: step.pageId.thumbnail,
              type: step.pageId.type,
              stepNumber: `${template.steps.indexOf(step) + 1}`,
            });

            stepDetails = await newStep.save();
            steps.push(stepDetails);

            if (steps.length === template.steps.length) {
      
              let arr = steps
                .sort((a,b) => a.stepNumber - b.stepNumber)
                .map((step) => step._id)

              resolve(arr);
            }
          })
        })

        var steps = (await stepInfo);

        const newFunnel = new Funnel({
          funnelname: name,
          funnelUrl: path.join(config.bucket.funnelBucket, folder),
          userId: req.session.user._id,
          steps: steps,
          thumbnail: template.thumbnail,
          funnelPath: `funnels/${name}${req.session.user._id}`,
        });

        return newFunnel.save();
      })
      .then((funnel) => {
        return res.status(200).json({ id: funnel._id, stepid: funnel.steps[0] });
      })
      
      .catch(err => {
        console.log(err);
        return res.status(401).json({ msg: 'Something Went Wrong in Finding Template' });
      })

  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};


exports.addStep = async (req, res) => {
  try {
    let {name, page,  funnelId} = req.body;

    let newPage = '';
    
    if (page) {
      newPage = await PageTemplate.findById(page)
    } else {
      let template = await Template.findOne({name: 'narrow-jumbotron'});
      newPage = await PageTemplate.findById(template.steps[0].pageId._id)
    }

    const funnel = await Funnel
      .findById(funnelId)
      .populate({
        'path':'funnelId',
        'model': 'Funnel',
        'populate': {
          'path': 'steps'
        }
      });

    name = name + '_' + new Date().getTime();
    const folder = `${funnel.funnelname}${req.session.user._id}`
    let funnelStep = await awsController.readAws(config.bucket.pageBucket, newPage.path);
    let filePath = `/${name}.html`
    let createdPage = await awsController.uploadAws(config.bucket.funnelBucket, (folder + filePath), funnelStep.Body, funnelStep.ContentType);
        
    const newStep = new Step({
      stepName: name,
      stepUrl: config.funnelLocation + createdPage.Key,
      pathLanding: `funnels/${funnel.funnelname}${req.session.user._id}${filePath}`,
      pathFolder: `funnels/${funnel.funnelname}${req.session.user._id}`,
      thumbnail: newPage.thumbnail,
      type: newPage.type,
      stepNumber: `${funnel.steps.length + 1}`,
    });

    const step = await newStep.save();
    funnel.steps.push(step._id)
    funnel.save();

    fs.createWriteStream(
      path.join(
        __dirname,
        `../funnels/${funnel.funnelname}${req.session.user._id}`,
        filePath
      )
    ).write(funnelStep.Body, (err) => {
        return res.redirect(`/funnel_home/${funnel._id}?stepid=${funnel.steps[0]}`);
    });


  } catch (err) {
    console.log(err);
  }
};

exports.deleteSteps = async (req, res) => {
  try {
    const stepId = req.params.stepId;

    const funnelId = req.params.funnelId;
    const step = await Step.findById(stepId);
    const funnel = await Funnel.findById(funnelId);
    
    if (step && funnel ) {
      
      let filePath = path.join(__dirname, `../${step.pathLanding}`) 

      let key = step.pathLanding.split('funnels/')[1]
      const updatedSteps = funnel.steps.filter((i) => i.toString() !== step._id.toString())
      console.log(updatedSteps)
      if(updatedSteps.length < 1) {
        return res.status(500).json({'msg': "Can't delete if only One step Exist"})

      }


      for (let i=0; i< updatedSteps.length;i++) {
          let s = await Step.findById(updatedSteps[i])
          s.stepNumber = i+1;
          s.save();
      }

      funnel.steps = updatedSteps;
      funnel.save();
      
      
      fs.unlink(filePath, (err) => {
        if(err) throw err
        console.log('step deleted successfully!')
      })



      awsController
        .deleteAws(config.bucket.funnelBucket, key)
        .then(async () => {
            return  await Step.findByIdAndDelete(step._id)
        })
        .then((response) => {
          return res.status(200).json({'msg': 'file is deleted', stepId: funnel.steps[0]})
        })
        .catch(err => {
          console.log('Error in Deleting Step')
        })

    } else {
      console.log('no step or funnel');
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteFunnel = (req, res) => {
  try {
    const { funnelId } = req.params;

    fs.readdir(
      path.join(__dirname, `../${req.session.tempPath.slice(0, -11)}`),
      async (err, file) => {
        if (err) throw err;
        file.map((f) => {
          fs.unlinkSync(
            path.join(
              __dirname,
              `../${req.session.tempPath.slice(0, -11)}/${f}`
            )
          );
        });
        fs.rmdirSync(
          path.join(__dirname, `../${req.session.tempPath.slice(0, -11)}`)
        );
        await Funnel.findByIdAndRemove(funnelId);
        req.session.tempPath = undefined;
        await req.session.save();
        return res.send('Deleted');
      }
    );
  } catch (err) {
    console.log(err);
  }
};

