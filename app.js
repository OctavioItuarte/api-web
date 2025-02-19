var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth'); //for authorization
var session = require('express-session');
var MongoStore = require('connect-mongo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para hacer "user" disponible en las vistas
app.use(function(req, res, next) {
  res.locals.user = req.user; // Esto permite usar `if user` en Jade
  next();
});

app.use('/', indexRouter);
app.use('/', authRouter);

app.use(session({
  secret: 'keyboard cat', //Esta es la clave secreta para firmar las cookies
  resave: false, 
  saveUninitialized: false, 
  store: MongoStore.create({
    mongoUrl: 'mongodb://bitnami:bitnami1999@127.0.0.1:27017/test',
    ttl: 14 * 24 * 60 * 60 //Expiración de sesión en 14 días
  })
}));

app.use(passport.initialize());
app.use(passport.session());

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
