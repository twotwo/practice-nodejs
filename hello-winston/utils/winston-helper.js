const { Logger, createLogger, format, transports } = require("winston")
const { combine, timestamp, label, printf, simple } = format
const expressWinston = require("express-winston")

const path = require("path")

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}](${process.env.INSTANCE_ID || -1}) ${
    info.level
  }: ${info.message}`
})

// exports alias of module.exports
/**
 * init log4js configration by NODE_ENV
 */
exports.init = () => {
  if (global.winston) {
    // log4js
    //   .getLogger("log4js-helper")
    //   .error("won't init twice, called by[%s]", callerPath())
    return
  }

  global.winston = {}
}

/**
 * get a logger
 *
 * @param {*} name - label of the log
 */
exports.getLogger = name => {
  if (!global.winston[name]) {
    const logger = createLogger({
      format: combine(label({ label: name }), timestamp(), myFormat),
      transports: [
        new transports.File({ filename: "log/error.log", level: "error" }),
        new transports.File({ filename: "log/combined.log" })
      ]
    })
    if (process.env.NODE_ENV !== "production") {
      logger.add(new transports.Console({ format: simple() }))
    }
    global.winston[name] = logger
  }
  return global.winston[name]
}

/**
 * https://www.npmjs.com/package/express-winston
 * @param {*} app - Express Instance
 */
exports.setConnectLogger = app => {
  // setup the logger
  // const format = ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status - :response-time ms - :res[content-length] ":referrer" ":user-agent"'

  let winstonOptions = {
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.align(),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),

    transports: [new transports.Console()]
  }

  let expressWinstonOptions = {
    meta: false,
    msg: `{{process.env.INSTANCE_ID || -1}} - {{req.ip}} - {{req.method}} - {{req.url}} {{res.statusCode}} {{res.responseTime}}ms`,
    colorize: true
  }

  // HACK: Remove when `express-winston` fixes this
  // HACK: See https://github.com/bithavoc/express-winston/issues/163
  expressWinstonOptions.winstonInstance = createLogger(winstonOptions)
  app.use(expressWinston.logger(expressWinstonOptions))
}
