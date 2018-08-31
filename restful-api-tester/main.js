/**
 * node main.js -v --url <my url> --logtype console --origin <my host>
 */

// 接受的命令行参数
const optionDefinitions = [
  { name: "verbose", alias: "v", type: Boolean, defaultValue: true },
  { name: "url", type: String, multiple: false, defaultOption: true },
  { name: "origin", type: String, defaultValue: "http://monitor.net" },
  { name: "logtype", type: String, defaultValue: "dateFile" },
  { name: "timeout", alias: "t", type: Number }
]

// 使用 commandLineArgs() 来获得命令传入的参数 options
const commandLineArgs = require("command-line-args")
const options = commandLineArgs(optionDefinitions)

// debug信息: https://www.npmjs.com/package/debug
const debug = require("debug")("cli")
if (options.verbose) {
  debug.enabled = true
  debug("options = %O", options)
}

debug("command argv = %s", process.argv)

// node clp.js -vt 1000 one.js two.js
console.log("options = %o", options)

const log4js = require("log4js")

log4js.configure({
  appenders: {
    file: { type: options.logtype, filename: "http.log" }
  },
  categories: {
    default: { appenders: ["file"], level: "debug" }
  },
  pm2: true,
  pm2InstanceVar: "INSTANCE_ID"
  // disableClustering: true
})

const logger = log4js.getLogger("tester")

const url = require("url")
const myURL = url.parse(options.url)
const baseURL = myURL.port
  ? `${myURL.protocol}//${myURL.hostname}:${myURL.port}/`
  : `${myURL.protocol}//${myURL.hostname}/`
const URI = myURL.path
logger.info("baseURL = %s, URI = %s, origin = %s", baseURL, URI, options.origin)

const axios = require("axios")
const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: { Origin: options.origin }
})

let headers = {}

const monitor = () => {
  instance
    .get(URI, { headers })
    .then(resp => {
      if (resp.headers["set-cookie"]) {
        headers = { Cookie: resp.headers["set-cookie"] }
        debug("find cookie=%s", resp.headers["set-cookie"])
      }
      if (resp.data.code === 0) {
        logger.debug(
          "[%d] %s@%s, news = %o",
          process.env.INSTANCE_ID,
          resp.data.msg,
          resp.data.host,
          resp.data.list["news"]
        )
      } else {
        logger.error("[%d] %o", resp.status, resp.data)
      }
    })
    .catch(ex => {
      logger.error("get failed. err = %s", ex.message)
    })
}

/**
 * Generate Random Time in Seconds
 */
const genRandomTime = () => {
  let min = 20,
    max = 100
  const now = new Date()
  if ([19, 20, 21].indexOf(now.getHours()) !== -1) {
    min = 5
    max = 15
  }

  if ([0, 8, 9, 11, 12, 13, 18, 22, 23].indexOf(now.getHours()) !== -1) {
    max = 20
  }

  //Generate Random number between
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000
}

const excute = () => {
  monitor()
  setTimeout(excute, genRandomTime())
}

excute()
