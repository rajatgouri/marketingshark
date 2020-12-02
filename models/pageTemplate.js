const mongoose = require("mongoose");
const Schema = mongoose.Schema

const pageTemplateSchema = new Schema({
    
    location: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    path: {
        type: String,
        required: true,
        trim: true
    },
    pageNumber: {
        type: Number,
        required: true,
        trim: true
    },
    bucket: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    }
},
{ timestamps: true, versionKey: false }
)




module.exports = mongoose.model("pageTemplate", pageTemplateSchema, "pageTemplate");