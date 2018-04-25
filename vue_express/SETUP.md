# vue_express

一个使用 [vue-cli](https://github.com/vuejs/vue-cli/tree/v2.9.0) 创建的 [Vue.js](https://cn.vuejs.org/v2/guide) 脚手架工程，手工引入 express 。

## Dependencies

 * vue-cli `npm install -g vue-cli # Gloabal Install`


## Generate Project by express-generator

Make sure you have [Node.js](http://nodejs.org/) lts/carbon and [vue-cli](http://wiki.li3huo.com/Node.js#vue-cli) installed.

```bash
➜  practice-nodejs git:(master) ✗ vue -V
2.9.2
➜  practice-nodejs git:(master) ✗ vue init webpack vue_express

? Project name vue_express
? Project description A Vue.js project
? Author twotwo <twotwo.li@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Set up unit tests Yes
? Pick a test runner jest
? Setup e2e tests with Nightwatch? Yes
? Should we run `npm install` for you after the project has been created? (recommended) npm

   vue-cli · Generated "vue_express".


# Installing project dependencies ...
# ========================
...
# Project initialization finished!
# ========================

To get started:

  cd vue_express
  npm run dev
  
Documentation can be found at https://vuejs-templates.github.io/webpack

➜  express_generator tree .
➜  vue_express git:(master) ✗ tree .
.
├── README.md
├── SETUP.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── main.js
│   └── router
│       └── index.js
├── static
└── test
    ├── e2e
    │   ├── custom-assertions
    │   │   └── elementCount.js
    │   ├── nightwatch.conf.js
    │   ├── runner.js
    │   └── specs
    │       └── test.js
    └── unit
        ├── jest.conf.js
        ├── setup.js
        └── specs
            └── HelloWorld.spec.js

13 directories, 28 files
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

### 1. 与 webpack-dev-middleware 集成
 * [webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware)

```bash
$ npm install date-utils debug express express-session sequelize mysql2 --save
$ npm install webpack-dev-middleware@2.0.6 --save-dev #对齐webpack3
$ npm install webpack-hot-middleware --save-dev #页面热更新
$ npm install cross-env --save-dev
```

#### 1.1 整合进 express
 * 配置信息， 复用 `config/` 中的配置
 * `app.js` express 加载 webpack-dev-middleware 和 webpack-hot-middleware
 * `libs/express_helper.js` 获取当前配置参数
 * `config/webpack.dev.conf.js` module.exports = devWebpackConfig;

### 2. 前端支持 `context`

config/index.js

```js
const config = require('./prod.env.js'); //line 6
...
    assetsPublicPath: config.context, //line 13
...
    assetsPublicPath: config.context, //line 54
```

### 3. 前端访问后端

```bash
$ npm install axios --save
```

 * src/util/axios.js
 * call script

```js
<script>
import {doGet, doPost} from "./util/axios"

let req = {a:123};
let data = '';
doPost('/console', req)
  .then((resp) => {
    data = resp.data;
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  });


export default {
  name: 'App'
}
</script>
```

### 4. 添加一个前端页面
 * `components/Console.vue` 页面
 * `router/index.js` 中添加路由