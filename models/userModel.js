const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide us your first name!']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide us your last name!']
  },
  email: {
    type: String,
    required: [true, 'Please Provide us your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a Valid email']
  },
  phoneNumber: String,
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false //THIS OPTION HIDE THE PASSWORD FROM BEING RETURNED TO USERS}
  },
  passwordConfirm: {
    type: String,
    required: [true, 'PasswordConfirme is required'],
    validate: {
      // THIS ONLY WORKS ON SAVE or CREATE
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password do not match'
    }
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  passswordChangedAt: Number,
  passwordResetToken: String,
  passwordResetExpiry: Number
});

module.exports = mongoose.model('User', UserSchema);
