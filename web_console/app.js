var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

if (process.env.NODE_ENV==='dev') {
	if (process.platform==='win32') {
        var config = require('./conf/config-win.json'); //windows开发环境的配置
        console.log('load ../conf/config-win.json');
    }else {
        var config = require('./conf/config-dev.json'); //非windows的开发环境
        console.log('load ../conf/config-dev.json');
    }
}else if (process.env.NODE_ENV==='qa'){
	var config = require('./conf/config-qa.json'); //测试环境的配置
	console.log('load ../conf/config-qa.json');
}else {
	var config = require('./conf/config.json'); //正式环境的配置
	console.log('load ../conf/config.json');
}
app.locals.pathPrefix = path.join('.', config.context||'');
console.log("app.locals.pathPrefix="+app.locals.pathPrefix);

// add config to app
app.set('config', config); 

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

app.use('/', index);
app.use('/users', users);
app.use('/console', require('./routes/console'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
