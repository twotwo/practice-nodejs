const { Logger, createLogger, format, transports } = require("winston")
const { combine, timestamp, label, printf, simple } = format

const winstonOptions = {
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    label({ label: "myLabel"}),

    format.printf(
      info =>
        `[${info.timestamp}] [${info.level}] ${info.label}: ${info.message}`
    )
  ),

  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: "log/error.log", level: "error" }),
    new transports.File({ filename: "log/combined.log" })
  ]
}

const logger = createLogger(winstonOptions)

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  )
}

logger.info(`cid=${process.env.NODE_APP_INSTANCE||-1}`)
