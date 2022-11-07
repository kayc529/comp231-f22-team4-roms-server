const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: MenuItem,
    require: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  orderId: {
    type: mongoose.Types.ObjectId,
    ref: 'Order',
    require: true,
  },
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
