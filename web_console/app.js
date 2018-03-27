const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
// const cookieParser = require('cookie-parser');
/**
 * [body-parser](https://github.com/expressjs/body-parser) parse HTTP Body to req.body
 */
const bodyParser = require('body-parser');
/**
 * [express-session](https://github.com/expressjs/session)
 */
const session = require('express-session');

const app = express();

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
  //enable PROD_MODE in views/layout.hbs
  app.locals.PROD_MODE=true;
}
app.locals.pathPrefix = path.posix.join('.', config.context||'');
console.log("app.locals.pathPrefix="+app.locals.pathPrefix);

/**
 * Global properties
 */
global.config = config;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({
  secret: "My Console",
  resave: false,
  saveUninitialized: false
}));

/**
 * 路由设置
 */
const index = require('./routes/index');
app.use('/', index); //多加一个根路由
const webContext = path.posix.join('/', app.locals.pathPrefix);
app.use(webContext, index); //context+本应用的根路由
app.use(webContext+'/users', require('./routes/users'));
app.use(webContext+'/console', require('./routes/console'));
// app.use(webContext+'/login', require('./routes/login'));

app.use(webContext, express.static(path.posix.join(__dirname, 'public')));

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
