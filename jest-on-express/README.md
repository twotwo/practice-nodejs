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
  "jest": {
    "testEnvironment": "node",
    "verbose": true
  }
}
```

## 运行

```bash
# 运行测试
npx cross-env DEBUG=srv:* jest test/express-api.test.js
jest --coverage

# Opening reports
open coverage/lcov-report/*.html
```

### 业务代码

### 测试代码
