const logHelper = require("./utils/log4js-helper")

// init log4js config
logHelper.init()

// get service logger
const logger = logHelper.getLogger("service")

setInterval(() => {
  // twice init don't work
  logHelper.init()
  logHelper.getLogger().info("i'm a default log")
  logger.info("i'm a service log")
}, 1000)
