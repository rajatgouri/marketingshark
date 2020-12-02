const request = require('request');
const Mailchimp = require('mailchimp-api-v3');
const EmailIntegration = require('../../models/emailIntegration');

exports.validateMailChimp = function(data) {
    let mailchimpInstance   = data.instance,
    mailchimpApiKey     = data.api;

    var options = {
        url: `https://${mailchimpInstance}.api.mailchimp.com/3.0/`,
        auth: {
            'user': 'anystring',
            'pass': mailchimpApiKey
        }
    };


    return new Promise((resolve,reject) => {
        request(options, (err, response) => {
            if (err) throw err
            let result = JSON.parse(response.body);
            if(result.title) {  
                resolve(null)
            } else {
                resolve(result)
            }
        });
    })
    
}

exports.getMailchimpList = async (req,res,next) => {

    const {id} = req.body;

    let mailChimpData = await EmailIntegration.findById(id);

    let mailchimp = new Mailchimp(mailChimpData.api);

    mailchimp.get({
        path : '/lists'
      }, function (err, result) {
        if(err) {
            console.log(err)
            res.status(400).json({'msg': 'Error in fetching list'})
        }
        return res.status(200).json({'msg': 'list fetched successfuly!', 'list': result.lists})
    })
}


exports.addMemberToList = (req,res,next) =>{
    const {email, api, list} = req.body;

    let mailchimp = new Mailchimp("652c6277dc05b33480cdd30997fc3be4-us17");

    mailchimp.request({
    method : 'post',
    path : `/lists/${list}/members`,
    body : {
        email_address : email,
        status : 'subscribed'
    }
    }, (err, data) => {
    if (err) {
        if (err.statusCode === 400) {
            return res.status(400).json({'error': 'EXISTS', 'msg': 'This member is already Exists to list'});
        }
        return res.status(500).json({'error': 'INTERNAL_SERVER', 'msg': 'error in adding member to list'});
    }
    
    return res.status(200).json({'msg': 'Member added to List successfully!'});
    })
}