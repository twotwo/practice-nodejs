const debug = require('debug')('unit:express-helper')
const log4js = require('./log4js-helper')
const log = log4js.getLogger('express-helper')

const redis = require('./redis-helper')

/**
 * https://www.npmjs.com/package/connect-redis
 */
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class
 */
class Helper {
  constructor () {
    log.warn('init instance')
    this.store = new RedisStore({ client: redis.getClient() })
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
   * express-session with redis
   */
  getSession () {
    return session({
      name: 'sid', // The name of the session ID cookie to set in the response (and read from in the request).
      secret: 'express key',
      resave: false,
      saveUninitialized: true,
      cookie: {
        // 在 HTTP 中也激活 cookie
        secure: false,
        // Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute.
        maxAge: 3600000 // one hour
      },
      store: this.store
    })
  }

  /**
   *
   * @param {Number} duration store cache in seconds
   */
  cache (duration) {
    return (req, res, next) => {
      // use url as key
      let key = '__express__' + req.originalUrl || req.url
      // let cachedResp = cache.get(key)
      return redis
        .get(key)
        .then(cachedResp => {
          if (cachedResp) {
            // hit response cache, return response
            res.status(cachedResp.status).send(cachedResp.body)
          } else {
            // missing, continue running
            res.sendResponse = res.send
            res.send = body => {
              // cache.put(key, { body, status: res.statusCode }, duration * 1000)
              debug('saving key[%s]', key)
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
