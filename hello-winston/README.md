# Hello, Log4js!

## Reference

- [github](https://github.com/winstonjs/winston)
- [npm](https://github.com/winstonjs/winston)
- [Documentation]() version 3.x
- [Sample Code](https://github.com/winstonjs/winston/tree/master/examples)

## Init Project

```bash
npm init -y
npm install winston express-winston
```

## Run

### Getting started

```bash
node started.js

pm2 start started.js -i 2
pm2 delete started
```

### Formats

```bash
node format.js
```

**推荐用法**

### Common usage

```bash
NODE_ENV=qa node common-usage.js
cat /tmp/log/app.log
NODE_ENV=production node common-usage.js
cat /tmp/log/app.log
```

根据指定的环境变量指定不同的日志配置


### Express access log
