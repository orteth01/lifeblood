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
  var token = authHelper.getTokenFromCode(code, tokenReceived, res, req);
});

router.get('/refresh', function(req, res, next) {
  var refresh_token = req.session.refresh_token;
  if (refresh_token === undefined) {
    console.log('no refresh token in session');
    res.redirect('/');
  }
  else {
    authHelper.getTokenFromRefreshToken(refresh_token, tokenReceived, req, res);
  }
});

function tokenReceived(req, response, error, token) {
  if (error) {
    console.log("Access token error: ", error.message);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<p>ERROR: ' + error + '</p>');
    response.end();
  }
  else {
    req.session.access_token = token.token.access_token;
    req.session.refresh_token = token.token.refresh_token;
    req.session.email = authHelper.getEmailFromIdToken(token.token.id_token);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<p>Access token saved in cookie.</p>');
    response.end();
  }
}


module.exports = router;
