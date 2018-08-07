// 日志配置，在应用启动时初始化
module.exports = {
  production: {
    appenders: {
      access: {
        type: "dateFile",
        filename: "/tmp/log/access.log",
        pattern: "-yyyyMMdd",
        category: "http"
      },
      app: {
        type: "file",
        filename: "/tmp/log/app.log",
        maxLogSize: 10485760,
        numBackups: 10
      },
      errorFile: {
        type: "file",
        filename: "/tmp/log/errors.log"
      },
      errors: {
        type: "logLevelFilter",
        level: "ERROR",
        appender: "errorFile"
      }
    },
    categories: {
      default: { appenders: ["app", "errors"], level: "DEBUG" },
      http: { appenders: ["access"], level: "DEBUG" }
    }
  },
  qa: "production",
  development: {
    appenders: {
      console: {
        type: "console",
        layout: {
          type: "coloured"
        }
      }
    },
    categories: {
      default: { appenders: ["console"], level: "DEBUG" }
    }
  }
}
