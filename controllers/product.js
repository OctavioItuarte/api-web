var Product = require('../models/productModel');

var productCreate = async function(req, res){
    try{
        var newProduct = await Product.create({
            _id_business: req.user.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image: req.body.image,
            last_change: new Date(),
        });
        res.status(201).json(newProduct);
    } catch(err){
        res.status(400).json(err);
    }
};

var productsReadMany = async function(req, res){
    try{
        var products = await Product.find({_id_business:req.params.idBusiness});
        if (!products.length) {
            return res.status(404).json({ message: "No se encontraron productos" });
        }
        res.status(200).json(products);
    } catch(err){
        res.status(400).json(err);
    }
};

var productsUpdateOne = async function(req, res){
    try{
        var productOwner = req.user.id;
        var updateData = req.body;
        updateData.last_change = new Date();
        const blockedFields = ["_id", "_id_business"];    //evita que intenten modificar los respectivos campos
        blockedFields.forEach(field => delete updateData[field]);
        var updatedProduct = await Product.updateOne({_id:req.params.id, _id_business:productOwner}, {$set:req.body});
        if (!updatedProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json({ message: 'Product updated', product: updatedProduct });
    } catch(err){
        res.status(400).json(err);
    }
};

var productsDeleteMany = async function(req, res){
    try {
        var result = await Product.deleteMany({ _id_business: req.user.id });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Product not found' });
          } else {
            res.status(204).send();
          }
      } catch (err) {
        res.status(400).json(err);
      }
};

var productsDeleteOne = async function(req, res){
    try {
        var result = await Product.deleteOne({ _id: req.params.id, _id_business:req.user.id });
        if (result.deletedCount === 0) {
          res.status(404).json({ message: 'Product not found' });
        } else {
          res.status(204).send();
        }
      } catch (err) {
        res.status(400).json(err);
      }
};

module.exports = { productCreate, productsReadMany, productsUpdateOne, productsDeleteMany, productsDeleteOne };
