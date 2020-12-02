const Template = require('../models/Template');
const PageTemplate = require('../models/pageTemplate');
const funnelStep = require('../models/FunnelStep');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const awsController = require('./awsController');


exports.getTemplate = async (req, res) => {
  try {
    const stdLead2 = await Template.find({'categoryId': 'STDLEAD-2'}).populate('steps.pageId').sort([['createdAt', -1]]).limit(3);
    const giveway2 = await Template.find({'categoryId': 'GIVEWAY-2'}).populate('steps.pageId').sort([['createdAt', -1]]).limit(3);
    const stdSales3 = await Template.find({'categoryId': 'STDSALES-3'}).populate('steps.pageId').sort([['createdAt', -1]]).limit(3); 
    res.render('Pages/templates', {
      stdLead2: stdLead2,
      giveway2: giveway2,
      stdSales3: stdSales3
    });
  } catch (err) {
    console.log(err);
  }
};


exports.getCategoryTemplate = (req,res,next) => {
  const {id, total} = req.body;

  let skip = parseInt(total)
  Template
    .find({'categoryId': id})
    .skip(skip)
    .sort([['createdAt', -1]])
    .limit(3)
    .then((templates) => {
      console.log()
      return res.status(200).json({'msg': 'templates fetched succesfully!' , templates: templates})
    })
    .catch(err => {
      return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Error in Fetching templates'})
    })

}

exports.getEditor = async (req, res) => {
  try {
    
    let id = req.query.page;
    funnelStep
      .findById(id)
      .then(async (funnel) => {
        if(!funnel) {
          return res.redirect('/templates')
        }

        req.session.tempPath = funnel.pathLanding;
        await req.session.save();

        return res.render('editor', {
          pageId: funnel._id,
          path: funnel.pathLanding,
          type: funnel.type,
          userId: req.session.user._id,
        });
        
      })
      .catch(err => {
        console.log(err)
      })

    // await req.session.save();
    // if (!path) {
    //   path = null;
    // }
    // return res.render('editor', {
    //   path,
    //   type,
    //   userId: req.session.user._id,
    // });
  } catch (err) {
    console.log(err);
  }
};

exports.saveTemplate = async (req, res, next) => {
  try {
    const p = req.session.tempPath;
    const funnelBucket = config.bucket.funnelBucket;

      var stream = fs.createWriteStream(p, {
        flags: 'w',
        encoding: 'utf8'
      });    
 
      stream.once('open', async function (fd) {  
        
        var html = req.body.html;
        stream.end(html);
  
        let fileContent = fs.readFileSync(path.join(__dirname , `../${p}`))
        let filePath = p.split('funnels/')[1];
  
        let fileDetails = await awsController.uploadAws(funnelBucket, filePath, fileContent, 'text/html');
        return res.send('okk');
      
  
      });
    

  } catch (err) {
    console.log(err);
  }
};

exports.addTemplate = async (req,res,next) => {
  try {
    const { name, categoryId, completefunnel } = req.body;

    const thumbnailBucket = config.bucket.thumbnail;
    var thumbnail = req.file;


    if (!thumbnail) {
      return res.status(400).json({'error': 'INVALID_THUMBNAIL', 'msg': 'Please select thumbnail type of jpg/png/jpeg', statsu: false});
    }

    if (thumbnail.size > 500000) {
      fs.unlinkSync(thumbnail.path);
      return res.status(400).json({'error': 'SIZE_EXCEED', 'msg': 'Please select thumbnail of size less than 500KB', statsu: false});
    }   

    const thumbnailContent = fs.readFileSync(thumbnail.path);
    const thumbnailPath = thumbnail.filename;

    let thumbnailDetails = await awsController.uploadAws(thumbnailBucket, thumbnailPath, thumbnailContent, '.jpg');
    console.log(thumbnailDetails)
    
    const template = new Template({
      name: name,
      categoryId: categoryId,
      steps: [],
      thumbnail: config.thumbnail + thumbnailDetails.Key,
      completefunnel: completefunnel
    });

    fs.unlinkSync(thumbnail.path);
    template
      .save()
      .then(() => {

        return res.status(200).json({ 'msg': 'Template added Successfully!', status: true,  templateId: template._id})

      })
      .catch(err => {
        console.log(err)
        return res.status(400).json({ 'error': 'INTERNAL_Server', 'msg': 'Error in saving Template', status: false })

      }) 

  } catch (err) {
    console.log(err);

  } 
}


