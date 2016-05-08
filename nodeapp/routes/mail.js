/**
 * Created by David on 5/7/16.
 */
var express = require('express');
var router = express.Router();
var outlook = require("node-outlook");
var authHelper = require("./authHelper");

var hardtoken = '';
var hardemail ='';
var hardrefresh ='MCeFqrCbt!KP5Refnvuwa4DeTd9tUvUjSeX3bDcBazU1NmwhC1jAUb735qRc!LcwiJB4csR2Jnd61qkcVFoZjb2*YokjzXexqRF1JX*F7hLtRBYQavw*t6pxJROr!HwZ2LPxAI2QSRULEIDFBzJQjhxJfVoaOzm2UYbe1!DYaHjqzN7N6dOeXEB9hRpMDihFHQstDkwCM!rENQbShn2LtsqGCpF*AYySr7FZ2OEMVI3Enlm9Ij0ABemP8BflSmhtt9*q6mbIrSaWU3eTnhFkSFfBLEtY8YWiuDqtl1sWKks6hycbBkMnGtYhxLV!GrCYTWnmiJorq3mzSBeYKMf*XxpeB!HDBRyxfnqh!*VQuuN2OYRtq7dvPtYhc!yBhyy5V8TNyxPKxzacFR0Bubsl84d4f*4mf1Ir0UZznaj64XnzLQ3DGYLtaWl4vifIIBndYZbH97IO6Rb2JpaSloCKOdv0$';

function getValueFromCookie(valueName, cookie) {
    if (cookie.indexOf(valueName) !== -1) {
        var start = cookie.indexOf(valueName) + valueName.length + 1;
        var end = cookie.indexOf(';', start);
        end = end === -1 ? cookie.length : end;
        return cookie.substring(start, end);
    }
}

router.get('/', function(req, res, next) {
    var refresh = hardrefresh == '' ? req.session.refresh_token : hardrefresh;
    console.log('adsfasdf -> ' + refresh);
    
    authHelper.getTokenFromRefreshToken(refresh, function(req, response, error, token){
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

            var token = hardtoken == '' ? req.session.access_token : hardtoken;
            console.log("Token found in cookie: ", token);
            var email = hardemail == '' ? req.session.email : hardemail;
            console.log("Email found in cookie: ", email);

            if (token) {
                var returnObj = {};
                res.writeHead(200, {"Content-Type": "text/json"});

                var queryParams = {
                    '$select': 'Subject,ReceivedDateTime,From,BodyPreview',
                    '$orderby': 'ReceivedDateTime desc',
                    '$top': 1,
                    '$filter': 'IsRead eq false'
                };

                // Set the API endpoint to use the v2.0 endpoint
                outlook.base.setApiEndpoint('https://outlook.office.com/api/v2.0');
                // Set the anchor mailbox to the user's SMTP address
                outlook.base.setAnchorMailbox(email);

                outlook.mail.getMessages({token: token, odataParams: queryParams},
                    function(error, result){
                        if (error) {
                            console.log('getMessages returned an error: ' + error);
                            res.write("<p>ERROR: " + error + "</p>");
                            res.end();
                        }
                        else if (result) {
                            console.log('getMessages returned ' + result.value.length + ' messages.');
                            result.value.forEach(function(message) {
                                var queryParams = {
                                    '$select': 'GivenName,Surname,EmailAddresses',
                                    '$orderby': 'GivenName asc',
                                    '$top': 1
                                };

                                outlook.contacts.getContacts({token: token, odataParams: queryParams},
                                    function(error, result){
                                        if (error) {
                                            console.log('getContacts returned an error: ' + error);
                                            res.write("<p>ERROR: " + error + "</p>");
                                            res.end();
                                        }
                                        else if (result) {
                                            console.log('getContacts returned ' + result.value.length + ' contacts.');
                                            console.log('  Subject: ' + message.Subject);
                                            var from = result.value[0].GivenName ? result.value[0].GivenName : "NONE";

                                            returnObj.from=from;
                                            returnObj.subject = message.Subject;
                                            returnObj.body = message.BodyPreview;


                                            res.write(JSON.stringify(returnObj).replace(/’/g,"'"));
                                            res.end();
                                        }
                                    });
                            });
                        }
                    });
            }
            else {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write('<p> No token found in cookie!</p>');
                res.end();
            }
        }
    }, req, res);
});

module.exports = router;
