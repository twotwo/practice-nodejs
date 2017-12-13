var express = require('express');
var router = express.Router();

/* Fake Info for Test */
var info = require('../models/fake_info');
var command = require('../models/command_helper.js');

// https://nodejs.org/docs/latest-v8.x/api/child_process.html#child_process_child_process_exec_command_options_callback
const { exec } = require('child_process');

//https://github.com/JerrySievert/date-utils
require('date-utils');

/* GET console info. */
router.get('/', function(req, res, next) {
	var user = new Object();
	user.appId = '20003'; // iOS Demo
	res.render('console', { user: user, logs: info.logs }); // 加载 console.hbs 模板并传递数据给模板
});

/* POST console info. */
router.post('/', function(req, res, next) {
	var config = req.app.get('config');

	var user = new Object();
	user.appId = req.body.appId || '';
	user.devId = req.body.readLines || '';
	user.ipAddress = req.body.ipAddress || '202.134.91.42';
	//读取行数
	user.readLines = req.body.readLines || '10000';
	//显示哪些字段
	user.colType = req.body.colType || 'c10';
	//日志文件地址
	if (process.env.NODE_ENV==='prod') {
		var dt = new Date();
		var todayLog = dt.toFormat("/YYYY-MM-DD.log");
		user.logFile = config.log_dir+todayLog; //正式环境
	}else {
		user.logFile = config.log_dir+'/2017-12-04.log'; //非正式环境，读取本地测试文件
	}
	console.log('logFile = '+user.logFile);

	var cmd = command.genCommand(user);

	exec(cmd, (error, stdout, stderr) => {
		if (error) {
			//console.error(`exec error: ${error}`);
			res.render('console', {  user: user, cmd: cmd, 
				error: error});
		} else {
			console.log(`stdout: ${stdout}`);
			// 加载 console.hbs 模板并传递数据给模板
			res.render('console', {  user: user, cmd: cmd, 
				logs: command.splitLogs(user, stdout) });
		}
	  });
});

module.exports = router;