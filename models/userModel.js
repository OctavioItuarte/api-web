const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: {
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    }
  },
  nameBusiness:{
    type: String,
    required: false
  },
  phoneNumber:{
    type:String,
    required: false
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  birthdate: {
    type: Date,
    required: false
  },
  registration_date: {
    type: Date,
    required: true
  },
  cuit: {
    type: String,
    required: false
  },
  address: {
     type: String,
     required: false
  },
  category: {
    type: String,
    required: false
  },
  hashed_password: {
    type: Buffer,     //Aqu� se guarda en binario la contra
    required: true
  },
  salt: {
    type: Buffer,    //Esto se utiliza para la encriptacion
    required: true
  },
  role: {
    type:String,
    enum: ['client', 'business', 'admin'],
    required:true
  },

});

module.exports = mongoose.model('User', userSchema);