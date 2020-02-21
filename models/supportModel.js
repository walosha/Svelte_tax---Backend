const mongoose = require('mongoose');

const SupportSchema = new mongoose.Schema(
  {
    SupportID: {
      type: String,
      required: [true, 'Driver Id is Required']
    },
    issueTitle: {
      type: String,
      required: [true, 'Please write an Issue Title!']
    },
    issueInformation: {
      type: String,
      required: [true, 'Please write an issue Information!']
    },
    tripID: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'tripID'
      }
    ],
    createdby: String,
    driverReported: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Driver'
      }
    ],
    status: {
      type: String,
      enum: ['pending', 'resolved']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Support', SupportSchema);