exports.getAdminTemplates = (req,res,next) => {
  Template
    .find()
    .then((data) => {
      return res.status(200).json({data: data})
    })
    .catch(err => {
      return res.status(500).json({'error': 'error in getting templates'})
    })
}

exports.updateTemplate = (req,res,next) => {
  
  const {id, name, categoryId} = req.body;


  let updated = {}
  if (name) {
    updated['name'] = name
  } else if (categoryId) {
    updated['categoryId']= categoryId
  }


  Template
    .findByIdAndUpdate(id, updated)
    .then(() => {
      return res.status(200).json({'msg': 'template updated successfully!'})
    })
    .catch(err => {
      return res.status(500).jsno({'error': 'Error in Updating template'})
    })
}

exports.addPageTemplate = async (req, res, next) => {
  try {
    const { templateId, name, type , pageNumber} = req.body;
    const pageBucket = config.bucket.pageBucket;
    const thumbnailBucket = config.bucket.thumbnail;

    var file = req.files.file;
    var thumbnail = req.files.thumbnail;


    if ((!file)) {
      return res.status(400).json({'error': 'INVALID_FILE', 'msg': 'Please select file type of Html', statsu: false});
    } else if (!thumbnail) {
      return res.status(400).json({'error': 'INVALID_THUMBNAIL', 'msg': 'Please select thumbnail type of jpg/png/jpeg', statsu: false});
    }

    if (thumbnail[0].size > 500000) {
      fs.unlinkSync(file[0].path);
      fs.unlinkSync(thumbnail[0].path);
      return res.status(400).json({'error': 'SIZE_EXCEED', 'msg': 'Please select thumbnail of size less than 500KB', statsu: false});
    }   

    file = file[0];
    thumbnail = thumbnail[0];

    const fileContent = fs.readFileSync(file.path);
    const thumbnailContent = fs.readFileSync(thumbnail.path);

    const filePath = file.filename+ '.html';
    const thumbnailPath = thumbnail.filename + '.jpg';

    let fileDetails = await awsController.uploadAws(pageBucket, filePath, fileContent, 'text/html');
    // console.log(fileDetails)

    let thumbnailDetails = await awsController.uploadAws(thumbnailBucket, thumbnailPath, thumbnailContent, 'image/jpg');
    // console.log(thumbnailDetails)

    const pageTemplate = new PageTemplate({
      location: config.pageLocation + fileDetails.Key,
      thumbnail: config.thumbnail + thumbnailDetails.Key,
      path: fileDetails.Key,
      name: name,
      pageNumber: pageNumber,
      bucket: pageBucket,
      type: type 
    })

    fs.unlinkSync(file.path);
    fs.unlinkSync(thumbnail.path);

    const page = await pageTemplate.save();

    Template
        .findById(templateId)
        .then((template) => {
          return template.addPage(page._id)
        })
        .then((response) => {
          return res.status(200).json({'msg': 'Page Added to Template Successfully',  status: true});
        })
        .catch(err => {
          return res.status(400).json({ 'error': 'INTERNAL_Server', 'msg': 'Error in assign page to template', status: false })
        })
    
  } catch (err) {
    console.log(err);
  }
}

exports.previewTemlate = (req,res,next) => {
  try {
    const id = req.params.id;
    Template
      .findById(id)
      .populate({
        path: 'steps.pageId',
        populate: [{
          path: 'PageId',
          model: 'pageTemplate',
          options: { sort: { 'createdAt': 1 } },
        }]  
      })
      .then((template) => {
        res.render('Pages/preview', {
          template
        })
      })
      .catch(err => {
        console.log(err)
        return res.redirect('/templates');
      })
  } catch (err) {
    console.log(err);
  }
}