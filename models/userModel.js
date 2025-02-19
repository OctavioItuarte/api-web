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
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashed_password: {
    type: Buffer,     //Aquí se guarda en binario la contra
    required: true
  },
  salt: {
    type: Buffer,    //Esto se utiliza para la encriptacion
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);