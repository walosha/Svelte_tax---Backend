const mongoose = require('mongoose');
const User = require('./userModel');

const DriverSchema = new mongoose.Schema({
  DriverID: {
    type: String,
    required: [true, 'Driver Id is Required']
  },
  vehicleNumber: {
    type: String,
    unique: true
  },
  trip: { type: Number }
});

module.exports = User.discriminator('Driver', DriverSchema);
