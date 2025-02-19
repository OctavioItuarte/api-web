var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var User = require('../models/userModel');


//Estrategia de autenticación con username
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  try {
    const user = await User.findOne({ username }); // Buscar por username
    if (!user) {
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


//Serialización y deserialización de usuario
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user._id, username: user.username }); // Guardar solo id y username
  });
});


passport.deserializeUser(async function(user, cb) {
  try {
    const foundUser = await User.findById(user.id);
    if (!foundUser) {
      return cb(null, false);
    }
    cb(null, foundUser);
  } catch (err) {
    cb(err);
  }
});


//Ruta para mostrar el formulario de login
router.get('/login', function(req, res) {
  res.render('login');
});


//Ruta para procesar el login
router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));


//Ruta para cerrar sesión
router.post('/logout', (req, res, next) => {
  req.logout((err) => { // Se le pasa un callback
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.redirect('/login'); 
    });
  });
});


//Ruta para mostrar el formulario de signup
router.get('/signup', function(req, res) {
  res.render('signup');
});


//Ruta para procesar el registro de usuario
router.post('/signup', async function (req, res, next) {
  console.log("Datos recibidos en /signup:", req.body); //Verifica qué datos llegan

  try {
    // ?? Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("Error: El correo ya está registrado.");
    }

    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
      if (err) { return next(err); }

      try {
        const newUser = new User({
          name: {
            first: req.body.firstName,
            last: req.body.lastName
          },
          username: req.body.username,
          email: req.body.email,
          birthdate: req.body.birthdate,
          salt: salt,
          hashed_password: hashedPassword
        });

        await newUser.save();

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });

      } catch (saveError) {
        console.error("Error al guardar usuario:", saveError);
        res.status(500).send("Error al registrar usuario");
      }
    });

  } catch (err) {
    console.error("Error al verificar usuario:", err);
    res.status(500).send("Error en el servidor");
  }
});


module.exports = router;
