var express = require('express');
var router = express.Router();
var authHelper = require("./authHelper");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HoloAssist - The HoloBot Api Engine', authHelper: authHelper });
});

module.exports = router;
