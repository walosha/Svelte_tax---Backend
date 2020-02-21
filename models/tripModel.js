const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema(
  {
    DriverID: {
      type: String,
      required: [true, 'Driver Id is Required']
    },
    vehicleNumber: {
      type: Number,
      unique: true
    },
    trip: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', TripSchema);
