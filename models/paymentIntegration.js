const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const PaymentIntegrationsSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    vendor: {
        type: String,
        required:true,
        trim: true
    },
    service: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    api: {
        type: String,
        required: true,
        trim: true
    },
    secret: {
        type: String,
        trim: true
    },
    status: {
        type: Boolean,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required:true,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model("PaymentIntegrations", PaymentIntegrationsSchema, 'paymentIntegration'); 