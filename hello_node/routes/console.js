var express = require('express');
var router = express.Router();

/* GET console listing. */
router.get('/', function(req, res, next) {
  // res.send('console response');
  res.render('list', { title: 'user' }); // 加载 list.hbs 模板并传递数据给模板
});

/* POST console listing. */
router.post('/', function(req, res, next) {
  // res.send('console response');
  res.render('list', { title: 'user' }); // 加载 list.hbs 模板并传递数据给模板
});

module.exports = router;