var express = require('express');
var router = express.Router();

/* Fake Info for Demo */
var info = require('../models/fake_info');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user_list', { title: 'List Users', users: info.users });
});

module.exports = router;
