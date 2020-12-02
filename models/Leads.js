const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leadSchema = new Schema({
    funnelId: {
        type: mongoose.Types.ObjectId,
        ref: "Funnel"
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    source: {
        type: String
    }
})

module.exports = mongoose.model("Leads", leadSchema, 'leads')