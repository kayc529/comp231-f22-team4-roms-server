const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      unique: true,
    },
    orderType: {
      type: String,
      enum: ['DINE_IN', 'TAKE_OUT'],
      default: 'take-out',
    },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELED'],
      default: 'PENDING',
    },
    pickupTime: {
      type: Date,
    },
    reserveTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
