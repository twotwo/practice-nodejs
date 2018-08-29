# express_generator

A barebones Node.js app using [Express 4](http://expressjs.com/).

More info see [jest-on-express](../jest-on-express/)

## Dependencies

- express-generator `npm install -g express-generator # Gloabal Install`

## Generate Project by express-generator

Make sure you have [Node.js](http://nodejs.org/) lts/carbon and [express-generator](http://wiki.li3huo.com/Node.js#express-generator) installed.

```bash
➜  practice-nodejs git:(master) ✗ express --view=hbs express_generator && cd express_generator

   create : express_generator
   create : express_generator/package.json
   create : express_generator/app.js
   create : express_generator/public
   create : express_generator/views
   create : express_generator/views/index.hbs
   create : express_generator/views/layout.hbs
   create : express_generator/views/error.hbs
   create : express_generator/routes
   create : express_generator/routes/index.js
   create : express_generator/routes/users.js
   create : express_generator/bin
   create : express_generator/bin/www
   create : express_generator/public/javascripts
   create : express_generator/public/stylesheets
   create : express_generator/public/stylesheets/style.css

   install dependencies:
     $ cd express_generator && npm install

   run the app:
     $ DEBUG=express-generator:* npm start

   create : express_generator/public/images

➜  express_generator tree .
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

    "config": {"port": "3000"} #add to package.json

    var port = normalizePort(process.env.npm_package_config_port||3000); #add to bin/www

## Running Project

```bash
git clone https://github.com/twotwo/practice-nodejs.git # or clone your own fork
cd express_generator
npm install
npm start # 启动服务
curl localhost:3000 # 访问服务
```

## Add features to Project

### 1. 在首页中显示 users 链接

参考 [hbs](https://github.com/pillarjs/hbs) view engine

views/index.hbs

```html
<h1>{{title}}</h1>
<p>Welcome to {{title}}</p>
<ul>
  <li><a href="/users/">users</a></li>
</ul>
```

### 2. 添加一些展示用的业务数据

models/fake_info.js

```js
```

### 3. users 增删改查的业务逻辑

views/user_list.hbs //展示用户列表
routes/users.js //业务逻辑

`curl http://localhost:3000/users`

### 4. server side cache

[Simple server side cache for Express.js with Node.js](http://goenning.net/2016/02/10/simple-server-side-cache-for-expressjs/)
