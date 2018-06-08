const path = require("path")
const debug = require("debug")("srv:app")

/**
 * Gen by [express-generator](https://github.com/expressjs/generator)
 *
 */
const express = require("express")
const app = express()

// view engine setup
// app.set("views", path.join(__dirname, "views")) //模板文件所在目录
// app.set("view engine", "hbs") //要使用的模板引擎

// const favicon = require('serve-favicon');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/**
 * [morgan](https://github.com/expressjs/morgan) HTTP request logger middleware for node.js
 *
 * `common` :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
 * `dev` :method :url :status :response-time ms - :res[content-length]
 */
const logger = require("morgan")
app.use(logger("dev"))

/**
 * https://www.npmjs.com/package/cookie-parser
 * curl http://127.0.0.1:3000 --cookie "Cho=Kim;Greet=Hello"
 * in app: debug("Cookies: %O", req.cookies)
 * 请使用 express-session
 */
// const cookieParser = require('cookie-parser');
// app.use(cookieParser())

/**
 * lib参考 https://www.npmjs.com/package/express-session
 * 服务器通过传送HTTP 包头中的Set-Cookie 消息把一个cookie 发送到用户的浏览器中
 * 协议说明参考 https://cnodejs.org/topic/55f8d70a20d84f3d377582a3
 * curl -i http://127.0.0.1:3000 --cookie "sid=s%3AiZIGOUlPy8-tdiTiLyKetrS9GSexb8sJ.2pcuK72%2FqMzwpxDzO42nZRbhLOKh7Nfu32IklPHBsp0"
 */
const session = require("express-session")
app.use(
  session({
    name: "sid", //The name of the session ID cookie to set in the response (and read from in the request).
    secret: "express generator",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // 在 HTTP 中也激活 cookie
      secure: false,
      // Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute.
      maxAge: 3600000 //one hour
    }
  })
)

/**
 * [body-parser](https://github.com/expressjs/body-parser) parse HTTP Body to req.body
 */
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * `express.static` 是Express中内置的中间件函数，基于 serve-static
 * 负责提供 Express 应用程序的静态资源
 */
app.use(express.static(path.join(__dirname, "public")))

/**
 * api 总入口
 */
const index = require("./routes/index")
app.use("/api", index)

//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/app\?adf
app.post("/app", (req, res) => {
  debug("req.body=%O", req.body)
  debug("req.query=%O", req.query)
  if (req.session.sign) {
    debug("sid=%O", req.session)
    res.send("Welcome <strong>" + req.session.name + "</strong>, back again!\n")
  } else {
    req.session.sign = true
    req.session.name = "guest_" + req.sessionID.substr(-10, 10)
    res.send("Welcome <strong>" + req.session.name + "</strong> for login!\n")
  }
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error("Not Found")
  err.status = 404
  //route to error handling
  next(err)
})

/**
 * [Error handling](http://expressjs.com/en/guide/error-handling.html)
 *
 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "dev" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({ error: err.status, message: res.locals.message })
})

module.exports = app
