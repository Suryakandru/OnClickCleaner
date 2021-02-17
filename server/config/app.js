/* 
Filename:       app.js
Student’s Name: Jiyuan Huang 
StudentID:      301083362
Date:           OCT 16,2020
*/
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');


let indexRouter = require('../routes/index');
let componentRouter = require('../routes/component');
let loginRouter = require('../routes/login');
let usersRouter = require('../routes/users');

let app = express();

let mongoose = require('mongoose');
let DB = require('./DB');

mongoose.connect(DB.URL, {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect('mongodb://db_user231:JwKLJTrQHXMbSuoI@cluster0.cflvj.mongodb.net/myppw');
let dbConnection = mongoose.connection; // alias

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', ()=>{
  console.log('MongoDB Connection OPEN');
});

dbConnection.once('connected', ()=>{
  console.log('MongoDB Connected');
});

dbConnection.on('disconnected', ()=>{
  console.log('MongoDB Disconnected');
});

dbConnection.on('reconnected', ()=>{
  console.log('MongoDB Reconnected');
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// setup session
app.use(session({
  secret :'Tim WWP', 
  resave : false,
  saveUninitialized: true, 
  cookie : { maxAge : 60000 }
}));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);

// for contact
app.use('/component-list', componentRouter);
// for login
app.use('/login', loginRouter);

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// js
//app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));
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
