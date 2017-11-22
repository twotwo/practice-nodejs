# express_manually

my first node.js web service

## Generate Project

```bash
➜  practice-nodejs git:(master) ✗ mkdir express_manually && cd express_manually
➜  express_manually git:(master) ✗ npm init                        
... ##与hello_node相同
➜  express_manually git:(master) ✗ npm install express
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN express_manually@1.0.0 No description
npm WARN express_manually@1.0.0 No repository field.

+ express@4.16.2
added 48 packages in 92.065s
```

### index.js

```js
var express = require('express')
var app = express()

app.set('port', (process.env.npm_package_config_port||3000))
app.use(express.static(__dirname + '/'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
```

### package.json

```json
// 增加了 dependencies 的相关内容
```

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) lts/carbon installed.

```bash
git clone https://github.com/twotwo/practice-nodejs.git # or clone your own fork
cd hello_node
npm install
npm start
```

