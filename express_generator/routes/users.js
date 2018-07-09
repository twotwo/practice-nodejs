const express = require("express")
const router = express.Router()

const debug = require("debug")("srv:api:user")

/* Fake Info for Demo */
const info = require("../models/fake_info")

/**
 * users list
 * 
 */
router.get("/", function(req, res, next) {
  console.log("/api/users ", req.baseUrl)
  res.send({ title: "List Users", users: info.users })
})

module.exports = router
