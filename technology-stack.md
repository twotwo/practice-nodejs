# Technology Stack of Node.js
 * [](https://github.com/dwyl/technology-stack)

## OS
 * CentOS
 * macOS

## Building

目前推荐webpack v3

 * [webpack](https://www.npmjs.com/package/webpack) 3.11.0
 * [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) 2.11.2
 * [webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware) 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server) 2.0.6

### webpack plugins
 * [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)

```bash
$ npm install clean-webpack-plugin copy-webpack-plugin style-loader css-loader --save-dev
```

```bash
$ npm install webpack@3 webpack-dev-middleware@2 --save-dev #对齐webpack3
```

## Testing
 * [Jest](http://wiki.li3huo.com/JavaScript_Testing_Overview#Jest)

## Database
 * [mysql2](https://www.npmjs.com/package/mysql2)
 * [sequelize](https://www.npmjs.com/package/sequelize)

## Web Framework
 * [Express 4](http://expressjs.com/) [api v4](http://expressjs.com/en/4x/api.html)

## UI Framework
 * [Vue.js](https://cn.vuejs.org/v2/guide/)

### Vue.js v2.x

```bash
# init project with vue-cli
$ npm update -g vue-cli
$ vue -V
2.9.3
$ vue init webpack my-project
```

```bash
$ npm install vue vuex vue-cookie vue-router --save
$ npm install vue-loader vue-style-loader vue-template-compiler --save-dev
$ npm install babel-core babel-loader babel-preset-es2015 --save-dev
```

## Others
 * [cross-env](https://www.npmjs.com/package/cross-env)
 * [debug](https://www.npmjs.com/package/debug)