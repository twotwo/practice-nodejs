const express = require("express")
const app = express()

app.set("trust proxy", (ip) => {
  console.log('ip =', ip)
  return true
})
app.set("port", process.env.npm_package_config_port || 3000)
app.use(express.static(__dirname + "/"))

const winston = require("./utils/winston-helper")
// init winston
winston.init()
winston.setConnectLogger(app)

// get an instance of router
let router = express.Router()

// route middleware that will happen on every request
router.use((req, res, next) => {
  // log each request to the console
  let address = req.ips.join()
  if (address.length === 0) {
    address = req.ip
  }
   console.log("%s - %s - %s - %s", new Date().toTimeString(), address, req.method, req.url)
  // continue doing what we were doing and go to the route
  next()
})

/**
 * curl http://localhost:3000/news/123
 */
app.get("/news/:id", (req, res) => {
  res.send("news id = " + req.params.id)
})

// home page route
router.get("/", (req, res) => {
  res.send("Hello World!")
})

// apply the router to our application, start at /app
app.use("/app", router)

app.listen(app.get("port"), "127.0.0.1", () => {
  console.log("Node app is running at localhost:" + app.get("port"))
})
