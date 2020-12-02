const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    isVerified: {
        type: Boolean,
        default: false
    },
    isSubscribe: {
        type: Boolean,
        default: false
    },
    fullName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String
    },
    confirm_token: {
        type: String
    },
    resetToken: {
        type: String,
    },
    resetTokenExpiration: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model("User", userSchema, 'users');