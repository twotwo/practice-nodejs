var express = require('express');
var router = express.Router();

var debug = require('debug')('app:console');

// /* Fake Info for Test */
// var info = require('../models/fake_info');

/* helper functions*/
var command = require('../libs/command_helper.js');
var expressHelper = require('../libs/express_helper.js');

//https://github.com/JerrySievert/date-utils
require('date-utils');

/* Set Remote Adress in Session */
router.use(function(req, res, next) {
    expressHelper.setRemoteAdress(req, res, next);
});

/* GET console info. */
router.post('/', function(req, res, next) {
    debug('req.body =', req.body);
    var result = {};
    result.appId = '20003';
    result.channelId = '300001';
    res.send(result);
	res.end();
});

module.exports = router;