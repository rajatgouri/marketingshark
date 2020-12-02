const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const funnelSteps = new Schema(
  {
    stepName: {
      type: String,
      required: true,
      trim: true
    },
    stepUrl: {
      type: String,
      required: true,
      trim: true
    },
    pathLanding: {
      type: String,
      required: true,
      trim: true
    },
    pathFolder: {
      type: String,
      required:true,
      trim: true
    },
    stepNumber: {
      type: Number,
      required: true,
      trim: true
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('funnelStep', funnelSteps, 'funnelSteps');
