const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    ownedEvents: {
      type: Array,
      required: true
    }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);