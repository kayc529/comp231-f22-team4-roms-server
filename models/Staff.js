const mongoose = require('mongoose');
const passportLocalMongoose= require('passport-local-mongoose');
const staffSchema = new mongoose.Schema({
  username: {
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

staffSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Staff', staffSchema);
