/**
 * Created by David on 5/7/16.
 */
var express = require('express');
var router = express.Router();
var outlook = require("node-outlook");

var hardtoken = '';
var hardemail ='';

function getValueFromCookie(valueName, cookie) {
    if (cookie.indexOf(valueName) !== -1) {
        var start = cookie.indexOf(valueName) + valueName.length + 1;
        var end = cookie.indexOf(';', start);
        end = end === -1 ? cookie.length : end;
        return cookie.substring(start, end);
    }
}

router.get('/', function(req, res, next) {
    var token = hardtoken == '' ? getValueFromCookie('node-tutorial-token', req.headers.cookie) : hardtoken;
    console.log("Token found in cookie: ", token);
    var email = hardemail == '' ? getValueFromCookie('node-tutorial-email', req.headers.cookie) : hardemail;
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
});

module.exports = router;
