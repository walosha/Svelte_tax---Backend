const mongoose = require('mongoose');

const User = mongoose.model('User', {
  fullname: String,
  username: String,
  phoneNumber: String,
  city: String
});

module.exports = User;
