/**
 * 路由总入口
 */
const express = require('express');
const router = express.Router();

const debug = require("debug")("srv:route")

router.get("/", function(req, res, next) {
  debug("get / =%s", req.baseUrl)
  res.end("hit route")
})

/* 用户接口入口 */
const users = require("./users")
router.use('/users', users)

module.exports = router;
