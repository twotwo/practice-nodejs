var express = require('express');
var router = express.Router();

var debug = require('debug')('console');

/* Fake Info for Test */
var info = require('../models/fake_info');

/* helper functions*/
var command = require('../lib/command_helper.js');
var expressHelper = require('../lib/express_helper.js');

//https://github.com/JerrySievert/date-utils
require('date-utils');

/* Set Remote Adress in Session */
router.use(function(req, res, next){
	expressHelper.setRemoteAdress(req, res, next);
});

/* GET console info. */
router.get('/', function(req, res, next) {
	var user = new Object();
	user.appId = '20003'; // iOS Demo
	res.render('console', { user: user, logs: info.logs }); // 加载 console.hbs 模板并传递数据给模板
});

/* POST console info. */
router.post('/', function(req, res, next) {
	if (!req.body) return res.sendStatus(400);

	debug('req.body =',req.body);

	var user = new Object();
	user.channelId = req.body.channelId || '300001';
	user.appId = req.body.appId || '';
	user.devId = req.body.readLines || '';
	user.ipAddress = req.body.ipAddress || '';
	//读取行数
	user.readLines = req.body.readLines || '10000';
	//显示哪些字段
	user.colType = req.body.colType || 'c10';
	
	debug('process.env.NODE_ENV = %s', process.env.NODE_ENV);
	//获取日志文件地址
	if (process.env.NODE_ENV==='production') {
		var dt = new Date();
		var todayLog = dt.toFormat("/YYYY-MM-DD.log");
		user.logFile = global.config.log_dir+todayLog; //正式环境
	}else {
		user.logFile = global.config.log_dir+'/2017-12-04.log'; //非正式环境，读取本地测试文件
	}
	debug('logFile = '+user.logFile);

	var cmd = command.genCommand(user);

	command.execute(cmd, function(error, stdout, stderr) {
		if (error) {
			//console.error(`exec error: ${error}`);
			res.render('console', {  user: user, cmd: cmd, 
				error: error});
		} else {
			// console.log(`stdout: ${stdout}`);
			// 加载 console.hbs 模板并传递数据给模板
			res.render('console', {  user: user, cmd: cmd, 
				logs: command.splitLogs(user, stdout) });
		}
	  });
});

module.exports = router;