const log4js = require("log4js")
const debug = require("debug")("pm2-tester")
debug.enable = true

// NOTE: for PM2 support to work you'll need to install the pm2-intercom module
// `pm2 install pm2-intercom`
log4js.configure({
  appenders: {
    out: { type: "dateFile", filename: "log/pm2logs.log" }
  },
  categories: {
    default: { appenders: ["out"], level: "info" }
  },
  pm2: true,
  pm2InstanceVar: "INSTANCE_ID"
})
const logger = log4js.getLogger("app")
debug("[%d] I'm forever blowing bubbles %d", process.env.INSTANCE_ID, process.pid)
logger.info("[%d] I'm forever blowing bubbles %d", process.env.INSTANCE_ID, process.pid)
logger.info("[%d] I'm forever blowing bubbles %d", process.env.INSTANCE_ID, process.pid)
logger.info("[%d] I'm forever blowing bubbles %d", process.env.INSTANCE_ID, process.pid)
logger.info("[%d] last bubbles %d", process.env.INSTANCE_ID, process.pid)
// give pm2 time to set everything up, before we tear it down
setTimeout(() => {
  log4js.shutdown(() => {
    debug("[%d] All done, shutdown cb returned.", process.env.INSTANCE_ID)
  })
}, 5000)

const cluster = require("log4js/lib/clustering")
debug(
  "pid=%d, instance id=%d, isMaster?%s",
  process.pid,
  process.env.INSTANCE_ID,
  cluster.isMaster()
)
