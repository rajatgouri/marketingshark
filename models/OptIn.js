const mongoose = require("mongoose");
const Schema = mongoose.Schema

const Optinpage = new Schema({
    funnelsId: {
        type: ObjectId,
        ref: "Funnels"
    },
    path: {
        type: String
    },
    stepNumber: {
        type: Number
    },
    leadsgenerated: {
        type: Number
    },
    totalViews: {
        type: Number
    },
    funnelUrl: {
        type: String
    }
})

module.exports = mongoose.model("OptInPage", Optinpage, 'optinPage');