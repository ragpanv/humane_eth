const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  MobileNo: {
    type: String,
    required: true,
  },
  Adhaar: {
    type: String,
    required: true,
  },
 
});
 
const User= mongoose.model('user', donorSchema);
module.exports = User;
