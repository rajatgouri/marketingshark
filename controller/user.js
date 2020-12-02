const User = require(".././models/User");
const bcrypt = require("bcryptjs");
const Template = require("../models/Template");
const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: "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"
        }
    })
);

exports.getSignup = (req, res) => {
    return res.render("Pages/SignUp", {
        errorMessage: null,
        successMessage: null,
        user: {}
    })
}

exports.postSignUp = async (req, res, next) => {
    try {
        const {
            fullName,
            username,
            email,
            phone,
            password,
            confirmPassword
        } = req.body;

        if (password !== confirmPassword) {
            return res.render("Pages/SignUp", {
                errorMessage: "Password and confirmPassword does not match!",
                successMessage: null,
                user: {
                    fullName,
                    username,
                    email,
                    phone
                }
            })
        }

        const user = await User.findOne({
            email
        })

        if (user) {
            return res.render("Pages/SignUp", {
                errorMessage: "Email already exists. Please try with different email!",
                successMessage: null,
                user: {
                    fullName,
                    username,
                    email,
                    phone
                }
            })
        }

        const usern = await User.findOne({
            username
        })

        if (usern) {
            return res.render("Pages/SignUp", {
                errorMessage: "Username should be unique!",
                successMessage: null,
                user: {
                    fullName,
                    username,
                    email,
                    phone
                }
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const token = jwt.sign({
            email
        }, 'vahgafhgav54545a4a', {
            expiresIn: '1h'
        })

        const newUser = new User({
            fullName,
            username,
            email,
            phone,
            password: hash,
            confirm_token: token
        })
        const nuser = await newUser.save()
        // res.redirect("/billing_details");
        await transporter.sendMail({
            to: email,
            from: "marketingshark32@gmail.com",
            subject: "Verify Email",
            html: `<!doctype html><html><head><meta name="viewport" content="width=device-width"/><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><title>NudgeAr</title> <style>img{border: none; -ms-interpolation-mode: bicubic; max-width: 100%}body{background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%}table{border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%}table td{font-family: sans-serif; font-size: 14px; vertical-align: top}.body{background-color: #f6f6f6; width: 100%}.container{display: block; margin: 0 auto !important; max-width: 580px; padding: 10px; width: 580px}.content{box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px}.main{background: #fff; border-radius: 3px; width: 100%}.wrapper{box-sizing: border-box; padding: 20px}.content-block{padding-bottom: 10px; padding-top: 10px}.footer{clear: both; margin-top: 10px; text-align: center; width: 100%}.footer td, .footer p, .footer span, .footer a{color: #999; font-size: 12px; text-align: center}h1, h2, h3, h4{color: #000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px}h1{font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize}p, ul, ol{font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px}p li, ul li, ol li{list-style-position: inside; margin-left: 5px}a{color: #3498db; text-decoration: underline}.btn{box-sizing: border-box; width: 100%}.btn>tbody>tr>td{padding-bottom: 15px}.btn table{width: auto}.btn table td{background-color: #fff; border-radius: 5px; text-align: center}.btn a{background-color: #fff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize}.btn-primary table td{background-color: #3498db}.btn-primary a{background-color: #3498db; border-color: #3498db; color: #fff}.last{margin-bottom: 0}.first{margin-top: 0}.align-center{text-align: center}.align-right{text-align: right}.align-left{text-align: left}.clear{clear: both}.mt0{margin-top: 0}.mb0{margin-bottom: 0}.preheader{color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0}.powered-by a{text-decoration: none}hr{border: 0; border-bottom: 1px solid #f6f6f6; margin: 20px 0}@media only screen and (max-width: 620px){table[class=body] h1{font-size: 28px !important; margin-bottom: 10px !important}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a{font-size: 16px !important}table[class=body] .wrapper, table[class=body] .article{padding: 10px !important}table[class=body] .content{padding: 0 !important}table[class=body] .container{padding: 0 !important; width: 100% !important}table[class=body] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important}table[class=body] .btn table{width: 100% !important}table[class=body] .btn a{width: 100% !important}table[class=body] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important}}@media all{.ExternalClass{width: 100%}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important}#MessageViewBody a{color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit}.btn-primary table td:hover{background-color: #34495e !important}.btn-primary a:hover{background-color: #34495e !important; border-color: #34495e !important}}</style></head><body class=""> <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td><td class="container"> <div class="content"> <table role="presentation" class="main"> <tr> <td class="wrapper"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td> <p>Hi there,</p><p> Please confirm your email address by clicking the link below.</p><table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"> <tbody> <tr> <td align="left"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td> <a href="http://ec2-18-189-32-222.us-east-2.compute.amazonaws.com:8000/confirm-email/${token}" target="_blank">Confirm email address</a></td></tr></tbody> </table> </td></tr></tbody> </table> <p>We may need to send you critical information about our service and it is important that we have an accurate email address.</p></td></tr></table> </td></tr></table> <div class="footer"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="content-block"> <b>Marketin Shark</b> <span class="apple-link">Support Team</span> <br>Don't like these emails? <a href="#">Unsubscribe</a>.</td></tr><tr> <td class="content-block powered-by"> Powered by <a href="#">Marketin Shark</a>.</td></tr></table> </div></div></td><td>&nbsp;</td></tr></table></body></html>`
        });
        return res.render("Pages/Login", {
            successMessage: "Welcome! Marketing Shark team is glad to see you aboard, let's start your journey with Marketing Shark. You should recieve an email with a link to activiate your account.",
            user: {},
            errorMessage: null
        })
    } catch (err) {
        console.log(err)
    }
}

exports.confirmEmail = (req, res) => {
    const {
        token
    } = req.params
    jwt.verify(token, "vahgafhgav54545a4a", async (err, verify) => {
        try {
            if (err) {
                return res
                    .status(401)
                    .send(
                        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>NudgeAr</title><style>@import url(https://fonts.googleapis.com/css?family=Sigmar+One);body{background:#f8f8fa;color:rgb(15,15,15);overflow:hidden}.congrats{position:absolute;top:140px;width:550px;height:100px;padding:20px 10px;text-align:center;margin:0 auto;left:0;right:0}h1{transform-origin:50% 50%;font-size:50px;font-family:'Sigmar One',cursive;cursor:pointer;z-index:2;position:absolute;top:0;text-align:center;width:100%}h3{background:#FFF;padding:25px;margin:50px 0;box-shadow:2px 2px 2px #f1e8e8}.blob{height:50px;width:50px;color:#fc0;position:absolute;top:45%;left:45%;z-index:1;font-size:30px;display:none}</style></head><body><div class="congrats"><h3>Sorry! you cannot accept this invitation now.</h3></div></body> <script>$(function(){var numberOfStars=200;for(var i=0;i<numberOfStars;i++){$('.congrats').append('<div class="blob fa fa-star '+i+'"> </div>');} animateText();animateBlobs();});$('.congrats').click(function(){reset();animateText();animateBlobs();});function reset(){$.each($('.blob'),function(i){TweenMax.set($(this),{x:0,y:0,opacity:1});});TweenMax.set($('h1'),{scale:1,opacity:1,rotation:0});} function animateText(){TweenMax.from($('h1'),0.8,{scale:0.4,opacity:0,rotation:15,ease:Back.easeOut.config(4),});} function animateBlobs(){var xSeed=_.random(350,380);var ySeed=_.random(120,170);$.each($('.blob'),function(i){var $blob=$(this);var speed=_.random(1,5);var rotation=_.random(5,100);var scale=_.random(0.8,1.5);var x=_.random(-xSeed,xSeed);var y=_.random(-ySeed,ySeed);TweenMax.to($blob,speed,{x:x,y:y,ease:Power1.easeOut,opacity:0,rotation:rotation,scale:scale,onStartParams:[$blob],onStart:function($element){$element.css('display','block');},onCompleteParams:[$blob],onComplete:function($element){$element.css('display','none');}});});}</script> </html>`
                    );
            }
            const user = await User.findOne({
                email: verify.email
            });

            if (!user) {
                return res
                    .status(401)
                    .send(
                        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>NudgeAr</title><style>@import url(https://fonts.googleapis.com/css?family=Sigmar+One);body{background:#f8f8fa;color:rgb(15,15,15);overflow:hidden}.congrats{position:absolute;top:140px;width:550px;height:100px;padding:20px 10px;text-align:center;margin:0 auto;left:0;right:0}h1{transform-origin:50% 50%;font-size:50px;font-family:'Sigmar One',cursive;cursor:pointer;z-index:2;position:absolute;top:0;text-align:center;width:100%}h3{background:#FFF;padding:25px;margin:50px 0;box-shadow:2px 2px 2px #f1e8e8}.blob{height:50px;width:50px;color:#fc0;position:absolute;top:45%;left:45%;z-index:1;font-size:30px;display:none}</style></head><body><div class="congrats"><h3>Sorry! you cannot accept this invitation now.</h3></div></body> <script>$(function(){var numberOfStars=200;for(var i=0;i<numberOfStars;i++){$('.congrats').append('<div class="blob fa fa-star '+i+'"> </div>');} animateText();animateBlobs();});$('.congrats').click(function(){reset();animateText();animateBlobs();});function reset(){$.each($('.blob'),function(i){TweenMax.set($(this),{x:0,y:0,opacity:1});});TweenMax.set($('h1'),{scale:1,opacity:1,rotation:0});} function animateText(){TweenMax.from($('h1'),0.8,{scale:0.4,opacity:0,rotation:15,ease:Back.easeOut.config(4),});} function animateBlobs(){var xSeed=_.random(350,380);var ySeed=_.random(120,170);$.each($('.blob'),function(i){var $blob=$(this);var speed=_.random(1,5);var rotation=_.random(5,100);var scale=_.random(0.8,1.5);var x=_.random(-xSeed,xSeed);var y=_.random(-ySeed,ySeed);TweenMax.to($blob,speed,{x:x,y:y,ease:Power1.easeOut,opacity:0,rotation:rotation,scale:scale,onStartParams:[$blob],onStart:function($element){$element.css('display','block');},onCompleteParams:[$blob],onComplete:function($element){$element.css('display','none');}});});}</script> </html>`
                    );
            }
            if (user.isVerified === true) {
                return res
                    .status(401)
                    .send(
                        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>NudgeAr</title><style>@import url(https://fonts.googleapis.com/css?family=Sigmar+One);body{background:#f8f8fa;color:rgb(15,15,15);overflow:hidden}.congrats{position:absolute;top:140px;width:550px;height:100px;padding:20px 10px;text-align:center;margin:0 auto;left:0;right:0}h1{transform-origin:50% 50%;font-size:50px;font-family:'Sigmar One',cursive;cursor:pointer;z-index:2;position:absolute;top:0;text-align:center;width:100%}h3{background:#FFF;padding:25px;margin:50px 0;box-shadow:2px 2px 2px #f1e8e8}.blob{height:50px;width:50px;color:#fc0;position:absolute;top:45%;left:45%;z-index:1;font-size:30px;display:none}</style></head><body><div class="congrats"><h3>Your email is already verified!</h3></div></body> <script>$(function(){var numberOfStars=200;for(var i=0;i<numberOfStars;i++){$('.congrats').append('<div class="blob fa fa-star '+i+'"> </div>');} animateText();animateBlobs();});$('.congrats').click(function(){reset();animateText();animateBlobs();});function reset(){$.each($('.blob'),function(i){TweenMax.set($(this),{x:0,y:0,opacity:1});});TweenMax.set($('h1'),{scale:1,opacity:1,rotation:0});} function animateText(){TweenMax.from($('h1'),0.8,{scale:0.4,opacity:0,rotation:15,ease:Back.easeOut.config(4),});} function animateBlobs(){var xSeed=_.random(350,380);var ySeed=_.random(120,170);$.each($('.blob'),function(i){var $blob=$(this);var speed=_.random(1,5);var rotation=_.random(5,100);var scale=_.random(0.8,1.5);var x=_.random(-xSeed,xSeed);var y=_.random(-ySeed,ySeed);TweenMax.to($blob,speed,{x:x,y:y,ease:Power1.easeOut,opacity:0,rotation:rotation,scale:scale,onStartParams:[$blob],onStart:function($element){$element.css('display','block');},onCompleteParams:[$blob],onComplete:function($element){$element.css('display','none');}});});}</script> </html>`
                    );
            }

            user.isVerified = true;
            user.confirm_token = undefined;
            await user.save();
            req.flash("msg", "Congrats!, Your email is verified.");
            return res.redirect("/");
        } catch (err) {
            // const error = new Error(err);
            // error.httpStatusCode = 500;
            // return next(error);
            console.log(err)
        }
    });
}

exports.getLogin = (req, res, next) => {
    res.render("Pages/Login.ejs", {
        user: {},
        errorMessage: null,
        successMessage: null,
        fmsg: req.flash('msg')
    })
}

exports.postLogin = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.render("Pages/Login", {
                user: {
                    email,
                    password
                },
                errorMessage: "The email you entered is not exists.",
                successMessage: null,
                fmsg: req.flash('msg')
            });
        }

        //         if (user.isVerified === false) {
        //             const token = jwt.sign({
        //                 email: user.email
        //             }, "vahgafhgav54545a4a", {
        //                 expiresIn: "1h"
        //             });

        //             await transporter.sendMail({
        //                 to: email,
        //                 from: "marketingshark32@gmail.com",
        //                 subject: "Verify Email",
        //                 html: `<!doctype html><html><head><meta name="viewport" content="width=device-width"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><title>NudgeAr</title> <style>img{border: none; -ms-interpolation-mode: bicubic; max-width: 100%}body{background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%}table{border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%}table td{font-family: sans-serif; font-size: 14px; vertical-align: top}.body{background-color: #f6f6f6; width: 100%}.container{display: block; margin: 0 auto !important; max-width: 580px; padding: 10px; width: 580px}.content{box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px}.main{background: #fff; border-radius: 3px; width: 100%}.wrapper{box-sizing: border-box; padding: 20px}.content-block{padding-bottom: 10px; padding-top: 10px}.footer{clear: both; margin-top: 10px; text-align: center; width: 100%}.footer td, .footer p, .footer span, .footer a{color: #999; font-size: 12px; text-align: center}h1, h2, h3, h4{color: #000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px}h1{font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize}p, ul, ol{font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px}p li, ul li, ol li{list-style-position: inside; margin-left: 5px}a{color: #3498db; text-decoration: underline}.btn{box-sizing: border-box; width: 100%}.btn>tbody>tr>td{padding-bottom: 15px}.btn table{width: auto}.btn table td{background-color: #fff; border-radius: 5px; text-align: center}.btn a{background-color: #fff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize}.btn-primary table td{background-color: #3498db}.btn-primary a{background-color: #3498db; border-color: #3498db; color: #fff}.last{margin-bottom: 0}.first{margin-top: 0}.align-center{text-align: center}.align-right{text-align: right}.align-left{text-align: left}.clear{clear: both}.mt0{margin-top: 0}.mb0{margin-bottom: 0}.preheader{color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0}.powered-by a{text-decoration: none}hr{border: 0; border-bottom: 1px solid #f6f6f6; margin: 20px 0}@media only screen and (max-width: 620px){table[class=body] h1{font-size: 28px !important; margin-bottom: 10px !important}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a{font-size: 16px !important}table[class=body] .wrapper, table[class=body] .article{padding: 10px !important}table[class=body] .content{padding: 0 !important}table[class=body] .container{padding: 0 !important; width: 100% !important}table[class=body] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important}table[class=body] .btn table{width: 100% !important}table[class=body] .btn a{width: 100% !important}table[class=body] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important}}@media all{.ExternalClass{width: 100%}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important}#MessageViewBody a{color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit}.btn-primary table td:hover{background-color: #34495e !important}.btn-primary a:hover{background-color: #34495e !important; border-color: #34495e !important}}</style></head><body class=""> <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td><td class="container"> <div class="content"> <table role="presentation" class="main"> <tr> <td class="wrapper"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td> <p>Hi there,</p><p> Please confirm your email address by clicking the link below.</p><table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"> <tbody> <tr> <td align="left"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td> <a href="http://ec2-18-189-32-222.us-east-2.compute.amazonaws.com:8000/confirm-email/${token}" target="_blank">Confirm email address</a></td></tr></tbody> </table> </td></tr></tbody> </table> <p>We may need to send you critical information about our service and it is important that we have an accurate email address.</p></td></tr></table> </td></tr></table> <div class="footer"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="content-block"> <b>Marketin Shark</b> <span class="apple-link">Support Team</span> <br>Don't like these emails? <a href="#">Unsubscribe</a>.</td></tr><tr> <td class="content-block powered-by"> Powered by <a href="#">Marketin Shark</a>.</td></tr></table> </div></div></td><td>&nbsp;</td></tr></table></body></html>`
        //             });

        //             return res.status(422).render("Pages/Login", {
        //                 errorMessage: "You need to verify your email. Please check your email, We will send you verification code!",
        //                 user: {
        //                     email,
        //                     password
        //                 },
        //                 successMessage: null,
        //                 fmsg: req.flash('msg')
        //             });
        // }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.render("Pages/Login", {
                user: {
                    email,
                    password
                },
                errorMessage: "Incorrect password.",
                successMessage: null,
                fmsg: req.flash('msg')
            });
        }
        req.session.isloggedin = true;
        req.session.user = user
        await user.save();
        // req.flash("msg", "Your need to get subscription first. For subscription please fill the given form!")
        return res.redirect('/home')
    } catch (err) {
        console.log(err)
    }
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.log(err)
        res.redirect('/')
    })
}