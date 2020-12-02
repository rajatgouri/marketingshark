const mongoose = require("mongoose");
const Schema = mongoose.Schema

const pages = new Schema({
    pagename: {
        type: String
    },
    page_path: {
        type: String
    }
})

module.exports = mongoose.model('Pages', pages, 'pages');