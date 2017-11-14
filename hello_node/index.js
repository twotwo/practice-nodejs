var express = require('express')
var app = express()

app.set('port', (process.env.npm_package_config_port))
app.use(express.static(__dirname + '/'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})