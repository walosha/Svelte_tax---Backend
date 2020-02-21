const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    PaymentID: {
      type: String,
      required: [true, 'Payment Id is Required']
    },
    driverName: {
      type: Number,
      unique: true
    },
    amountEarned: String,
    amountPaid: String,
    pendingPayment: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
