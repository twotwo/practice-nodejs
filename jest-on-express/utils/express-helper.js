const debug = require('debug')('unit:express-helper')
const log4js = require('./log4js-helper')
const log = log4js.getLogger('express-helper')

const redis = require('./redis-helper')

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class
 */
class Helper {
  constructor () {
    log.warn('init instance')
  }

  /**
   * set remote address in session
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  setRemoteAdress (req, res, next) {
    // expose session to *.hbs
    res.locals.session = req.session
    if (!req.session.remoteAdress) {
      req.session.remoteAdress = (
        req.headers['x-forwarded-for'] ||
        // req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
      ).split(',')[0]
    }
    next()
  }

  /**
   *
   * @param {Number} duration store cache in seconds
   */
  cache (duration) {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url
      // let cachedResp = cache.get(key)
      return redis
        .get(key)
        .then(cachedResp => {
          if (cachedResp) {
            res.status(cachedResp.status).send(cachedResp.body)
          } else {
            debug('saving key[%s]', key)
            res.sendResponse = res.send
            res.send = body => {
              // cache.put(key, { body, status: res.statusCode }, duration * 1000)
              redis.put(key, { body, status: res.statusCode }, duration)
              res.sendResponse(body)
            }
            next()
          }
        })
        .catch(ex => {
          log.error("redis.get('test') err=%s", ex.message)
        })
    }
  }
}

/**
 * [Node.js ES6 classes with require](https://stackoverflow.com/questions/42684177/node-js-es6-classes-with-require)
 */
module.exports = new Helper()
