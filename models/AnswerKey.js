const mongoose = require("mongoose")
const Schema = mongoose.Schema

const answerKey = new Schema({
    slidersId: {
        type: ObjectId,
        ref: "Sliders"
    },
    allanswer: {
        type: String //answer key for total slider 
    }
})

module.exports = mongoose.model('AnswerKey', answerKey, 'answerKey');