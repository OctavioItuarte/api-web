const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
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
  registration_date: {
    type: Date,
    required: true
  },
  hashed_password: {
    type: Buffer,     //Aqu� se guarda en binario la contra
    required: true
  },
  salt: {
    type: Buffer,    //Esto se utiliza para la encriptacion
    required: true
  },

});

module.exports = mongoose.model('User', userSchema);