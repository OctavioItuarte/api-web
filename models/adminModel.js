const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
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

module.exports = mongoose.model('Admin', adminSchema);