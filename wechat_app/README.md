# 自有微信应用服务

## 参考

### 开发
* [wechat](https://www.npmjs.com/package/wechat) 微信公共平台自动回复消息接口服务中间件
* [微信公共平台服务 Node库](http://doxmate.cool/node-webot/wechat/) wechat 项目官网
* [wechat-api](https://www.npmjs.com/package/wechat-api) 主动调用微信开放平台的 API
* [微信公共平台主动调用API Node库](http://doxmate.cool/node-webot/wechat-api/) wechat-api 项目官网
* [微信公众平台接口调试工具](https://mp.weixin.qq.com/debug)

### 测试
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


## 单元测试
[Getting Started](https://mochajs.org/#getting-started)

```bash
npm install mocha istanbul -g #建议全局安装的
npm i chai chai-http ejs
```

### test.js - 模拟微信公共平台HTTP POST过来的消息

* 直接连通 wechat 服务接入程序；
* 端到端显示请求和响应；
* 支持明文报文

### 计算集成mocha的代码覆盖率(istanbul和mocha都全局安装) 

```bash
istanbul cover _mocha #or
npm run coverage

# Opening reports
open coverage/lcov-report/*.html
```