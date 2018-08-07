const log4js = require("log4js")
const logger = log4js.getLogger()
// default level is OFF - which means no logs at all.
logger.level = 'all'
logger.trace("this is trace")
logger.debug("this is debug")
logger.info("this is info")
logger.warn("this is warn")
logger.error("this is error")
logger.fatal("this is fatal")
