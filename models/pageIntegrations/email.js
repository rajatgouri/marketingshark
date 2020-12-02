const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const pageEmailIntegration = new Schema({

    integration: {
        type: String,
        required: true,
        trim: true
    },
    api: {
        type: String,
        required: true,
        trim: true
    },
    action: {
        type: String,
        required: true,
        trim: true
    },
    list: {
        type: String,
        required: true,
        trim: true
    },
    confirmation: {
        type: Boolean,
        required: true,
        trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('PageEmailIntegration', pageEmailIntegration, 'pageEmailIntegrations');
