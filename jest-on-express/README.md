# Jest on Express.js

## Packages

### [Jest](https://www.npmjs.com/package/jest)

(http://facebook.github.io/jest/)

facebook 推出的 JavaScript 全平台测试框架，建议全局安装

`npm i jest -g`

[API](https://facebook.github.io/jest/docs/en/api.html)

- [expect](https://facebook.github.io/jest/docs/en/expect.html)

### [SuperTest](https://www.npmjs.com/package/supertest)

HTTP assertions made easy via superagent.

### [ESLint](https://www.npmjs.com/package/eslint)

a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

### [nodemon](https://www.npmjs.com/package/nodemon)

automatically restart node application when code change

## Init Project

```bash
express --no-view .
npm i express-session
npm i supertest eslint cross-env debug --save-dev
npx eslint --init
```

### ESLint Config

```javascript
module.exports = {
  extends: "standard",
  env: {
    jest: true
  }
}
```

### package.json

```json
{
  ...,
  "scripts": {
    "dev": "npx cross-env DEBUG=srv:* nodemon ./bin/www"
  },
  ...,
  "jest": {
    "testEnvironment": "node",
    "verbose": true
  }
}
```

### app.js

1.  `const debug = require('debug')('srv:app')`
2.  replace cookie-parser with express-session
3.  read and set context to app with `CONTEXT=...`
4.  insert index router at application context
5.  remove userRouter, only have 2 routers: static resource & index router

### bin/www

1.  `const debug = require('debug')('srv:www')`
2.  debug access url

### 业务代码

#### 多级路由中间件

* routers/index.js // 路由总入口
* routers/users.js // 定义为到 api/users 的一个api接口

### 测试代码

* test/express-api-users.test.js

## 运行

```bash
# 运行测试
npx cross-env DEBUG=srv:*,jest:* jest test/express-api-users.test.js
 PASS  test/express-api-users.test.js
  Express API - /api/
    用户 API 测试
      ✓ 1. /api/users#获取全部用户列表 (56ms)
      ✓ 2. /api/user/1#获取id是1的用户信息 (5ms)

# 测试代码覆盖率
jest --coverage

# Opening reports
open coverage/lcov-report/*.html
```

```bash
npx cross-env PORT=8080 CONTEXT=/jest DEBUG=srv:* nodemon ./bin/www
[nodemon] starting `node ./bin/www`
  srv:app process.env.CONTEXT=/jest +0ms
  srv:app indexRouter@/jest +2ms
  srv:www process.env.PORT=8080 +2ms
  srv:www Access URL = http://localhost:8080/jest/ +3ms
```


