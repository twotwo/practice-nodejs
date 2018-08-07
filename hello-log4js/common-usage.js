/**
 * Initialise log4js first, so we don't miss any log messages
 */
const log4js = require("log4js")
const config = require("./config/log4js.json")
if (process.env.NODE_ENV === "dev") {
  //https://log4js-node.github.io/log4js-node/api.html#configuration---log4jsconfigureobject--string
  log4js.configure(config.dev)
  log4js.getLogger("log4js").info("use config.dev", config.dev)
} else {
  log4js.configure(config.production)
  log4js.getLogger("log4js").info("use config.production", config.production)
}

/**
 * https://log4js-node.github.io/log4js-node/api.html#loggers---log4jsgetloggercategory
 *
 * log4js.getLogger([category])
 */
const log = log4js.getLogger("startup")
log.error('error info')
log.warn('started')
log.info("start info", new Date())
log.debug('debug info')

const log2 = log4js.getLogger("another logger")
log2.error("error info")
log2.info('haha')