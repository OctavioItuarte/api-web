var controller = {}
var mongoose = require('mongoose');
var Business = require('../models/businessModel');

var businessCreate = async function (req, res) {
  try {
    var newBusiness = await Business.create({
      name: req.body.name,
      address: req.body.address,
      category: req.body.category,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      logo: req.body.logo
    });
    res.status(201).json(newBusiness);
  } catch (err) {
    res.status(400).json(err);
  }
};

var businessReadAll = async function(req, res) {
  try {
    var businesses = await Business.find({});
    res.status(200).json(businesses);
  } catch (err) {
    res.status(400).json(err);
  }
};

var businessDeleteOne = async function(req, res) {
  try {
    var businessId = req.params.id;
    console.log(businessId);
    var result = await Business.deleteOne({ _id: businessId });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Business not found' });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

var businessUpdateOne = async function(req, res) {
  try {
    var businessId = req.params.id;
    var updateData = req.body;
    var updatedBusiness = await Business.findByIdAndUpdate(businessId, updateData, { new: true });

    if (!updatedBusiness) {
      res.status(404).json({ message: 'Business not found' });
      return;
    }

    res.status(200).json({ message: 'Business updated', business: updatedBusiness });
  } catch (err) {    
    res.status(400).json(err);
  }
};

module.exports = { businessCreate, businessReadAll, businessUpdateOne, businessDeleteOne };
