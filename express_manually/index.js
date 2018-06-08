const express = require("express")
const app = express()

app.set("port", process.env.npm_package_config_port || 3000)
app.use(express.static(__dirname + "/"))

// get an instance of router
let router = express.Router()

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

app.listen(app.get("port"), () => {
  console.log("Node app is running at localhost:" + app.get("port"))
})
