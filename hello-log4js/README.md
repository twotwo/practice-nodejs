# Hello, Log4js!

## Reference

- [github](https://github.com/log4js-node/log4js-node)
- [npm](https://www.npmjs.com/package/log4js)
- [Documentation](https://log4js-node.github.io/log4js-node/) version 3.x
- [Sample Code](https://github.com/log4js-node/log4js-node/tree/master/examples)

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

[Pattern && Pattern format](https://log4js-node.github.io/log4js-node/layouts.html#pattern)

```
Fields can be any of:

    %r time in toLocaleTimeString format
    %p log level
    %c log category
    %h hostname
    %m log data
    %d date, formatted - default is ISO8601, format options are: ISO8601, ISO8601_WITH_TZ_OFFSET, ABSOLUTE, DATE, or any string compatible with the date-format library. e.g. %d{DATE}, %d{yyyy/MM/dd-hh.mm.ss}
    %% % - for when you want a literal % in your output
    %n newline
    %z process id (from process.pid)
    %x{<tokenname>} add dynamic tokens to your log. Tokens are specified in the tokens parameter.
    %X{<tokenname>} add values from the Logger context. Tokens are keys into the context values.
    %[ start a coloured block (colour will be taken from the log level, similar to colouredLayout)
    %] end a coloured block
```

## Init Project

```bash
npm install log4js
```

## Run

### Getting started

```bash
node started.js
```

### With `utils/log4js-helper`

```bash
node date-file-rolling.js
```

### Common usage

```bash
NODE_ENV=dev node common-usage.js
```

根据指定的环境变量指定不同的日志配置

### Under PM2

`pm2 install pm2-intercom` # install pm2-intercom

```bash
pm2 start pm2.json
```