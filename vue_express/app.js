const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
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

/**
 * Global properties
 */
const helper = require('./libs/express_helper.js');
let config = helper.getConfig();
global.config = config;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.locals.* expose in *.hbs
app.locals.pathPrefix = path.posix.join('.', config.context||'');
const webContext = path.posix.join('/', app.locals.pathPrefix);
console.log("webContext = "+webContext);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
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
// const index = require('./routes/index');
// // app.use('/', index); //多加一个根路由
// app.use(webContext+'/index', index); //context+本应用的根路由
// app.use(webContext+'/users', require('./routes/users'));
// app.use(webContext+'/console', require('./routes/console'));
// app.use(webContext+'/login', require('./routes/login'));

//开发模式下打开前端调试模式
if (process.env.NODE_ENV==='dev') {
    console.log('load webpack-dev-middleware...');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackConfig = require('./build/webpack.dev.conf.js');
    // console.log('publicPath: '+webpackConfig.output.publicPath);
    const webpack = require('webpack');
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webContext
    }));
} else {
    app.use(webContext, express.static(path.posix.join(__dirname, 'dist')));
}

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
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
