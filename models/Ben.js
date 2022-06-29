const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const benSchema = new Schema({
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
  Password: {
    type: String,
    required: true,
  },
  Adhaar: {
    type: String,
    required: true,
  }
});
 
const Ben= mongoose.model('ben', benSchema);
module.exports =Ben;
