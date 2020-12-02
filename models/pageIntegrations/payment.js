const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const pagePaymentIntegration = new Schema({

    integration: {
        type: String,
        required: true,
        trim: true
    },
  
    api: {
        type: String,
        required: true,
        trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('PagePaymentIntegration', pagePaymentIntegration, 'pagePaymentIntegrations');
