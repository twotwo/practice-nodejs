// 日志配置，在`bin/www`中初始化
module.exports = {
  production: {
    appenders: {
      access: {
        type: "dateFile",
        filename: "/var/log/platform/access.log",
        pattern: "-yyyyMMdd",
        category: "http"
      },
      app: {
        type: "file",
        filename: "/var/log/platform/app.log",
        maxLogSize: 10485760,
        numBackups: 10
      },
      errorFile: {
        type: "file",
        filename: "/var/log/platform/errors.log"
      },
      errors: {
        type: "logLevelFilter",
        level: "ERROR",
        appender: "errorFile"
      }
    },
    categories: {
      default: { appenders: ["app", "errors"], level: "INFO" },
      http: { appenders: ["access"], level: "INFO" }
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
  },
  test: {
    appenders: {
      console: {
        type: "stdout",
        layout: {
          type: "coloured",
          pattern: "[%r] %p [%c] - %m%n"
        }
      },
      "no-noise": {
        type: "categoryFilter",
        exclude: ["http", "account"],
        appender: "console"
      }
    },
    categories: {
      default: { appenders: ["no-noise"], level: "DEBUG" }
    }
  }
}
