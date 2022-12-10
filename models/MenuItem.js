const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  desc: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isDineIn: {
    type: Boolean,
    default: true,
  },
  isTakeOut: {
    type: Boolean,
    default: true,
  },

});

module.exports = mongoose.model('MenuItem', menuItemSchema);
