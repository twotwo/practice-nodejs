# Hello, Log4js!

## Reference

- [github](https://github.com/log4js-node/log4js-node)
- [npm](https://www.npmjs.com/package/log4js)
- [Documentation](https://log4js-node.github.io/log4js-node/) version 3.x
- [Sample Code](https://github.com/log4js-node/log4js-node/tree/master/examples)

### Clustering

[Using with PM2](https://log4js-node.github.io/log4js-node/clustering.html#im-using-pm2-but-im-not-getting-any-logs)

```bash
pm2 install pm2-intercom
```

```javascript
log4js.configure({
  appenders: { out: { type: 'stdout'}},
  categories: { default: { appenders: ['out'], level: 'info'}},
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID'
});
```

pm2InstanceVar //对应pm2 apps.instance_var

貌似pm2 v3下的 pm2-intercom 无法正常接收到消息，放弃。

```bash
 Module activated
┌──────────────┬─────────┬────────────┬────────┬─────────┬─────┬─────────────┬───────┐
│ Module       │ version │ target PID │ status │ restart │ cpu │ memory      │ user  │
├──────────────┼─────────┼────────────┼────────┼─────────┼─────┼─────────────┼───────┤
│ pm2-intercom │ 1.0.0   │ N/A        │ online │ 0       │ 0%  │ 63.703 MB   │ liyan │
└──────────────┴─────────┴────────────┴────────┴─────────┴─────┴─────────────┴───────┘
 Use `pm2 show <id|name>` to get more details about an app
➜  hello-log4js git:(master) ✗ pm2 -v
3.0.3
```

### Date Rolling File Appender

console/stdout

[Date Rolling File Appender](https://log4js-node.github.io/log4js-node/dateFile.html)

`alwaysIncludePattern` - boolean (default false) - include the pattern in the name of the current log file as well as the backups.

### Connect / Express Logger

[Connect / Express Logger](https://log4js-node.github.io/log4js-node/connect-logger.html)

### Layouts

[Layouts](https://log4js-node.github.io/log4js-node/layouts.html)

- Coloured
- 

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

**推荐用法**

### Common usage

```bash
NODE_ENV=qa node common-usage.js
cat /tmp/log/app.log
NODE_ENV=production node common-usage.js
cat /tmp/log/app.log
```

根据指定的环境变量指定不同的日志配置

### Under PM2

`pm2 install pm2-intercom` # install pm2-intercom

[PM2 Runtime | Reference | CLI](https://pm2.io/doc/en/runtime/reference/pm2-cli/)

```bash
pm2 start pm2.json
```

Update Config in JSON

```bash
## dump all processes for resurrecting them later
➜  restful-api-tester git:(master) ✗ pm2 save
## kill daemon, stop pm2
➜  restful-api-tester git:(master) ✗ pm2 kill
## start with new config
➜  restful-api-tester git:(master) ✗ pm2 start pm2.json
## resurrect previously dumped processes
➜  restful-api-tester git:(master) ✗ pm2 resurrect
```

```bash
## upgrade pm2
➜  restful-api-tester git:(master) ✗ pm2 deepUpdate
```