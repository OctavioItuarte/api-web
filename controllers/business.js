var Business = require('../models/businessModel');

var create = async function (req, res) {
  try {
    var newBusiness = await Business.create({
      name: req.body.name,
      email: req.body.email,
      cuit: req.body.cuit,
      address: req.body.address,
      category: req.body.category,
      phoneNumber: req.body.phoneNumber,
      registration_date: new Date(),
      hashed_password: req.body.hashed_password,
      salt: req.body.salt,
    });
    res.status(201).json(newBusiness);
  } catch (err) {
    res.status(400).json(err);
  }
};

var businessReadAll = async function(req, res) {
  try {
    var businesses = await Business.find({}, {hashed_password: 0, salt: 0});
    if (!businesses.length) {
      return res.status(404).json({ message: "No se encontraron negocios" });
    }
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
    var businessId = req.user._id;
    var updateData = req.body;
    const blockedFields = ["_id", "hashed_password", "salt"];    //evita que intenten modificar los respectivos campos
    blockedFields.forEach(field => delete updateData[field]);

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

module.exports = { create, businessReadAll, businessUpdateOne, businessDeleteOne };
