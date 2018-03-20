# webpack 4入门
 * [webpack.js](https://webpack.js.org/)
 * [概念](https://doc.webpack-china.org/concepts/)
 * [getting started](https://webpack.js.org/guides/getting-started/)


## 1. Basic Setup
`git checkout c8582adce3e6c88948d88d5817dba9afe7ee88f9`

```bash
➜  practice-nodejs git:(master) ✗ mkdir hello_webpack && cd hello_webpack
➜  hello_webpack git:(master) ✗ npm init -y
➜  hello_webpack git:(master) ✗ npm install --save-dev webpack webpack-dev-server
```

一个最简单的JavaScript项目，在浏览器中打开 index.html，展示'Hello webpack'。

## 2. Creating a Bundle
`git checkout fabe861638706fbc01fa932a00faca992e94cd49`

```bash
# npx
➜  hello_webpack git:(master) ✗ npm i webpack-cli -g
➜  practice-nodejs git:(master) ✗ npm install --save lodash
➜  hello_webpack git:(master) ✗ npm init -y
➜  hello_webpack git:(master) ✗ npm install --save-dev webpack webpack-dev-server
➜  hello_webpack git:(master) ✗ npx webpack --mode development
Version: webpack 4.1.1
Time: 333ms
Built at: 2018-3-19 11:39:00
  Asset     Size  Chunks                    Chunk Names
main.js  550 KiB    main  [emitted]  [big]  main
Entrypoint main [big] = main.js
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 509 bytes {main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 519 bytes {main} [built]
[./src/index.js] 260 bytes {main} [built]
    + 1 hidden module
```

通过打包来合成脚本，在浏览器中打开 index.html，展示'Hello webpack'。

## 3. Using a Configuration
 * `webpack.config.js` ref to [configuration](https://doc.webpack-china.org/configuration) doc
 * `package.json`

```bash
➜  hello_webpack git:(master) ✗ npx webpack --mode development --config webpack.config.js
Hash: b17559f51bb4e6d0f0d8
Version: webpack 4.1.1
Time: 320ms
Built at: 2018-3-19 14:10:34
  Asset     Size  Chunks                    Chunk Names
main.js  550 KiB    main  [emitted]  [big]  main
Entrypoint main [big] = main.js
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 509 bytes {main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 519 bytes {main} [built]
[./src/index.js] 260 bytes {main} [built]
    + 1 hidden module
```

## 4. [Asset Management](https://webpack.js.org/guides/asset-management/)

### 4.1 Loading CSS

`npm install --save-dev style-loader css-loader`

webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。

### 4.2 Loading Images

`npm install --save-dev file-loader`

### 4.3 Loading Fonts

//暂时忽略

### 4.4 Loading Data

`npm install --save-dev csv-loader xml-loader`

## 5. [Output Management](https://webpack.js.org/guides/output-management/)

### 5.1 Setting up HtmlWebpackPlugin

`npm install --save-dev html-webpack-plugin`

### 5.2 Cleaning up the /dist folder

`npm install clean-webpack-plugin --save-dev`

## 6. [Development](https://webpack.js.org/guides/development/)

### 6.1 Using source maps

本指南中的工具仅用于开发环境，请不要在生产环境中使用它们！

为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。

`webpack.config.js` devtool: 'inline-source-map',

### 6.2 Choosing a Development Tool

#### 6.2.1 Using Watch Mode
#### 6.2.2 Using [webpack-dev-server](https://webpack.js.org/configuration/dev-server)

`npm install --save-dev webpack-dev-server`

#### 6.2.3 Using webpack-dev-middleware *
webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。

 * `npm install --save-dev express webpack-dev-middleware`
 * `webpack.config.js` publicPath: '/'
 * `server.js`
 * `package.json` "server": "node server.js",

## 7. [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

### Minify the Output
`npm install --save-dev uglifyjs-webpack-plugin`

[uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)

comment `devtool: 'inline-source-map',`

## 8. [Production](https://webpack.js.org/guides/production/)

### 8.1 Setup

`npm install --save-dev webpack-merge`

```
                       + -  webpack.common.js
webpack.config.js  ==> |    webpack.dev.js
                       + -  webpack.prod.js
```

### 8.2 NPM Scripts

### 8.3 Minification
 * UglifyJSPlugin
 * BabelMinifyWebpackPlugin
 * ClosureCompilerPlugin

### 8.4 Source Mapping

```js
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
```

### 8.5 Specify the Environment

`webpack.prod.js` new webpack.DefinePlugin

### 8.6 CLI Alternatives

`--define process.env.NODE_ENV="'production'"`

## 9. [Code Splitting](https://webpack.js.org/guides/code-splitting/)

有三种常用的代码分离方法：

 * 入口起点：使用 entry 配置手动地分离代码
 * 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk
 * 动态导入：通过模块的内联函数调用来分离代码

### 9.1 Entry Points

### 9.2 Prevent Duplication

`webpack.prod.js` optimization

```js
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all'
            }
        }
    }
  },
```

### 9.3 Dynamic Imports

### 9.4 Bundle Analysis

## 10. [Lazy Loading](https://webpack.js.org/guides/lazy-loading/)
懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

## 11. [Caching](https://webpack.js.org/guides/caching/)

### 11.1 [Output Filenames](https://webpack.js.org/configuration/output/#output-filename)

`filename: '[name].[chunkhash].js',`

### 11.2 Extracting Boilerplate

### 11.3 Module Identifiers

## 12. [Shimming](https://doc.webpack-china.org/guides/shimming/)
引入全局依赖或者加patch

### 12.1 Shimming Globals
导入全局变量

 * `webpack.common.js` plugins.webpack.ProvidePlugin `join: ['lodash', 'join']`
 * `src/index.js` 直接调用join方法

### 12.2 Granular Shimming
使用 imports-loader 覆写 this 

require.resolve('index.js') 编译不通过 `Error: Cannot find module 'index.js'`

 * `npm install --save-dev imports-loader`
 * `webpack.common.js` module.rules `imports-loader`

### 12.3 Global Exports
某个库(library)创建出一个全局变量，它期望用户使用这个变量

 * `webpack.common.js` module.rules `exports-loader`
 * `index.js` globals.js helpers.parse

### 12.4 Loading Polyfills
腻子功能

