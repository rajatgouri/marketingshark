const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const productsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim:true
    },
    currency: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim :true
    },
    address1 : {
        type: String,
        required: true,
        trim :true
    },
    address2 : {
        type: String,
        trim :true
    },
    cityTown : {
        type: String,
        required: true,
        trim :true
    },
    state : {
        type: String,
        required: true,
        trim :true
    },
    state : {
        type: String,
        required: true,
        trim :true
    },
    country: {
        type: String,
        required: true,
        trim :true
    },
    zip : {
        type: String,
        required: true,
        trim :true
    },
    description : {
        type: String,
        required: true,
        trim: true
    },
    value : {
        type: String,
        required: true,
        trim: true
    },
    funnel: {
        type: ObjectId,
        ref: 'Funnel',
        required: true
    },
    step: {
        type: ObjectId,
        ref: 'funnelStep',
        required: true
    },
    integration : {
        type: ObjectId,
        ref: 'PageIntegration',
        required: true
        
    }  
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model("Products", productsSchema, 'products');