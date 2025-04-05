var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users');
var ctrlProduct = require('../controllers/product');

var checkRole = require('../utils/checkRole');

//users
router.post('/users', checkRole(["admin"]), ctrlUsers.create);
router.get('/users', checkRole(["admin"]), ctrlUsers.readAllClients);
router.put('/users/:id', checkRole(["admin"]), ctrlUsers.updateOne);
router.delete('/users/:id', checkRole(["admin"]), ctrlUsers.deleteOne);

//business
router.get('/business', checkRole(["admin", "business", "client"]), ctrlUsers.readAllBusiness);

//products
router.post('/products', checkRole(["business"]), ctrlProduct.productCreate);
router.get('/products/:idBusiness', checkRole(["admin", "business", "client"]), ctrlProduct.productsReadMany);
router.put('/products/:id', checkRole(["business"]), ctrlProduct.productsUpdateOne); 
router.delete('/products/:id', checkRole(["business"]), ctrlProduct.productsDeleteOne);
router.delete('/products', checkRole(["business"]), ctrlProduct.productsDeleteMany);

module.exports = router;