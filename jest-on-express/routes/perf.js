const express = require('express')
const router = express.Router()

const debug = require('debug')('srv:route:perf')

/**
 * ab -c 10 -n 100 http://localhost:8080/jest/perf/100
 */
router.get('/:time', function (req, res, next) {
  // debug('/:time', req.baseUrl)
  let time = req.params.time || 1000
  if (isNaN(time)) {
    res.send({ code: 1, msg: 'invalid paramters', err: 'time=' + time })
    return res.end()
  }

  // setTimeout(() => {
  //   debug("process %d ms ...", time)
  //   res.send("perf over\n")
  //   res.end()
  // }, time)
  return delay(time).then(() => {
    debug('process %d ms ...', time)
    res.send('perf over\n')
    res.end()
  })
})

/**
 * Wrapp setTimeout with Promise
 *
 * @param {*} t delay t ms
 * @param {*} v
 */
const delay = (t, v) => {
  return new Promise(resolve => {
    setTimeout(resolve.bind(null, v), t)
  })
}

module.exports = router
