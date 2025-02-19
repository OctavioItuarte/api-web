var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlBusiness = require('../controllers/business');
var Business = require('../models/businessModel');


//users
router.post('/users', ctrlUsers.usersCreate);
router.get('/users', ctrlUsers.usersReadAll);
router.put('/users/:id', ctrlUsers.usersUpdateOne); 
router.delete('/users/:id', ctrlUsers.usersDeleteOne); 


//business
router.post('/business', ctrlBusiness.businessCreate);
router.get('/business', ctrlBusiness.businessReadAll);
router.put('/business/:id', ctrlBusiness.businessUpdateOne); 
router.delete('/business/:id', ctrlBusiness.businessDeleteOne); 


//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

//router.get('/', async function (req, res, next) {
//  try {
//    const businesses = await Business.find(); // Obtener negocios desde MongoDB
//    res.render('index', { title: 'E-commerce', businesses }); // Pasar los datos a la vista
//  } catch (err) {
//    console.error("Error obteniendo negocios:", err);
//    res.status(500).send("Error cargando la pÃ¡gina");
//  }
//});

//router.get('/', async function (req, res, next) {
//  try {
//    const businesses = await Business.find().lean();
//    const categorizedBusinesses = {};
//
//    businesses.forEach(business => {
//      if (!business.category) return;
//      if (!categorizedBusinesses[business.category]) {
//        categorizedBusinesses[business.category] = [];
//      }
//      categorizedBusinesses[business.category].push(business);
//    });
//
//    res.render('index', { 
//      title: 'Too Good To Go - Unicen', 
//      businesses: businesses || [], 
//      categorizedBusinesses: categorizedBusinesses || {} 
//    });
//
//  } catch (err) {
//    console.error("Error obteniendo negocios:", err);
//    res.status(500).send("Error cargando la página");
//  }
//});

router.get('/', async function (req, res, next) {
  try {
    const businesses = await Business.find().lean();
    const categorizedBusinesses = {};

    businesses.forEach(business => {
      if (!business || !business.category) return;
      const category = business.category.trim(); // Elimina espacios extra

      if (!categorizedBusinesses[category]) {
        categorizedBusinesses[category] = [];
      }
      categorizedBusinesses[category].push(business);
    });

    res.render('index', { 
      title: 'Too Good To Go - Unicen', 
      businesses: businesses || [], 
      categorizedBusinesses: categorizedBusinesses || {} 
    });

  } catch (err) {
    console.error("Error obteniendo negocios:", err);
    res.status(500).send("Error cargando la página");
  }
});


module.exports = router;