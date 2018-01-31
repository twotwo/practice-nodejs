var express = require('express');
var router = express.Router();

var debug = require('debug')('console');

/* Fake Info for Test */
var info = require('../models/fake_info');

/* helper functions*/
var command = require('../libs/command_helper.js');
var expressHelper = require('../libs/express_helper.js');

//https://github.com/JerrySievert/date-utils
require('date-utils');

/* Set Remote Adress in Session */
router.use(function(req, res, next){
	expressHelper.setRemoteAdress(req, res, next);
});

/* GET console info. */
router.get('/', function(req, res, next) {
	var option = {};
	// iOS Demo Params
	option.appId = '20003';
	option.channelId = '300001';
	res.render('console', { option: option }); // 加载 console.hbs 模板并传递数据给模板
});

/**
 * 1、获取请求参数；
 * 2、执行后台日志查询；
 * 3、查询结果格式化后渲染成前台页面
 */
router.post('/', function(req, res, next) {
	if (!req.body) return res.sendStatus(400);

	debug('req.body =',req.body);

	var option = {};
	option.channelId = req.body.channelId || "300000";
	option.appId = req.body.appId || '';
	option.devId = req.body.devId || '';
	option.uid = req.body.uid || '';
	option.ipAddress = req.body.ipAddress || '';
	//读取行数
	option.readLines = req.body.readLines || '150000';
	//显示哪些字段
	option.colType = req.body.colType || 'c10';
	
	debug('process.env.NODE_ENV = %s', process.env.NODE_ENV);
	//获取日志文件地址
	if (process.env.NODE_ENV==='production') {
		var dt = new Date();
		var todayLog = dt.toFormat("/YYYY-MM-DD.log");
		option.logFile = global.config.log_dir+todayLog; //正式环境
	}else {
		option.logFile = global.config.log_dir+'/2017-12-04.log'; //非正式环境，读取本地测试文件
	}
	debug('logFile = '+option.logFile);

	var cmd = command.genCommand(option);

	command.execute(cmd, function(error, stdout, stderr) {
		if (error) {
			//console.error(`exec error: ${error}`);
			res.render('console', {  option: option, cmd: cmd, 
				error: error});
		} else {
			// console.log(`stdout: ${stdout}`);
			// 加载 console.hbs 模板并传递数据给模板
			res.render('console', {  option: option, cmd: cmd, 
				logs: command.formatLogs(stdout) });
		}
	  });
});

module.exports = router;