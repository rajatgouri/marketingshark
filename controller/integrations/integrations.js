const EmailIntegrations = require('../../models/emailIntegration');
const PaymentIntegrations = require('../../models/paymentIntegration'); 
const PageIntegration = require('../../models/pageIntegrations');
const PageEmailIntegration = require('../../models/pageIntegrations/email');
const pagePaymentIntegration = require('../../models/pageIntegrations/payment');
const Funnel = require('../../models/Funnel');
const PaymentIntegration = require('../../models/paymentIntegration');
const EmailIntegration = require('../../models/emailIntegration');

exports.emailIntegrations = async (req,res,next) => {
    let userId = req.session.user._id;
    let email = await EmailIntegrations.find({userId});
    
    res.render('Pages/integration', {
        type: 'Email',
        email: email
    });   
}

exports.domainIntegrations = (req,res,next)  => {
    let userId = req.session.user._id;
    
    res.render('Pages/integration', {
        type: 'Domain',
    });   
}

exports.paymentIntegrations = async (req,res,next) => {
    let userId = req.session.user._id;
    let payment = await PaymentIntegrations.find({userId});
    
    res.render('Pages/integration', {
        type: 'Payment',
        payment: payment
    });   
}

exports.zapierIntegrations = async (req,res,next) => {
    let userId = req.session.user._id;
    
    res.render('Pages/integration', {
        type: 'Zapier',
    });   
}

exports.hasIntegration = async (req,res,next) => {

    const {vendor, service } = req.body;
    const id = req.session.user._id;

    if (service === 'Email') {

        let isIntegrationExists = await EmailIntegrations.findOne({userId: id, service, vendor});
        if(isIntegrationExists) {
            return res.status(201).json({'msg': 'Integration Exists', integration: isIntegrationExists})
        } else {
            return res.status(400).json({'msg': 'Integration Not Found'})
        }   

    } else if (service === 'Payment') {

    }
}


exports.addEmailIntegration = async (req,res,next) => {
    try {
      const { pageId, integration, api, action, list, confirmation } = req.body;
  
    
        let pageEmailIntegration = new PageEmailIntegration({
            integration,
            api,
            action,
            list,
            confirmation
        })

        pageEmailIntegration
            .save()
            .then((integration) => {
                const pageIntegration = new PageIntegration({
                    pageId: pageId,
                    integrationId: integration._id ,
                    type: 'Email'
                })
                return pageIntegration.save()
            })
            .then((pageIntegration) => {
                return res.status(200).json({'msg': 'funnel Integration saved Successfully!', id: pageIntegration._id})
            })
            .catch(err => {
                return res.status(500).json({'msg': 'Error in Saving Email Integration'})
            })
    } catch (err) {
      console.log(err);
    }
  }
  
  exports.removeIntegration= async   (req,res,next) => {
    try {
      const { pageId, type } = req.body;
  
      PageIntegration
        .findOneAndDelete({pageId, type})
        .then(async (integration) => {
            if (type === 'Email') {
                return await PageEmailIntegration.findByIdAndRemove(integration.integrationId)
            }
        })
        .then(() => {
            return res.status(200).json({'msg': 'Integration Deleted'})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({'msg': 'Error in integration Deletion Process'})

        })
      
    
  
    } catch (err) {
      console.log(err);
    }
  }

  exports.getPageIntegrations = (req,res,next) => {
        const {pageId, type} = req.body;
        let model = '';
        if (type === 'Email') {
            model = 'PageEmailIntegration'
        } else if (type === 'Payment') {
            model = 'PagePaymentIntegration'
        }


        PageIntegration
            .findOne({pageId, type})
            .populate({
                'path': 'integrationId',
                'model': model,
            })
            
            .then((integration) => {

                console.log(integration)
                if(integration) {
                    let Observable = new Promise(async (resolve, reject) => {
                        if(type === 'Payment' ) {
                            resolve(await PaymentIntegration.findOne({
                                api: integration.integrationId.api
                            }))
                            
                        } else if (type === 'Email') {
                            resolve(await EmailIntegration.findOne({
                                api: integration.integrationId.api   
                            }))
                        } else  {
                            resolve(null)
                        }
                    })
    
                    Observable.then((integrationDetails) => {
    
                        return res.status(200).json({'msg': 'Integration Fetched Successfully', integration: integration , details: integrationDetails});
    
                    })
                } else {
                    return res.status(200).json({'msg': 'Integration Fetched Successfully'});

                }
                
                
                


            })
            .catch(err => {
                return res.status(500).json({'msg': 'Error in get Integrations'})
            })
    
  }


  exports.addPaymentIntegration = (req,res,next) => {
    console.log(req.body)

    const {funnel, payment} = req.body;

    Funnel.findById(funnel).populate([
        {
          path: 'steps',
          model: 'funnelStep',
        },
    ])
    .then(async (funnel) => { 
        let steps = (funnel.steps);
        
        let savedIntegration = new Promise(async (resolve,reject) => {

            let paymentIntegration = await PaymentIntegrations.findById(payment);

            for (let i=0; i<steps.length; i++) {
                let payment = new pagePaymentIntegration({
                    integration: paymentIntegration.vendor,
                    api: paymentIntegration.api
                }) 
    
                let savedPayment =  await payment.save();
    
                if (savedPayment) {
                    
                    let pageIntegration = new PageIntegration({
                        pageId: steps[i]._id,
                        integrationId: savedPayment._id,
                        type: 'Payment' 
                    })
                        
                    let savedPageIntegration = await pageIntegration.save();
                    if(i === (steps.length -1)) {
                        resolve(savedPageIntegration);
                    }
                    
                } else {
                    console.log('error in saving payment integration model');
                    resolve(null)
                } 
    
            }
        })

        if(savedIntegration) {
            return res.status(200).json({'msg': 'Payment add to Pages Successfully!'})
        } else {
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': "Error in Saving Payment Integration"})
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': "can't find funnel with this funnel Id"})
    })

  }



  exports.removePaymentIntegration = async(req,res,next) => {
    console.log(req.body)

    const {funnel} = req.body;

    Funnel.findById(funnel).populate([
        {
          path: 'steps',
          model: 'funnelStep',
        },
    ])
    .then((funnel) => {
        let steps = funnel.steps;

        let deletedIntegration = new Promise(async (resolve,reject) => {


            for (let i=0; i<steps.length; i++) {


                PageIntegration
                .findOneAndDelete({pageId: steps[i]._id, type: 'Payment'})
                .then(async (integration) => {

                        return await pagePaymentIntegration.findByIdAndRemove(integration.integrationId)

                })
                .then(() => {
                    if (i === (steps.length -1)) {
                        resolve(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                    resolve(null)
                })
    
            }
        })

        if (deletedIntegration) {
            return res.status(200).json({ 'msg': 'Delete Payment Integration successfully!' })
            
        } else {
            return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'Error in Deleteing Payment Integration'})
        } 


    })
    .catch(err => {
        console.log(err)
    })
    

  }