var controller = {}
var mongoose = require('mongoose');
var User = require('../models/userModel');

var usersCreate = async function (req, res) {
  try {
    var newUser = await User.create({
      name: {
        first: req.body.name.first,
        last: req.body.name.last
      },
      email: req.body.email,
      birthdate: req.body.birthdate
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

var usersReadAll = async function(req, res) {
  try {
    var users = await User.find({});
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


module.exports = { usersCreate, usersReadAll, usersUpdateOne, usersDeleteOne };





