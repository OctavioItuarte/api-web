const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id_business: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    last_change:{
      type: Date,
      required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
