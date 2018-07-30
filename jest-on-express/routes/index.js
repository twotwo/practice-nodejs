const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Express' })
  res.end('/route')
})

/* 子路由入口 */
router.use('/perf', require('./perf'))
router.use('/users', require('./users'))

module.exports = router
