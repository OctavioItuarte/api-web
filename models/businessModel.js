const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    number: { type: Number, required: true },
    apartment: { type: String, required: false },
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    zip: { type: Number, required: true }
  },
  category: {
    type: String,
    enum: ['Sushi', 'Gluten-Free', 'Pizza', 'Market'],
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  logo: {
    type: String, // Se puede almacenar la URL del logo
    required: false
  }
});

module.exports = mongoose.model('Business', businessSchema);