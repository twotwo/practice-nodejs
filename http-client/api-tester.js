// 接受的命令行参数
const optionDefinitions = [
  { name: "verbose", alias: "v", type: Boolean, defaultValue: true },
  { name: "base", alias: "b", type: String },
  { name: "id", type: String },
  { name: "command", type: String, multiple: true, defaultOption: true },
  { name: "timeout", alias: "t", type: Number }
]

// 使用 commandLineArgs() 来获得命令传入的参数 options
const commandLineArgs = require("command-line-args")
const options = commandLineArgs(optionDefinitions)

// debug信息: https://www.npmjs.com/package/debug
const debug = require("debug")("api")
if (options.verbose) {
  debug.enabled = true
  debug("options = %O", options)
}

// node clp.js -vt 1000 one.js two.js
console.log("options = %o", options)

const axios = require("axios")
function makeRequestsFromArray(arr) {
  let index = 0
  let cookie = ""
  function request() {
    let url = options.base + arr[index] + "?open_id=" + options.id
    debug("request %d, url=%s", index, url)
    return axios
      .get(url, { withCredentials: true, headers: { Cookie: cookie } })
      .then(resp => {
        if (Array.isArray(resp.headers["set-cookie"])) {
          debug("cookie = %S", resp.headers["set-cookie"][0])
          cookie = resp.headers["set-cookie"][0]
        }
        
        debug("resp = %S", resp.data)
        index++
        if (index >= arr.length) {
          return "done"
        }
        return request()
      })
  }
  return request()
}

makeRequestsFromArray(options.command)
