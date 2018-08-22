/**
 * Project generat by [express-generator](https://github.com/expressjs/generator)
 *
 * 4 steps practise to improve
 */

// 1. add debug
const debug = require('debug')('srv:app')

const express = require('express')
const path = require('path')

const app = express()

/**
 * [morgan](https://github.com/expressjs/morgan) HTTP request logger middleware for node.js
 *
 * `common` :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
 * `dev` :method :url :status :response-time ms - :res[content-length]
 */
const logger = require('morgan')
app.use(logger('dev'))

/**
 * 2. replace cookie-parser with express-session
 */
const session = require('express-session')
app.use(
  session({
    name: 'sid', // The name of the session ID cookie to set in the response (and read from in the request).
    secret: 'express practise',
    resave: false,
    saveUninitialized: true,
    cookie: {
      // 在 HTTP 中也激活 cookie
      secure: false,
      // Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute.
      maxAge: 3600000 // one hour
    }
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**
 * 3. set context with CONTEXT=...
 */
const context = process.env.CONTEXT || '/'
debug('process.env.CONTEXT=%s', context)
app.set('context', context)

// set static at context
app.use(app.get('context'), express.static(path.join(__dirname, 'public')))
// const favicon = require('serve-favicon');
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/**
 * 4. insert index router to application context
 */
debug('mount routes to %s', app.get('context'))
const routes = require('./routes')
app.use(app.get('context'), routes)

module.exports = app
