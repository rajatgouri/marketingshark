const mongoose = require("mongoose");
const config = require('../config');
const dbConnect = async () => {
    try {
        await mongoose.connect(config.mongodbURI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB Connected...")
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = dbConnect;