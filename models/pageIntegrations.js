const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const pageIntegration = new Schema(
  {
    pageId: {
      type: String,
      required: true,
      trim: true
  },
    integrationId: {
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
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('PageIntegration', pageIntegration, 'pageIntegrations');
