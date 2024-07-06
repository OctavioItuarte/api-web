const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);