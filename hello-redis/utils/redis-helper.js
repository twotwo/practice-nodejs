const debug = require("debug")("unit:redis-helper")
// debug.enabled = true
const log4js = require("../utils/log4js-helper")
const log = log4js.getLogger("redis-helper")

/**
 * https://www.npmjs.com/package/redis
 *
 * 客户端 client 与 redis 连接之后，可通过 client+commend 执行redis操作，callback 的参数为err 和 redis的返回结果
 *
 * http://www.redis.cn/commands.html   查找redis命令大全
 */
const redis = require("redis")

/**
 * https://www.npmjs.com/package/connect-redis
 */
session = require("express-session")
const RedisStore = require("connect-redis")(session)

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class
 */
class Cache {
  constructor() {
    debug("init instance")
    /**
     *  1. 根据环境加载 redis 的配置信息
     */
    const env = process.env.NODE_ENV || "development"
    const config = require("../config/redis")[env]
    this.client = redis.createClient(config)
    this.store = new RedisStore({ client: this.client })

    // Native Promises
    const { promisify } = require("util")
    this.getAsync = promisify(this.client.get).bind(this.client)

    /**
     * 异常情况记录错误日志
     */
    this.client.on("error", err => {
      log.error(err)
    })
  }

  /**
   * 获取 RedisStore 实例
   */
  getStore() {
    return this.store
  }

  /**
   * 往缓存中存数据
   *
   * @param {String} key
   * @param {Object} value json 对象
   * @param {Number} time 存储时间 in second
   */
  put(key, value, time) {
    if (
      typeof time !== "undefined" &&
      (typeof time !== "number" || isNaN(time) || time <= 0)
    ) {
      throw new Error("Cache timeout must be a positive number")
    }
    if (typeof value === "object") {
      value = JSON.stringify(value)
    } else {
      throw new Error("value must be an object")
    }
    debug("put(%s, %d)=%o", key, time, value)
    //expire after time seconds
    this.client.set(key, value, "EX", time)
  }

  /**
   * 从缓存中拿数据，未找到返回 null
   * @param {String} key
   */
  get(key) {
    // return null
    // this.client.get(key, (err, reply) => {
    //   if (err) {
    //     debug("get(%s) err=%O", key, err)
    //     return null
    //   }
    //   debug("get(%s)=%O", key, JSON.parse(reply))
    // })
    return this.getAsync(key)
      .then(reply => {
        return JSON.parse(reply)
      })
      .catch(err => {
        log.error("get(%) err = %s", key, err.message)
        throw err
      })
  }

  /**
   * 关闭 redis 连接
   */
  close() {
    debug("close redis connection")
    log4js
      .getLogger("redis-helper")
      .warn("sends the quit command to the redis server")
    // debug("close redis client.quit() = %o", this.client.quit())
    // debug("close redis client.end(true) = %o", this.client.end(true))
    this.client.quit()
  }
}

// module.exports = { store, close }

/**
 * [Node.js ES6 classes with require](https://stackoverflow.com/questions/42684177/node-js-es6-classes-with-require)
 */
module.exports = new Cache()
