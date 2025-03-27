var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users');
var ctrlBusiness = require('../controllers/business');
var ctrlProduct = require('../controllers/product');

var checkRole = require('../utils/checkRole');

//users
router.post('/users', checkRole(["admin"]), ctrlUsers.create);
router.get('/users', checkRole(["admin"]), ctrlUsers.usersReadAll);
router.put('/users/:id', checkRole(["admin"]), ctrlUsers.usersUpdateOne);
router.delete('/users/:id', checkRole(["admin"]), ctrlUsers.usersDeleteOne);

//products
router.post('/products', checkRole(["business"]), ctrlProduct.productCreate);
router.get('/products/:idBusiness', checkRole(["admin", "business", "user"]), ctrlProduct.productsReadMany);
router.put('/products/:id', checkRole(["business"]), ctrlProduct.productsUpdateOne); 
router.delete('/products/:id', checkRole(["business"]), ctrlProduct.productsDeleteOne);
router.delete('/products', checkRole(["business"]), ctrlProduct.productsDeleteMany);

//business
router.post('/business', checkRole(["admin"]), ctrlBusiness.create);
router.get('/business', checkRole(["admin", "business", "user"]), ctrlBusiness.businessReadAll);
router.put('/business/:id', checkRole(["business"]), ctrlBusiness.businessUpdateOne); 
router.delete('/business/:id', checkRole(["admin"]), ctrlBusiness.businessDeleteOne);

module.exports = router;