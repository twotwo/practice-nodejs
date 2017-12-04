# web_console

A Node.js app using [Express 4](http://expressjs.com/).

## Dependencies

 * express-generator `npm install -g express-generator # Gloabal Install`


## Generate Project by express-generator

Make sure you have [Node.js](http://nodejs.org/) lts/carbon and [express-generator](http://wiki.li3huo.com/Node.js#express-generator) installed.

```bash
➜  practice-nodejs git:(master) ✗ express --view=hbs web_console && cd web_console
...

   install dependencies:
     $ cd hello_node && npm install

   run the app:
     $ DEBUG=hello-node:* npm start

```

### config app port

    "config": {"port": "3001"} #add to package.json

    var port = normalizePort(process.env.npm_package_config_port); #add to bin/www

## Running Project


```bash
git clone https://github.com/twotwo/practice-nodejs.git # or clone your own fork
cd web_console
npm install
npm start
```

## Components

### route
在routes/下定义一条新的路由: console.js；
在app.js中应用路由：app.use('/console', require('./routes/console'));

### view
use [hbs](https://github.com/pillarjs/hbs) as view engine, refer to [模板引擎 hbs 备忘](http://www.cnblogs.com/chyingp/p/hbs-getting-started.html)

### module
MVC中的 module , 对应后台中的业务逻辑

### persistence
持久层，数据库、缓存或文件系统
