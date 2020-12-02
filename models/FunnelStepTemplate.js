const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const stepTemplate = new Schema({
    templateId: {
        type: ObjectId,
        ref: "Templates"
    },
    stepId: {
        type: ObjectId,
        ref: "Steps"
    },
    stepnum: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("StepTemplate", stepTemplate, 'stepTemplate');