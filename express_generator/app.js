/**
 * Gen by [express-generator](https://github.com/expressjs/generator)
 * 
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
/**
 * [morgan](https://github.com/expressjs/morgan) HTTP request logger middleware for node.js
 * 
 * `common` :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
 * `dev` :method :url :status :response-time ms - :res[content-length]
 */
var logger = require('morgan');
var cookieParser = require('cookie-parser');
/**
 * [body-parser](https://github.com/expressjs/body-parser) parse HTTP Body to req.body
 */
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Use the express.Router class to create modular,
 * load router modules in the app
 */
var index = require('./routes/index');
app.use('/', index);

var users = require('./routes/users');
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //route to error handling
  next(err);
});

/**
 * [Error handling](http://expressjs.com/en/guide/error-handling.html)
 * 
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
