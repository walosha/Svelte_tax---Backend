const mongoose = require('mongoose');

const Driver = mongoose.model('Driver', {
  firstName: String,
  lastName: String,
  staffId: {
    type: String,
    unique: true
  },
  driverImage: String,
  driverAge: Number,
  phoneNumber: String,
  vehicleNumber: String,
  city: String
});

module.exports = Driver;
