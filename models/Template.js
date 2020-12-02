const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const tempSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    categoryId: {
      type: String,
      required:true,
      trim: true
    },
    steps: [
      {
        pageId: {
          type: ObjectId,
          ref: 'pageTemplate',
        }
      }
    ],
    thumbnail: {
      type: String,
      required: true,
      trim: true
    },
    completefunnel: {
      type: Boolean,
      required: true,
      trim: true
    },
  },
  { timestamps: true, versionKey: false }
);


tempSchema.methods.addPage = function(pageId) {
  console.log(this)
  console.log(pageId)

  var updatedSteps = [...this.steps];
  var updatedStep = {
    'pageId': pageId
  }
  updatedSteps.push(updatedStep);
  this.steps = updatedSteps;
  return this.save(); 
}



module.exports = mongoose.model('Template', tempSchema, 'templates');
