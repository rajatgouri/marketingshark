const EmailIntegrations = require('../../models/emailIntegration');
const PageEmailIntegrations = require('../../models/pageIntegrations/email');
const PageIntegrations = require('../../models/pageIntegrations');
const mailChimpController = require('../emails/mailchimp');

exports.addIntegration = async (req, res, next) => {

       const {nickname, vendor,image, service,domain, hash, instance, api} = req.body;

        const isApiExists = await EmailIntegrations.findOne({ api, userId: req.session.user._id });

        if (isApiExists) {
            return res.status(403).json({ status: false, error: 'Api Key Already Exists in Your Account' })
        }

        let validatedData;

        if(vendor === 'Mail Chimp') {
            validatedData = await mailChimpController.validateMailChimp({
                instance,
                api
            });
        }
        
        if (validatedData) {
            const emailIntegrations = new EmailIntegrations({
                nickname,
                vendor,
                service,
                instance,
                image,
                domain: domain ? domain : '',
                hash: hash ? hash : '',
                api,
                status: true,
                userId: req.session.user._id
            })
    
            emailIntegrations
                .save()
                .then((response) => {
                        return res.status(200).json({ "status": true, "msg": `${vendor} Added Successfully to Integrations.` })
                })
                .catch(err => {
                    return res.status(400).json({ "status": false, "error": `Error Occurs in Adding ${vendor}  APi.` });
                })
    
        } else {
            return res.status(400).json({ "status": false, "error": `Api Key is Not Valid` });

        }
                
}

exports.getIntegrations =async  (req, res, next) => {

    const {service} = req.body;


    EmailIntegrations
        .find({ userId: req.session.user._id, service })
        .then((response) => {
            return res.status(200).json({ status: true, "data": response, "msg": "Get Email Integrations Successfully!" })
        })
        .catch(err => {
            return res.status(400).json({ "status": false, "error": "Error Occurs in Fetching Email Integrations." });
        })
    
    
}

exports.removeIntegrations = (req, res, next) => {
    const { id, service } = req.body;

        EmailIntegrations.
            findOneAndDelete({ _id: id, service })
            .then(async(response) => {
                PageEmailIntegrations.find({api: response.api})
                    .then(async (integration) => {

                        for (let i =0 ; i< integration.length ; i++) {
                            await PageEmailIntegrations.findByIdAndDelete(integration[i]._id);
                            await PageIntegrations.findOneAndDelete({integrationId: integration[i]._id})

                        }
                        
                        return res.status(200).json({ "status": true, "msg": "Delete Email Integrations Successfully!" })

                    })
                    .catch(err => {
                        console.log(err)
                    })
                

            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({ "status": false, "error": "Error Occurs in Deleting Email Integrations." });
            })
}


exports.getIntegration = (req, res, next) => {
    const { id, vendor } = req.body;

        EmailIntegrations
        .findOne({ _id: id, vendor })
        .then((response) => {
            return res.status(200).json({ "status": true, "msg": "Fetch Email Integration Successfully!", "data": response })
        })
        .catch(err => {
            return res.status(400).json({ "status": false, "error": "Error Occurs in Fetching Email Integration." });
        })
        
}


exports.updateIntegration = async (req, res, next) => {

        const { id, nickname, vendor, service,instance, domain, hash ,status, api } = req.body;
        const updatedKeys = {nickname, domain, hash, status, api};

        let validatedData;

        if(vendor === 'Mail Chimp') {
            validatedData = await mailChimpController.validateMailChimp({
                instance,
                api
            });
        }
        
        if(validatedData) {
            EmailIntegrations
                .findOneAndUpdate({ _id: id, service: service }, updatedKeys)
                .then((response) => {
                    return res.status(200).json({ "status": true, "msg": "Email Integration update Successfully!" })

                })
                .catch(err => {
                    return res.status(400).json({ "status": false, "error": "Error Occurs in updating Email Integration." });

                })
        } else {
            return res.status(400).json({ "status": false, "error": "Invalid Api Key." });
        }
         
     

    
}