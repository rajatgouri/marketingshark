const mongoose = require("mongoose");
const Schema = mongoose.Schema

const Addintegration = new Schema({
    userId: {
        type: ObjectId,
        ref: "User"
    },
    insertionkey: {
        type: String
    },
    integrationId: {
        type: ObjectId,
        ref: "Integration"
    }
})

module.exports = mongoose.model('Addintegration', Addintegration, 'addintegration');