var express = require('express');
var router = express.Router();

/* Fake Info for Test */
var info = require('../models/fake_info');

/* GET console info. */
router.get('/', function(req, res, next) {
	var user = new Object();
	user.appId = '20003'; // iOS Demo
	res.render('console', { user: user, logs: info.logs }); // 加载 console.hbs 模板并传递数据给模板
});

/* POST console info. */
router.post('/', function(req, res, next) {
	var user = new Object();
	user.appId = req.body.appId || '';
	user.devId = req.body.devId || '';

	res.render('console', {  user: user, logs: info.logs }); // 加载 console.hbs 模板并传递数据给模板
});

module.exports = router;