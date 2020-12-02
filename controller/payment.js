const stripe = require("stripe")('sk_test_tQ950pxB7YQFVlDO0iosn7hD0055HgMFtf');
const Payment = require("../models/PaymentDetail");
const Subscription = require("../models/Subscription");
const User = require("../models/User")

exports.getPayment = (req, res) => {
    res.render("Pages/billing_details", {
        msg: req.flash('msg')
    });
}

exports.payment = (req, res) => {
    // console.log(req.body)
    let amount = 500;
    stripe.customers.create({
            name: req.body.card.name,
            email: req.session.user.email,
            address: {
                line1: req.body.card.address_line1,
                postal_code: req.body.card.address_zip,
                city: req.body.card.address_city,
                state: req.body.card.address_state,
                country: req.body.card.address_country,
            },
            source: req.body.id
        })
        .then(customer =>
            stripe.charges.create({
                amount,
                description: "Marketing-Shark subscription Charge.",
                currency: "usd",
                customer: customer.id
            }))
        .then(async charge => {
            // console.log(charge)
            const newPayment = new Payment({
                userId: req.session.user._id,
                name: charge.billing_details.name,
                amount: charge.amount,
                transaction_token: charge.balance_transaction
            })
            const payment = await newPayment.save()
            const newSubscription = new Subscription({
                paymentId: payment._id,
                userId: req.session.user._id,
            })
            const user = await User.findById(req.session.user._id)
            user.isSubscribe = true
            req.session.user.isSubscribe = true
            await newSubscription.save()
            await user.save()
            return await req.session.save()
        })
        .catch(err => {
            console.log(err)
        });
}