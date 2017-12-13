# 使用 npm 配置多套环境参数

## 配置

### 1. npm的配置
`package.json`

```json
...
  "scripts": {
    "start": "node ./bin/www",
    "prod": "NODE_ENV='prod' node ./bin/www",
    "qa": "NODE_ENV='qa' node ./bin/www",
    "dev": "NODE_ENV='dev' node ./bin/www"
  },
...

```

### 2. 不同环境下对应的多套参数

2.1 基础配置
例如应用目录、服务端口等等

* config.json
* config-qa.json
* config-dev.json
* config-win.json //windows 开发环境配置参数

2.2 数据库

* mysql.json
* mysql-qa.json
* mysql-dev.json

2.3 其它配置

例如vue.js的baseurl设置等

### 3. 根据启动命令加载对应参数

```javascript
if (process.env.NODE_ENV==='dev') {
	if (process.platform==='win32') {
        var config = require('./conf/config-win.json'); //windows开发环境的配置
        console.log('load ../conf/config-win.json');
    }else {
        var config = require('./conf/config-dev.json'); //非windows的开发环境
        console.log('load ../conf/config-dev.json');
}
}else if (process.env.NODE_ENV==='qa'){
	var config = require('./conf/config-qa.json'); //测试环境的配置
	console.log('load ../conf/config-qa.json');
}else {
	var config = require('./conf/config.json'); //正式环境的配置
	console.log('load ../conf/config.json');
}
```

## 4. 运行

* 生产环境 `npm run prod`
* 测试环境 `npm run qa`
* 本地开发环境 `npm run dev`