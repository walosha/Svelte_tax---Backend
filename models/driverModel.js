const mongoose = require('mongoose');

const Driver = mongoose.model('User', {
  fullname: String,
  username: String,
  driverImage: String,
  driverAge: Number,
  phoneNumber: String,
  vehicleNumber: String,
  vehicleType: String,
  vehicleModel: String,
  city: String
});

module.exports = Driver;
