const mongoose = require('mongoose');

const Schema = mongoose.Schema

const viewsSchema = new Schema({
    ipAddress: {
        type: String
    },
    macAddress: {
        type: String
    },
    funnelId: {
        type: mongoose.Types.ObjectId,
        ref: "Funnel"
    },
    email: {
        type: String
    },
    stepnum: {
        type: Number
    },
    OptIn: {
        type: Boolean
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Views', viewsSchema, 'views');