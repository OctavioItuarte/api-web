var Admin = require('../models/adminModel');

var create = async function (req, res) {
  try {
    var newAdmin = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      salt: req.body.salt,
    });
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {create};