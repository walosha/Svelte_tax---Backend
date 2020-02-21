const mongoose = require('mongoose');
const User = require('./userModel');

const CustomerSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: [true, 'Customer Id is Required']
  },

  trip: { type: Number }
});

module.exports = User.discriminator('Customer', CustomerSchema);
