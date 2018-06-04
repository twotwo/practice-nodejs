// 接受的命令行参数
const optionDefinitions = [
  { name: "verbose", alias: "v", type: Boolean },
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

// node clp.js -vt 1000 one.js two.js
console.log("options = %o", options)
