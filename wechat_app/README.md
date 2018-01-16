# 自有微信应用服务

## 参考

### 业务
* [微信公众平台技术文档](https://mp.weixin.qq.com/wiki)
* [接口测试号申请](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421137522)

### 开发
* [wechat](https://www.npmjs.com/package/wechat) 微信公共平台自动回复消息接口服务中间件
* [微信公共平台服务 Node库](http://doxmate.cool/node-webot/wechat/) wechat 项目官网
* [wechat-api](https://www.npmjs.com/package/wechat-api) 主动调用微信开放平台的 API
* [微信公共平台主动调用API Node库](http://doxmate.cool/node-webot/wechat-api/) wechat-api 项目官网
* [微信公众平台接口调试工具](https://mp.weixin.qq.com/debug)

### 测试(Based on Jest&SuperTest)
* [JavaScript测试概览](http://wiki.li3huo.com/JavaScript_Testing_Overview#Jest)
* [How to test Express.js with Jest and Supertest](http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/)
* [Jest](https://facebook.github.io/jest/)
* [Supertest](https://github.com/visionmedia/supertest)

### 测试(Based on Mocha&Chai&Istanbul)
* [JavaScript测试概览](http://wiki.li3huo.com/JavaScript_Testing_Overview#Mocha)
* [Mocha](https://mochajs.org) 提供测试框架
* [Chai](https://github.com/chaijs/chai) 提供断言方法
* [基于HTTP的单元测试](https://github.com/chaijs/chai-http) //HTTP Response assertions for the Chai Assertion Library
* [Istanbul](https://github.com/gotwarlost/istanbul) 测试覆盖率

### 部署
* [使用 npm 配置多套环境参数](../npm-dev-qa-prod.md)

## 服务创建

### 初始化node.js应用

```bash
➜  wechat mkdir wechat_app; cd wechat_app
➜  wechat_app npm init
➜  wechat_app npm install wechat express wechat-api
...
+ wechat@2.1.0
+ express@4.16.2
added 64 packages in 4.361s
```

### index.js - 接入 wechat 中间件

具体内容参见 index.js 中的注释

运行： npm start

### menu.js - 主动调用微信公共平台接口 之 自定义菜单

具体内容参见 menu.js 中的注释

运行： node menu.js

## 服务调测

### 接口调测

* `routes/app/main.js` var debug = require('debug')('wechat.main');
* `libs/wechat.js` var debug = require('debug')('wechat');

```bash
# 显示debug信息
npm run dev
# 调试模式，参考 https://nodejs.org/api/debugger.html
npm run debug
```

Stepping: 
* cont, c - Continue execution
* next, n - Step next
* step, s - Step in
* out, o - Step out
* pause - Pause running code (like pause button in Developer Tools)

Breakpoints
* setBreakpoint('script.js', 1), sb(...) - Set breakpoint on first line of script.js

```bash
debug> sb('./index.js', 29)
Warning: script './index.js' was not loaded yet.
```

## 单元测试(Based on Jest&SuperTest)
[Getting Started](https://facebook.github.io/jest/docs/en/getting-started.html)

```bash
npm install -g jest #请全局安装
npm i --save-dev ejs supertest

# 运行测试
npm run test
npm run coverage

# Opening reports
open coverage/lcov-report/*.html
```

### test/verify.test.js - 模拟微信公共平台接入验证(HTTP GET)

* TOKEN wechat_sample
* EncodingAESKey 安全模式（推荐）下，消息加解密专用

```bash
jest test/verify.test.js
```

### test/message.test.js - 模拟微信公共平台HTTP POST过来的消息

* 直接连通 wechat 服务接入程序；
* 端到端显示请求和响应；
* 支持明文报文

```bash
jest test/message.test.js
```

### test/event.test.js - 模拟微信公共平台事件推送

* Following / Unfollowing Events


```bash
DEBUG=wechat* jest test/event.test.js
```


## Others

### tags

create tag `wechat_mocha`

```bash
➜  wechat_app git:(master) ✗ git tag -a wechat_mocha -m 'test based on mocha'
➜  wechat_app git:(master) ✗ git push origin wechat_mocha
Counting objects: 6, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 1.09 KiB | 1.09 MiB/s, done.
Total 6 (delta 3), reused 0 (delta 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To https://github.com/twotwo/practice-nodejs.git
 * [new tag]         wechat_mocha -> wechat_mocha
```

checkout tag `wechat_mocha`

```bash
➜  /tmp git clone https://github.com/twotwo/practice-nodejs.git
Cloning into 'practice-nodejs'...
remote: Counting objects: 262, done.
remote: Compressing objects: 100% (34/34), done.
remote: Total 262 (delta 29), reused 54 (delta 25), pack-reused 203
Receiving objects: 100% (262/262), 55.49 KiB | 291.00 KiB/s, done.
Resolving deltas: 100% (124/124), done.
➜  /tmp cd practice-nodejs/wechat_app
➜  wechat_app git:(master) git checkout -b mocha wechat_mocha
Switched to a new branch 'mocha'
➜  wechat_app git:(mocha) git log
commit 00ed6f05af11d3bb5182a0f8faadf2b8037070b3 (HEAD -> mocha, tag: wechat_mocha)
```
