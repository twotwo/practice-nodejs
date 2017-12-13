# practice-nodejs
node.js 入门练手项目

## 目录
* [配置多套环境参数](npm-dev-qa-prod.md)

## 1. hello_node
可演示的最简单node web程序

```bash
➜  hello_node git:(master) ✗ npm start # 启动服务

> hello_node@1.0.0 start /opt/app/js/nodejs/practice-nodejs/hello_node
> node index.js

Node app is running at localhost:3000

➜  practice-nodejs git:(master) curl localhost:3000 # 访问服务
Hello World!% 
```

## 2. express_manually
基于 express 的web程序，启动方式与 `hello_node` 相同

## 3. express_generator
用命令 `express --view=hbs express_generator && cd express_generator` 直接生成express工程


## 4. web_console
在 `express_generator` 基础上增加更多后台逻辑
