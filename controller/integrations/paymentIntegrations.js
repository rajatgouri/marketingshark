const PaymentIntegrations = require('../../models/paymentIntegration');
const stripeController = require('../payments/stripe');
const paypalController = require('../payments/paypal');
const { data } = require('jquery');

exports.addIntegration = async (req, res, next) => {


    const { nickname, vendor,image, service, secret , api, merchantId, environment } = req.body;

        const isApiExists = await PaymentIntegrations.findOne({ api, userId: req.session.user._id });

        if (isApiExists) {
            return res.status(403).json({ status: false, error: 'Api Key already exists' })
        }

        let validatedData;

        if(vendor === 'Stripe') {
            validatedData = await stripeController.validateStripe({
                api
            });
        } else if (vendor === 'Paypal') {
            // console.log(req.body);
            validatedData = await paypalController.validatePaypal({
                api,
                secret
            })
        }

        if(validatedData) {

            const paymentIntegrations = new PaymentIntegrations({
                nickname,
                vendor,
                service,
                image,
                api,
                secret,
                status: true,
                userId: req.session.user._id
            })

            paymentIntegrations
                .save()
                .then((response) => {
                        return res.status(200).json({ "status": true, "msg": `${vendor} Added Successfully to Integrations.` })
                })
                .catch(err => {
                    console.log(err)
                    return res.status(400).json({ "status": false, "error": `Error Occurs in Adding ${vendor}  APi.` });
                })

        } else {
            return res.status(400).json({ "status": false, "error": `Api Key is Not Valid` });
        }


        



}

exports.getIntegrations = (req, res, next) => {

    const { service } = req.body;

        PaymentIntegrations
        .find({ userId: req.session.user._id, service })
        .then((response) => {
            console.log(response)
            return res.status(200).json({ status: true, "data": response, "msg": "Get Payment Integrations Successfully!" })
        })
        .catch(err => {
            return res.status(400).json({ "status": false, "error": "Error Occurs in Fetching Payment Integrations." });
        })
    
    
}

exports.removeIntegrations = (req, res, next) => {
    const { id, service } = req.body;


        PaymentIntegrations.
        findOneAndDelete({ _id: id, service })
        .then((response) => {
            
            return res.status(200).json({ "status": true, "msg": "Delete Payment Integrations Successfully!" })
        })
        .catch(err => {
            return res.status(400).json({ "status": false, "error": "Error Occurs in Deleting Payment Integrations." });
        })
    

}


exports.getIntegration = (req, res, next) => {
    const { id, vendor } = req.body;


        PaymentIntegrations
        .findOne({ _id: id, vendor })
        .then((response) => {
            return res.status(200).json({ "status": true, "msg": "Fetch Payment Integration Successfully!", "data": response })

        })
        .catch(err => {
            return res.status(400).json({ "status": false, "error": "Error Occurs in Fetching Payment Integration." });
        })

    
}


exports.updateIntegration = async (req, res, next) => {

    const { id, nickname, status,vendor,  service, secret ,api  } = req.body;
    let updatedKeys = {}

    let validatedData;

    if(vendor === 'Stripe') {
        updatedKeys = {nickname, status, api};
        validatedData = await stripeController.validateStripe({
            api
        });
    } else if (vendor === 'Paypal') {
        updatedKeys = {nickname, status, secret, api};

        validatedData = await paypalController.validatePaypal({
            api,
            secret
        })
    }


    
    if(validatedData) {
        PaymentIntegrations
            .findOneAndUpdate({ _id: id, service: service }, updatedKeys)
            .then((response) => {
                return res.status(200).json({ "status": true, "msg": "Payment Integration update Successfully!" });
            })
            .catch(err => {
                return res.status(400).json({ "status": false, "error": "Error Occurs in updating Payment Integration." });

            })
    } else {
        return res.status(400).json({ "status": false, "error": "Invalid Api Key." });

    }
    

    
}