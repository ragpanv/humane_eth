const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const addProjectSchema = new Schema({
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
 
const add_projects_req= mongoose.model('projects_to_donate', addProjectSchema);
module.exports = add_projects_req;
