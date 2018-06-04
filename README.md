# practice-nodejs

node.js 入门练手项目

## 目录

* [配置多套环境参数](npm-dev-qa-prod.md)

## 1. hello_node

可演示的最简单 node web 程序

```bash
➜  hello_node git:(master) ✗ npm start # 启动服务

> hello_node@1.0.0 start /opt/app/js/nodejs/practice-nodejs/hello_node
> node index.js

Node app is running at localhost:3000

➜  practice-nodejs git:(master) curl localhost:3000 # 访问服务
Hello World!%
```

## 2. express_manually

基于 express 的 web 程序，启动方式与 `hello_node` 相同

## 3. express_generator

[express-generator](http://expressjs.com/en/starter/generator.html)

用命令 `express --view=hbs express_generator && cd express_generator` 直接生成 express 工程

## 4. hello_sequelize

使用 [Sequelize](http://wiki.li3huo.com/NodeJS_ORM_Solutions#Sequelize) ORM

## 5. [vue_express](./vue_express)

前后端集成的项目。使用 `express` + `vue` 创建和初试化项目；使用 [webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware) 来集成前后端开发

## 6. [web_console](./web_console)

在 `express_generator` 基础上增加更多后台逻辑

## 7. [command_line_parser](./command_line_parser)

按照 [Notation rules](https://github.com/75lb/command-line-args/wiki/Notation-rules) 来解析命令行参数
