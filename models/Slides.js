const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Slides = new Schema({
    title: {
        type: String
    },
    question: {
        type: String
    },
    type: {
        type: String
    },
    options: {
        type: String
    },
    answer: {
        type: String
    }
})

module.exports = mongoose.model("Slides", Slides, 'slides');