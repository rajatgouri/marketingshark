const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const funnelSchema = new Schema(
  {
    funnelname: {
      type: String,
      trim: true,
    },
    funnelUrl: {
      type: String,
      trim: true,
    },
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    steps: [
      {
        type: ObjectId,
        ref: 'funnelStep',
      },
    ],
    funnelPath: {
      type: String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Funnel', funnelSchema, 'funnels');
