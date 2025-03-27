const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  cuit: {
    type: String,
    required: true
  },
  address: {
     type: String,
     required: true
  },
  category: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
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
  }
});

module.exports = mongoose.model('Business', businessSchema);