const winston = require("./utils/winston-helper")
winston.init()
const log = winston.getLogger("www")
log.info('hello')
