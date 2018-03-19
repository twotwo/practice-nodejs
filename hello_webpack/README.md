# webpack入门
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