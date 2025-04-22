var Product = require('../models/productModel');
const socket = require('../socket');

var productCreate = async function(req, res){
    try{
        if(req.file){
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            req.body.image = imageUrl;
        }
        var newProduct = await Product.create({
            _id_business: req.user.id,
            ...req.body,
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
            return res.status(404).json({ message: "Products not found" });
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


var productCheckout = async function(req, res) {
    const cart = req.body.cart;
    if (!Array.isArray(cart)) 
      return res.status(400).json({ message: 'Carrito inválido.' });
  
    const session = await Product.startSession();
    session.startTransaction();
  
    try {
      const updates = [];
      for (const item of cart) {
        const p = await Product.findById(item._id).session(session);
        if (!p) throw new Error(`Producto no encontrado: ${item._id}`);
        if (p.stock < item.quantity)
          throw new Error(`No hay suficiente stock para ${p.name}`);
        p.stock -= item.quantity;
        await p.save({ session });
        updates.push(p);
      }
  
      await session.commitTransaction();
      session.endSession();
  
      //Emitir con la instancia guardada en app
      try {
        const io = socket.getIO();
        io.emit('stockUpdated', updates);
      } catch (err) {
        console.error('Socket emit fallo:', err);
      }
  
      return res
        .status(200)
        .json({ message: 'Compra realizada con éxito', updatedProducts: updates });
  
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
        session.endSession();
      }
      console.error('Error durante checkout:', error);
      return res.status(409).json({ message: error.message });
    }
  };

module.exports = { productCreate, productsReadMany, productsUpdateOne, productsDeleteMany, productsDeleteOne, productCheckout};
