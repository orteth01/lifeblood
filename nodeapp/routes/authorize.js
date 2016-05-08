var url = require("url");
var express = require('express');
var router = express.Router();
var authHelper = require("./authHelper");

/* GET authorize page. */
router.get('/', function(req, res, next) {
  console.log("Request handler 'authorize' was called.");

  // The authorization code is passed as a query parameter
  var code = req.query.code;
  console.log("Code: " + code);
  var token = authHelper.getTokenFromCode(code, tokenReceived, res);
});

function tokenReceived(response, error, token) {
  if (error) {
    console.log("Access token error: ", error.message);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<p>ERROR: ' + error + '</p>');
    response.end();
  }
  else {
    var cookies = ['node-tutorial-token=' + token.token.access_token + ';Max-Age=3600',
      'node-tutorial-email=' + authHelper.getEmailFromIdToken(token.token.id_token) + ';Max-Age=3600'];
    response.setHeader('Set-Cookie', cookies);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<p>Access token saved in cookie.</p>');
    response.end();
  }
}


module.exports = router;
