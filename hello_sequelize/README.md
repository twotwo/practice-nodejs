# hello_sequelize

Getting started with [Sequelize](http://wiki.li3huo.com/NodeJS_ORM_Solutions#Sequelize).

## Generate Project

```bash
➜  hello_sequelize git:(master) ✗ npm init
...
➜  hello_sequelize git:(master) ✗ npm install --save sequelize mysql2
npm notice created a lockfile as package-lock.json. You should commit this file.
+ mysql2@1.5.1
+ sequelize@4.32.3
added 50 packages in 7.907s
➜  hello_sequelize git:(master) ✗ npm i debug --save-dev
+ debug@3.1.0
updated 1 package in 1.523s
```

[mysql2](https://www.npmjs.com/package/mysql2)

### conf/orm.js

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

### 1. 在首页中显示users链接
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

### 3. users增删改查的业务逻辑

views/user_list.hbs //展示用户列表
routes/users.js     //业务逻辑

