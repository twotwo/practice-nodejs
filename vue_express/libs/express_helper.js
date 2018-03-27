let debug = require('debug')('helper:express');

/**
 * set remote address in session
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.setRemoteAdress = function(req, res, next) {
  // expose session to *.hbs
  res.locals.session = req.session;
  if (!req.session.remoteAdress) {
    req.session.remoteAdress = (req.headers['x-forwarded-for'] ||
      // req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress).split(",")[0];
  }
  next();
};

/**
 * 获取应用运行配置
 */
exports.getConfig = () => {
  let config = {}
  if (process.env.NODE_ENV==='dev') {
    if (process.platform==='win32') {
      config = require('../config/dev.env.js'); //windows开发环境的配置
      debug('load ../conf/dev.env.js');
    }else {
      config = require('../config/dev.env.js'); //非windows的开发环境
      debug('load ../conf/dev.env.js');
    }
  }else if (process.env.NODE_ENV==='qa') {
    config = require('../config/test.env.js'); //测试环境的配置
    debug('load ../conf/test.env.js');
  }else {
    config = require('../config/prod.env.js'); //正式环境的配置
    debug('load ../conf/prod.env.js');
  }
  return config;
};