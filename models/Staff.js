const mongoose = require('mongoose');
const staffSchema = new mongoose.Schema({
  staffId: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  role: {
    type: String,
    enum: ['SERVER', 'MANAGER', 'OWNER', 'CHEF', 'CS', 'TECH_SUPPORT'],
    default: 'SERVER',
    require: true,
  },
});

module.exports = mongoose.model('Staff', staffSchema);
