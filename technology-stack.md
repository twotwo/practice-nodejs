# Technology Stack of Node.js
 * [](https://github.com/dwyl/technology-stack)

## OS
 * CentOS
 * macOS

## Building

### webpack
webpack是一个模块打包器，可以对 js 和 css 进行预处理，还支持代码热替换，使修改代码后不用刷新页面也能在浏览器中立即看到效果。

![](./what-is-webpack.png)

目前推荐 webpack v3, 入门参考: [Get Started](https://webpack.js.org/guides/getting-started/)

```bash
$ npm install webpack@3 webpack-dev-middleware@2 --save-dev #对齐webpack3
```

#### using webpack-dev-middleware
 * [使用参考](https://webpack.js.org/guides/development/#using-webpack-dev-middleware)



#### webpack plugins list
 * [webpack](https://www.npmjs.com/package/webpack) 3.11.0
 * [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) 2.11.2
 * [webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware) 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server) 2.0.6
 * [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)

```bash
$ npm install clean-webpack-plugin copy-webpack-plugin style-loader css-loader --save-dev
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
# 现存项目添加vue.js框架
$ vue init webpack my-old-project
? Target directory exists. Continue? Yes
...
```

```bash
$ npm install vue vuex vue-cookie vue-router --save
$ npm install vue-loader vue-style-loader vue-template-compiler --save-dev
$ npm install babel-core babel-loader babel-preset-es2015 --save-dev
```

## Others
 * [cnpm](https://www.npmjs.com/package/cnpm) `$ npm install cnpm -g --registry=https://registry.npm.taobao.org`
 * [cross-env](https://www.npmjs.com/package/cross-env) POSIX style command cross all systems
 * [debug](https://www.npmjs.com/package/debug) debugging utility
 * [axios](https://github.com/axios/axios) Promise based HTTP client for the browser and node.js
