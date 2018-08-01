let debug = require("debug")("helper:express")

/**
 * set remote address in session
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.setRemoteAdress = (req, res, next) => {
  // expose session to *.hbs
  res.locals.session = req.session
  if (!req.session.remoteAdress) {
    req.session.remoteAdress = (
      req.headers["x-forwarded-for"] ||
      // req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    ).split(",")[0]
  }
  next()
}

/**
 * 获取应用运行配置
 */
exports.getConfig = () => {
  let config = {}
  if (process.env.NODE_ENV === "dev") {
    if (process.platform === "win32") {
      config = require("../config/dev.env.js") // windows开发环境的配置
      debug("load ../conf/dev.env.js")
    } else {
      config = require("../config/dev.env.js") // 非windows的开发环境
      debug("load ../conf/dev.env.js")
    }
  } else if (process.env.NODE_ENV === "qa") {
    config = require("../config/test.env.js") // 测试环境的配置
    debug("load ../conf/test.env.js")
  } else {
    config = require("../config/prod.env.js") // 正式环境的配置
    debug("load ../conf/prod.env.js")
  }
  return config
}

// https://www.npmjs.com/package/memory-cache
const cache = require("memory-cache")

/**
 *
 * @param {*} duration store cache in seconds
 */
exports.cache = duration => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url
    let cachedBody = cache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      debug("saving key[%s]", key)
      res.sendResponse = res.send
      res.send = body => {
        cache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }
      next()
    }
  }
}

/**
 * https://www.npmjs.com/package/morgan
 *
 * @param {*} app - set morgan as express logger middleware
 * @param {*} logFile - stream to log file
 */
exports.setLogger = (app, logFile) => {
  // log file rotation
  const fs = require("fs")
  const morgan = require("morgan")
  const path = require("path")
  // https://www.npmjs.com/package/rotating-file-stream
  const rfs = require("rotating-file-stream")

  const logDirectory = path.dirname(logFile)
  const fileName = path.basename(logFile)

  // ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

  // create a rotating write stream
  var accessLogStream = rfs(fileName, {
    interval: "1d", // rotate daily
    path: logDirectory
  })

  // setup the logger
  const format = ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status - :response-time ms - :res[content-length] ":referrer" ":user-agent"'
  app.use(morgan(format, { stream: accessLogStream }))
  debug("setLogger save logFile [%s] in [%s]", fileName, logDirectory)
}
