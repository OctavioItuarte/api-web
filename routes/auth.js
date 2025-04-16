var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var User = require('../models/userModel');
//var Admin = require('../models/adminModel');
var ctrlUser = require('../controllers/users');

var ctrl;

router.get("/existsuser/:email", ctrlUser.existsUser);

var existsUser = async function(req, res, next){
  console.log("Datos recibidos en /signup:", req.body); //Verifica qu� datos llegan
  try {
    var user = await User.find({email: req.body.email});
    if (user.length > 0) {
      return res.status(409).json({ message: "User already exists"});
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

var createUser = async function (req, res, next) {
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
      if (err) { return next(err); }

      try {
        delete req.body.password;
        req.body.salt = salt;
        req.body.hashed_password = hashedPassword;
        const newUser = await ctrlUser.create(req, res);
        
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

router.post('/signup/client', (req, res, next) => {existsUser(req, res, next); req.body.role="client"}, createUser);
router.post('/signup/business', (req, res, next) => {existsUser(req, res, next); req.body.role="business"}, createUser);
//router.post('/signup/admin', (req, res, next) => {existsUser(req, res, next); req.body.role="admin"}, createUser);

//Estrategia de autenticaci�n con username
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  try {
    var user = await User.findOne({ email:username }); // Buscar por username

    if (!user) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }

    const hashedPassword = crypto.pbkdf2Sync(password, Buffer.from(user.salt, 'hex'), 310000, 32, 'sha256');
    if (!crypto.timingSafeEqual(Buffer.from(user.hashed_password, 'hex'), hashedPassword)) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    
    return cb(null, {id:user._id, email:user.email, role:user.role});
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
router.post('/login/password', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        if(err){ next(err); }
        else if (!user) {
          return res.status(401).json({ message: 'Credenciales incorrectas' }); // No autorizado
        }
        req.logIn(user, function(err) {
          if (err) { return res.status(500).json({ message: 'Error al iniciar sesión' }); }
      
          // Enviar cookie de sesión
          /*
          res.cookie('session_id', req.sessionID, {
            httpOnly: true,
            secure: false, // Cambia a true si usas HTTPS
            sameSite: 'Lax'
          });*/
      
          return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
        });
    })(req, res, next)
  }
);

module.exports = router;
