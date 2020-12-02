const Stripe = require('stripe');

exports.validateStripe = function(data) {
    
    const stripe = Stripe(data.api);

    return new Promise((resolve,reject) => {

        stripe.setupIntents.list().then((data) => {
            resolve(true)
        })
        .catch(err => {
            resolve(false)
        });

    })
    
}
