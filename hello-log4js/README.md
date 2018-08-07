# Hello, Log4js!

## Reference

- [github](https://github.com/log4js-node/log4js-node)
- [npm](https://www.npmjs.com/package/log4js)
- [Documentation](https://log4js-node.github.io/log4js-node/) version 3.x
- [Sample Code](https://github.com/log4js-node/log4js-node/tree/master/examples)

## Init Project

```bash
npm install log4js
```

### Clustering

[Using with PM2](https://log4js-node.github.io/log4js-node/clustering.html#im-using-pm2-but-im-not-getting-any-logs)

```javascript
log4js.configure({
  appenders: { out: { type: 'stdout'}},
  categories: { default: { appenders: ['out'], level: 'info'}},
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID'
});
```

### Date Rolling File Appender

[Date Rolling File Appender](https://log4js-node.github.io/log4js-node/dateFile.html)

### Connect / Express Logger

[Connect / Express Logger](https://log4js-node.github.io/log4js-node/connect-logger.html)

### Layouts

[Layouts](https://log4js-node.github.io/log4js-node/layouts.html)