const log4js = require("log4js")
const path = require("path")
const callerPath = require("caller-path")

// exports alias of module.exports
/**
 * init log4js configration by NODE_ENV
 */
exports.init = () => {
  if (global.log4js) {
    log4js
      .getLogger("log4js-helper")
      .error("won't init twice, called by[%s]", callerPath())
    return
  }
  const env = process.env.NODE_ENV || "development"
  let config = require("../config/logging")[env]
  if (typeof config === "string") {
    config = require("../config/logging")[config]
  }
  log4js.configure(config)
  
  global.log4js = true
  //vpc hostname
  global.hostname = process.env.HOSTNAME || "guessorset"
  log4js
    .getLogger("log4js-helper")
    .info(
      "[%s]env = %s, called by[%s]\nconfig=%O",
      global.hostname,
      env,
      callerPath(),
      config
    )

}

/**
 * get a logger
 *
 * @param {*} name - name of log category
 */
exports.getLogger = name => {
  if (!name) {
    name = "default"
  }
  return log4js.getLogger(name)
}

/**
 * get a logger
 *
 * @param {*} name - name of log category
 */
exports.info = (name, info) => {
  if (process.env.INSTANCE_ID) {
    info = '[' + process.env.INSTANCE_ID+'] '+info
  }
  log4js.getLogger(name).info(info)
}

/**
 * https://log4js-node.github.io/log4js-node/connect-logger.html
 * @param {*} app - Express Instance
 */
exports.setConnectLogger = app => {
  const logger = log4js.getLogger("http")

  // setup the logger
  // const format = ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status - :response-time ms - :res[content-length] ":referrer" ":user-agent"'
  app.use(log4js.connectLogger(logger, {
      level: "auto",
      format: (req, res, format) =>
        format(
          `:remote-addr - ${req.headers["origin"]} - ${
            process.env.INSTANCE_ID
          } - ":method :url HTTP/:http-version" :status - :response-time ms - :content-length - ":referrer" ":user-agent"`
        ),
      nolog: "\\.(gif|jpe?g|png)$"
    }))
}
