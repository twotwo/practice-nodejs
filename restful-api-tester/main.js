// 接受的命令行参数
const optionDefinitions = [
  { name: "verbose", alias: "v", type: Boolean, defaultValue: true },
  { name: "src", type: String, multiple: true, defaultOption: true },
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
    file: { type: "dateFile", filename: "http.log" }
  },
  categories: {
    default: { appenders: ["file"], level: "debug" }
  }
})

const logger = log4js.getLogger("tester")

const axios = require("axios")
const instance = axios.create({
  baseURL: "http://localhost/game_platform_v3/",
  timeout: 1000,
  headers: { Origin: "http://monitor.feiliu.com/" }
})

const monitor = () => {
  instance.get("/article/home/10053?max=1").then(resp => {
    if (resp.data.code === 0) {
      logger.debug(
        "%s@%s, news = %o",
        resp.data.msg,
        resp.data.host,
        resp.data.list["news"]
      )
    } else {
      logger.error("[%d] %o", resp.status, resp.data)
    }
  })
}

// const timeout = 1000 * 60
// setInterval(() => {
//   monitor()
// }, timeout)

const excute = () => {
  const min = 4,
    max = 10
  //Generate Random number between
  const rand = Math.floor(Math.random() * (max - min + 1) + min)
  monitor()
  setTimeout(excute, rand * 1000)
}

excute()
