const paypal = require('paypal-rest-sdk');

exports.validatePaypal = function(data) {
    
    paypal.configure({
        'client_id': data.api,
        'client_secret': data.secret
    });


    return new Promise((resolve,reject) => {
        paypal.invoice.list(function (err, invoices) {
            if (err) {
                resolve(false)
            } else {
                console.log(invoices)
                if (invoices.httpStatusCode === 200) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }             
        });
    })
    
}