var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth'); //for authorization
var logoutRouter = require('./routes/logout');
const sessionRouter = require('./routes/session');

const cors = require('cors');

var session = require('express-session');
var MongoStore = require('connect-mongo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: 'http://localhost:4200', // <-- Permitir peticiones desde Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // <-- Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // <-- Encabezados permitidos
  credentials: true // <-- Permitir envío de cookies y credenciales
}));

app.options('*', cors()); // Permitir preflight requests en todas las rutas
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: 'keyboard cat', //Esta es la clave secreta para firmar las cookies
  resave: false, 
  saveUninitialized: false, 
  store: MongoStore.create({
    mongoUrl: '',  //-------------------URI
    collectionName: "sessions",
    ttl: 10 * 60 //Expiraci�n de sesi�n en 10 minutos
  })
}));

app.use(passport.initialize());
app.use(passport.session());


//app.use(passport.authenticate('session'));

app.use('/', authRouter);
app.use('/session', sessionRouter); // permitir libremente consultar sesión


app.use(function(req, res, next) {
  if (!req.user) {
    return res.status(401).send("No se encontro una sesion.");
  }
  next();
});

app.use('/', indexRouter);
app.use('/', logoutRouter);


// Middleware para hacer "user" disponible en las vistas
app.use(function(req, res, next) {
  res.locals.user = req.user; // Esto permite usar `if user` en Jade
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
