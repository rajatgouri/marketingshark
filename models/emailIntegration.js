const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const EmailIntegrationsSchema = new Schema({
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
    image: {
        type: String,
        requires: true,
        trim: true
    },
    service: {
        type: String,
        required: true,
        trim: true
    },
    domain: {
        type: String,
        trim: true
    },
    hash: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    instance: {
        type: String,
        trim: true
    },
    api: {
        type: String,
        required: true,
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

module.exports = mongoose.model("EmailIntegrations", EmailIntegrationsSchema, 'emailIntegration'); 