const mongoose = require('mongoose');
const storeInfoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  openHour: {
    type: String,
  },
  telephone: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  isOpen: {
    type: Boolean,
  },
});

module.exports = mongoose.model('StoreInfo', storeInfoSchema);
