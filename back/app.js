let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const helmet = require('helmet');

let cors = require('cors');
let app = express();
app.use(cors());

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let locationsRouter = require('./routes/locations');
let GameDetailsRouter = require('./routes/gameDetails');
let EventRouter = require('./routes/event');
let BadgeRouter = require('./routes/badge');
let GenreRouter = require('./routes/genre');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/locations', locationsRouter);
app.use('/gamedetails', GameDetailsRouter);
app.use('/event', EventRouter);
app.use('/badge', BadgeRouter);
app.use('/genre', GenreRouter);


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

app.use('/', indexRouter);
app.use('/api/v0/users', usersRouter);
app.use('/api/v0/locations', locationsRouter);
app.use('/api/v0/gamedetails', GameDetailsRouter);
app.use('/api/v0/event', EventRouter);
app.use('/api/v0/badge', BadgeRouter);
app.use('/api/v0/genre', GenreRouter);

module.exports = app;
