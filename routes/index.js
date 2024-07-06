var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');


//users
router.post('/users', ctrlUsers.usersCreate);
router.get('/users', ctrlUsers.usersReadAll);
router.put('/users/:id', ctrlUsers.usersUpdateOne); 
router.delete('/users/:id', ctrlUsers.usersDeleteOne); 
 
 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;






