const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const projectToDonateSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Desc: {
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
  Amount: {
    type: Number,
    required: true,
  },
  Adhaar: {
    type: String,
    required: true,
  },
  ProjectHolder: {
    type: String,
    required: true,
  },
  Bid: {
    type: String,
    required: true,
  },
  AvailableAmount: {
    type: Number,
    required: true,
  },
  RequiredAmouont: {
    type: Number,
    required: true,
  }
});
 
const projects_to_donate= mongoose.model('projects_to_donate', projectToDonateSchema);
module.exports = projects_to_donate;
