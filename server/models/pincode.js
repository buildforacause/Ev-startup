const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Pincode Schema
const PincodeSchema = new Schema({
  pincode: {
    type: Number
  },
  cost: {
    type: Number
  },
});

module.exports = Mongoose.model('Pincode', PincodeSchema);
