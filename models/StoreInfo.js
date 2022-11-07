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
  closeHour: {
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
});

module.exports = mongoose.model('StoreInfo', storeInfoSchema);
