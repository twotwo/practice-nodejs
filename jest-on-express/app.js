const express = require('express')
// 1. add debug
const debug = require('debug')('srv:app')
const path = require('path')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))

/**
 * 2. replace cookie-parser with express-session
 */
const session = require('express-session')
app.use(
  session({
    name: 'sid', // The name of the session ID cookie to set in the response (and read from in the request).
    secret: 'express generator',
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

/**
 * 4. insert index router at application context
 */
debug('indexRouter@%s', app.get('context'))
const indexRouter = require('./routes/index')
app.use(app.get('context'), indexRouter)

module.exports = app
