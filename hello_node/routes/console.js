var express = require('express');
var router = express.Router();

/* GET console listing. */
router.get('/', function(req, res, next) {
  res.send('console response');
});

module.exports = router;