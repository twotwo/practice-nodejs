# hello_node

my first node.js web service

## Generate Project

```bash
➜  practice-nodejs git:(master) ✗ mkdir hello_node && cd hello_node
➜  hello_node git:(master) ✗ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (hello_node)
version: (1.0.0)
description: my first node.js web service
entry point: (index.js)
test command: tap test/*.js
git repository: https://github.com/twotwo/practice-nodejs.git
keywords: node.js startup
author: li3huo <twotwo.li@gmail.com> (http://li3huo.com)
license: (ISC) MIT
About to write to /private/tmp/hello_node/package.json:

{
  "name": "hello_node",
  "version": "1.0.0",
  "description": "my first node.js web service",
  "main": "index.js",
  "scripts": {
    "test": "tap test/*.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/twotwo/practice-nodejs.git"
  },
  "keywords": [
    "node.js",
    "startup"
  ],
  "author": "li3huo",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/twotwo/practice-nodejs/issues"
  },
  "homepage": "https://github.com/twotwo/practice-nodejs#readme"
}


Is this ok? (yes) yes
```

### index.js

```js
var http = require("http")

/* 使用package.json中定义的端口，如果没有定义就使用3000*/
var port = process.env.npm_package_config_port || 3000

http
  .createServer(function(req, res) {
    res.end("Hello World!")
  })
  .listen(port, "127.0.0.1")

console.log("Node app is running at localhost:" + port)
```

### package.json

```json
{
  "name": "hello_node",
  "version": "1.0.0",
  "description": "my first node.js web service",
  "main": "index.js",
  "config": {
    "port": "3000"
  },
  "scripts": {
    "start": "node index.js",
    "test": "tap test/*.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/twotwo/practice-nodejs.git"
  },
  "keywords": ["node.js", "startup"],
  "author": "li3huo",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/twotwo/practice-nodejs/issues"
  },
  "homepage": "https://github.com/twotwo/practice-nodejs/hello_node"
}
```

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) lts/carbon installed.

```bash
git clone https://github.com/twotwo/practice-nodejs.git # or clone your own fork
cd hello_node
npm install
npm start
```
