const express = require("express")
const app = express()

app.set("port", process.env.npm_package_config_port || 3000)
app.use(express.static(__dirname + "/"))

app.get("/", (req, res) => {
  res.send("Hello World!")
})

/**
 * curl http://localhost:3000/news/123
 */
app.get("/news/:id", (req, res) => {
  res.send("news id = "+req.params.id)
})

app.listen(app.get("port"), () => {
  console.log("Node app is running at localhost:" + app.get("port"))
})
