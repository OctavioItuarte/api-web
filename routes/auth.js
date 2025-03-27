var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var User = require('../models/userModel');
var Business = require('../models/businessModel');
var Admin = require('../models/adminModel');
var ctrlUsers = require('../controllers/users');
var ctrlBusiness = require('../controllers/business');

var ctrlAdmin = require('../controllers/admin');

var model, ctrl;

var existsUser = async function(req, res, next){
  console.log("Datos recibidos en /signup:", req.body); //Verifica qu� datos llegan

  try {
    // ?? Verifica si el usuario ya existe
    const existingUser = await model.findOne({ email: req.body.email });
    
    if (existingUser) {
      return res.status(400).send("Error: El correo ya est� registrado.");
    }
    next();
  }
  catch (err) {
    console.error("Error al verificar user:", err);
    res.status(500).send("Error en el servidor");
  }
};

var createUser = async function (req, res, next) {
  console.log("Datos recibidos en /signup:", req.body); //Verifica qu� datos llegan
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
      if (err) { return next(err); }

      try {
        req.body.salt = salt;
        req.body.hashed_password = hashedPassword;
        const newUser = await ctrl.create(req, res);
        
        res.status(201).json(newUser);

      } catch (saveError) {
        console.error("Error al guardar usuario:", saveError);
        res.status(500).send("Error al registrar usuario");
      }
    });

  } catch (err) {
    console.error("Error al verificar usuario:", err);
    res.status(500).send("Error en el servidor");
  }
};

router.post('/signup/user', (req, res, next) => {model=User; existsUser(req, res, next)}, (req, res, next) => {ctrl=ctrlUsers; createUser(req, res, next)});
router.post('/signup/business', (req, res, next) => {model=Business; existsUser(req, res, next)}, (req, res, next) => {ctrl=ctrlBusiness; createUser(req, res, next)});

//router.post('/signup/admin', (req, res, next) => {model=Admin; existsUser(req, res, next)}, (req, res, next) => {ctrl=ctrlAdmin; createUser(req, res, next)});


//Estrategia de autenticaci�n con username
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  try {
    var user = await User.findOne({ email:username }); // Buscar por username
    const business = await Business.findOne({ email:username });
    const admin = await Admin.findOne({ email:username });

    if (user)
      user.role = "user";
    else if (business){
      user=business;
      user.role = "business";
    }
    else if (admin){
      user=admin;
      user.role = "admin";
    }
    else if (!user && !business && !admin) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }

    const hashedPassword = crypto.pbkdf2Sync(password, Buffer.from(user.salt, 'hex'), 310000, 32, 'sha256');
    if (!crypto.timingSafeEqual(Buffer.from(user.hashed_password, 'hex'), hashedPassword)) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    
    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
}));

//Serializaci�n y deserializaci�n de usuario
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, role: user.role });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.get('/index', function(req, res) {
  res.render('index');
});

//Ruta para procesar el login
router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/'
}));

module.exports = router;
