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
 * ab -c 10 -n 10 "http://localhost:3000/users/perf"
 */
router.get("/perf", function(req, res, next) {
  debug("/api/users ", req.baseUrl)
  setTimeout(() => {
    debug("process 1 s ...")
    res.send("perf over\n")
    res.end()
  }, 1000)
})

module.exports = router
