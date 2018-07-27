const express = require("express")
const router = express.Router()

const debug = require("debug")("srv:route:user")

/* Fake Info for Demo */
const info = require("../models/fake_info")

/**
 * users list
 *
 */
router.get("/", function(req, res, next) {
  debug("/a/users ", req.baseUrl)
  res.send({ title: "List Users", users: info.users })
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

/**
 * ab -c 10 -n 10 "http://localhost:3000/users/perf/100"
 */
router.get("/perf/:time", function(req, res, next) {
  debug("/api/users ", req.baseUrl)
  let time = req.params.time || 1000
  if (isNaN(time)) {
    res.send({ code: 1, msg: "invalid paramters", err: "time=" + time })
    return res.end()
  }

  // setTimeout(() => {
  //   debug("process %d ms ...", time)
  //   res.send("perf over\n")
  //   res.end()
  // }, time)
  return delay(time).then(() => {
    debug("process %d ms ...", time)
    res.send("perf over\n")
    res.end()
  })
})

module.exports = router
