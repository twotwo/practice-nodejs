/**
 * 路由总入口
 */
const express = require('express');
const router = express.Router();

/* 用户接口入口 */
const users = require("./users")
router.use('/users', users)

module.exports = router;
