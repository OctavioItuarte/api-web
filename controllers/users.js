var User = require('../models/userModel');

var create = async function (req, res) {
  try {
    var newUser = await User.create({
      name: {
        firstName: req.body.name.firstName,
        lastName: req.body.name.lastName
      },
      email: req.body.email,
      birthdate: req.body.birthdate,
      registration_date: new Date(),
      hashed_password: req.body.hashed_password,
      salt: req.body.salt,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

var usersReadAll = async function(req, res) {
  try {
    var users = await User.find({}, {hashed_password: 0, salt: 0});
    if (!users.length) {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

var usersDeleteOne = async function(req, res) {
  try {
    var userId = req.params.id;
    console.log(userId);
    var result = await User.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
        res.status(404).json({ message: 'User not found' });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

var usersUpdateOne = async function(req, res) {
  try {
    var userId = req.params.id;
    var updateData = req.body;
    const blockedFields = ["_id", "hashed_password", "salt"];    //evita que intenten modificar los respectivos campos
    blockedFields.forEach(field => delete updateData[field]);
    var updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
         res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (err) {    
    res.status(400).json(err);
  }
};


module.exports = { create, usersReadAll, usersDeleteOne, usersUpdateOne };




//deben ser async functions (con try and catch y ya no se usa ese sendJsonResponse, sino que envio as� directamente los 500 o 400 y as�
//y puedo modificar la carpeta myapp
//y en vez de hacer module.exports.usersReadAll, tengo que hacer module.exports:{usersCreate, usersReadAll}  //algo as� era, en vez de tener que hacer module.exports en cada m�todo.
//Hay que hacer un informe como de 10 p�ginas
//Y despues cambiar los const por "var" en este archivo y probar. 

