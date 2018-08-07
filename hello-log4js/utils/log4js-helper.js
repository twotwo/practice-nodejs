const log4js = require("log4js")
const path = require("path")

// exports alias of module.exports
/**
 * init log4js configration
 * 
 * @param {*} logDirectory appender.dateFile's path
 */
exports.init = logDirectory => {
  log4js.configure({
    appenders: {
      console: { type: "console" },
      httpFile: {
        type: "dateFile",
        filename: path.join(logDirectory, "http.log")
      },
      serviceFile: {
        type: "dateFile",
        filename: path.join(logDirectory, "service.log")
      }
    },
    categories: {
      http: { appenders: ["httpFile"], level: "info" },
      service: { appenders: ["serviceFile"], level: "info" },
      default: { appenders: ["console"], level: "info" }
    }
  })
  log4js.getLogger().info("log4js save logFile to [%s]", logDirectory)
}

/**
 * get a logger
 * 
 * @param {*} name logger's name, see also init()
 */
exports.getLogger = name => {
  if (!name) {
    name = "default"
  }
  return log4js.getLogger(name)
}

/**
 * https://log4js-node.github.io/log4js-node/connect-logger.html
 * @param {*} app - Express Instance
 */
exports.setConnectLogger = app => {
  const logger = log4js.getLogger("http")

  // setup the logger
  // const format = ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status - :response-time ms - :res[content-length] ":referrer" ":user-agent"'
  app.use(
    log4js.connectLogger(logger, {
      level: "auto",
      format: (req, res, format) =>
        format(
          `:remote-addr - ${
            req.headers["origin"]
          } - ":method :url HTTP/:http-version" :status :content-length - :response-time ms - ":referrer" ":user-agent"`
        ),
      nolog: "\\.(gif|jpe?g|png)$"
    })
  )
}
