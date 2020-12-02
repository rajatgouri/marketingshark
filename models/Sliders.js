const mongoose = require("mongoose");
const Schema = mongoose.Schema

const Sliders = new Schema({
    funnelsstepsId: {
        type: ObjectId,
        ref: "FunnelsSteps"
    },
    steptemplateId: {
        type: ObjectId,
        ref: "StepTemplates"
    },
    slidesId: {
        type: ObjectId,
        ref: "Slides"
    },
    slidenum: {
        type: int
    }
})

module.exports = mongoose.model("Sliders", Sliders, "sliders");