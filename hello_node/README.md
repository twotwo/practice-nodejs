# hello_node

A barebones Node.js app using [Express 4](http://expressjs.com/).

## Dependencies

 * express-generator `npm install -g express-generator # Gloabal Install`


## Generate Project by express-generator

Make sure you have [Node.js](http://nodejs.org/) lts/carbon and [express-generator](http://wiki.li3huo.com/Node.js#express-generator) installed.

```bash
➜  practice-nodejs git:(master) ✗ express --view=hbs hello_node && cd hello_node

   create : hello_node
   create : hello_node/package.json
   create : hello_node/app.js
   create : hello_node/public
   create : hello_node/routes
   create : hello_node/routes/index.js
   create : hello_node/routes/users.js
   create : hello_node/views
   create : hello_node/views/index.hbs
   create : hello_node/views/layout.hbs
   create : hello_node/views/error.hbs
   create : hello_node/bin
   create : hello_node/bin/www
   create : hello_node/public/javascripts
   create : hello_node/public/images
   create : hello_node/public/stylesheets
   create : hello_node/public/stylesheets/style.css

   install dependencies:
     $ cd hello_node && npm install

   run the app:
     $ DEBUG=hello-node:* npm start

➜  hello_node tree .
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.hbs
    ├── index.hbs
    └── layout.hbs

7 directories, 9 files
```

### config app port

    "config": {"port": "3001"} #add to package.json

    var port = normalizePort(process.env.npm_package_config_port); #add to bin/www

## Running Project


```bash
git clone https://github.com/twotwo/practice-nodejs.git # or clone your own fork
cd hello_node
npm install
npm start
```

## Components

### route
在routes/下定义路由，比如console.js；
在app.js中应用路由：app.use('/console', require('./routes/console'));

### view
use [hbs](https://github.com/pillarjs/hbs) as view engine, refer to [模板引擎 hbs 备忘](http://www.cnblogs.com/chyingp/p/hbs-getting-started.html)

### module
MVC中的 module , 对应后台中的业务逻辑

### persistence
持久层，数据库、缓存或文件系统

