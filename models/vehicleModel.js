const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
  {
    vehicleID: {
      type: String,
      required: [true, 'Please provide us your Vehicle ID!']
    },
    plateNumber: {
      type: String,
      required: [true, 'Please provide us your Plate Number!']
    },
    trips: Number,
    city: {
      type: String,
      required: [true, 'Please provide us your City!']
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', VehicleSchema);
