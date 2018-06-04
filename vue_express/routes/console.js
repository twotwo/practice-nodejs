var express = require('express')
var router = express.Router()

var debug = require('debug')('srv:console')

// /* Fake Info for Test */
// var info = require('../models/fake_info');

/* helper functions */
var command = require('../libs/command_helper.js')
var expressHelper = require('../libs/express_helper.js')

// https://github.com/JerrySievert/date-utils
require('date-utils')

/* Set Remote Adress in Session */
router.use((req, res, next) => {
  expressHelper.setRemoteAdress(req, res, next)
})

/**
 * 收集生成命令所需的参数
 *
 * @param {*} params - request parameters
 */
function getherOptions (params) {
  let option = {}
  option.channelId = params.channelId || ''
  option.appId = params.appId || ''
  option.devId = params.devId || ''
  option.uid = params.uid || ''
  option.ipAddress = params.ipAddress || ''
  option.eventId = params.eventId || ''

  // 读取行数
  option.readLines = params.readLines || '150000'

  debug('process.env.NODE_ENV = %s', process.env.NODE_ENV)
  // 获取日志文件地址
  if (process.env.NODE_ENV === 'production') {
    var dt = new Date()
    var todayLog = dt.toFormat('/YYYY-MM-DD.log')
    option.logFile = global.config.log_dir + todayLog // 正式环境
  } else {
    option.logFile = global.config.log_dir + '/2017-12-04.log' // 非正式环境，读取本地测试文件
  }
  debug('logFile = ' + option.logFile)

  return option
}

/* GET console info. */
router.post('/', (req, res, next) => {
  debug('req.body =', req.body)
  let result = { head: {}, body: {} }
  result.head = getherOptions(req.body)
  let cmd = command.genCommand(result.head)

  debug('cmd = ' + cmd)
  command.execute(cmd, (error, stdout, stderr, cost) => {
    if (error) {
      debug('error = ' + error)
      result.head.error = error
    } else {
      debug('stdout = ' + stdout)
      let lines = stdout.split('\n')
      if (lines.length === 0) {
        result.body = 'get no line'
      } else {
        result.body = command.formatLog(lines[lines.length - 1])
      }
      debug('result.body = %S', result.body)
    }
    result.head.cmd = cmd
    result.head.cost = cost
    result.head.color = 'green'
    if (typeof result.body === 'string') {
      result.head.color = 'red'
    }

    debug('result =', result)

    res.send(result)
    res.end()
  })
})

/**
 * 1、根据请求参数生成查询命令；
 * 2、执行后台日志查询；
 * 3、把所有查询结果包装入json对象，由前端进行渲染
 */
router.post('/query', (req, res, next) => {
  debug('req.body =', req.body)
  let result = { head: {}, body: {} }
  result.head = getherOptions(req.body)
  let cmd = command.genCommand(result.head)

  command.execute(cmd, (error, stdout, stderr, cost) => {
    if (error) {
      debug('error = ' + error)
      result.head.error = error
    } else {
      // debug("stdout = " + stdout);
      result.body = command.formatLogs(stdout)
      debug('result.body = %S', result.body)
    }
    result.head.cmd = cmd
    result.head.cost = cost
    debug('result =', result)

    res.send(result)
    res.end()
  })
})

module.exports = router
