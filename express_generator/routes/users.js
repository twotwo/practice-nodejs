const express = require("express")
const router = express.Router()

/* Fake Info for Demo */
const info = require("../models/fake_info")

/* GET users listing. */
router.get("/", function(req, res, next) {
  console.log("/api/users ", req.baseUrl)
  res.send({ title: "List Users", users: info.users })
})

module.exports = router
