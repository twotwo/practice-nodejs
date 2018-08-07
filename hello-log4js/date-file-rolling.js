const logHelper = require("./utils/log4js-helper")

// init log4js config, only once
logHelper.init(process.env.LOGGER_PATH || "/tmp/log")

// get service logger
const logger = logHelper.getLogger("service")

setInterval(() => {
  logHelper.getLogger().info("i'm a default log")
  logger.info("i'm a service log")
}, 1000)
