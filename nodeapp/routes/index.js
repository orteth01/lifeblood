var express = require('express');
var router = express.Router();
var authHelper = require("./authHelper");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOLOASSIST API', authHelper: authHelper });
});

module.exports = router;
