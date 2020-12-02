const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String
    },
    amount: {
        type: String
    },
    transaction_token: {
        type: String
    }
},
{timestamps: true, versionKey: false})

module.exports = mongoose.model('PaymentDetail', paymentSchema, 'paymentDetail')