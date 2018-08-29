/**
 * 获取日期信息   公共函数
 */
module.exports = {
  // 获取当前时间(毫秒)  (13位时间戳)
  microtime: function() {
    return new Date().getTime()
  },

  // 获取当前时间(秒)  (10位时间戳)
  time: function() {
    var microtime = new Date().getTime()
    return Math.floor(microtime / 1000)
  },

  /**
   * 日期格式转时间戳
   * date 格式:'2018-01-01'  => 时间戳对应 Mon Jan 01 2018 08:00:00 GMT+0800 (中国标准时间)
   *           '2018/01/01'  => 时间戳对应 Mon Jan 01 2018 00:00:00 GMT+0800 (中国标准时间)
   */
  dateToTime: function(date, type) {
    var microtime = new Date(date).getTime()
    if (type == 'microtime') {
      return microtime
    }
    return Math.floor(microtime / 1000)
  },

  // 时间戳转日期格式
  timeToDate: function(time, format) {
    if (!time || isNaN(time)) {
      return false
    }

    if (time.toString().length != 10 && time.toString().length != 13) {
      return false
    } else if (time.toString().length == 10) {
      time *= 1000
    }

    var date = new Date(time)
    var year = date.getFullYear()
    var month =
      date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    if (format && format.toUpperCase() == 'Y-M-D') {
      return year + '-' + month + '-' + day
    }
    return (
      year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    )
  }
}
