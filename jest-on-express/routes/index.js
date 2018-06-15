const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

/* 用户接口入口 */
const users = require('./users')
router.use('/api/users', users)

module.exports = router
