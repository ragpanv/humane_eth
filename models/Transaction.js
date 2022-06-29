const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const transactionSchema = new Schema({
  Tid: {
    type: String,
    required: true,
  },
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true,
  },
  Timestamp: {
    type: String,
    required: true,
  }
});
 
const transaction= mongoose.model('transaction', transactionSchema);
module.exports = transaction;
