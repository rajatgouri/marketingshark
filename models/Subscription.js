const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    paymentId: {
        type: mongoose.Types.ObjectId,
        ref: "PaymentDetail"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    expiryDate: {
        type: Date,
        default: Date.now()
    }

},
{timestamps: true, versionKey: false})

module.exports = mongoose.model('Subscription', subscriptionSchema, 'subscription');