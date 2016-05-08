/**
 * Created by David on 5/7/16.
 */
var express = require('express');
var router = express.Router();
const http = require('http');
var request = require('request');

var hmh_config = {
    api_key:"f6ad56f450a43ed7e3f59ea8b120c127",
    auth: "SIF_HMACSHA256 ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKb2RIUndjem92TDJsa1pXNTBhWFI1TG1Gd2FTNW9iV2hqYnk1amIyMGlMQ0poZFdRaU9pSm9kSFJ3T2k4dmQzZDNMbWh0YUdOdkxtTnZiU0lzSW1saGRDSTZNVFEyTWpZM05qTXhNQ3dpYzNWaUlqb2lZMjVjZFRBd00yUkhZVzVrWVd4bUlFZHlaWGtzZFdsa1hIVXdNRE5rWjJGdVpHRnNaaXgxYm1seGRXVkpaR1Z1ZEdsbWFXVnlYSFV3TUROa1lXSXhaRFF5TXpjdFpXUmtOeTAwWldSa0xUa3pOR1l0TXpRNE5tVmhZelZqTWpZeUxHOWNkVEF3TTJReE1EQXlPRGcxTUN4a1kxeDFNREF6WkRjME56Y2lMQ0pvZEhSd09pOHZkM2QzTG1sdGMyZHNiMkpoYkM1dmNtY3ZhVzF6Y0hWeWJDOXNhWE12ZGpFdmRtOWpZV0l2Y0dWeWMyOXVJanBiSWtsdWMzUnlkV04wYjNJaVhTd2lZMnhwWlc1MFgybGtJam9pTkdZeVpEYzROV0l0WmpZd01TMDBaamhsTFdFd016QXRNak0zWkRsa016RmpaakF5TG1odGFHTnZMbU52YlNJc0ltVjRjQ0k2TVRRMk1qYzJNamN4TUgwLlB2VjBURFFfTWZwOFJmaHdSSERtRmNhcTdWNW15ck9DYkZYQ3hneWRDY0U6NWZQeVRpSC92ZnlPR1d4djFWSnQ5cTIrOEhjVGlXekpGYytueDlNeldwdz0K"
}


router.get('/me', function(req, res, next) {
    var options = {
        url: 'http://sandbox.graph.hmhco.com/v4/me',
        headers: {
            'Vnd-HMH-Api-Key': hmh_config.api_key,
            'Authorization': hmh_config.auth,
            'Accept' : 'application/json'
        }
    };
    request.get(options, function(error, response, body){
       res.write(body);
        res.end();
    });
});

router.get('/mystudents', function(req, res, next) {
    var options = {
        url: 'http://sandbox.graph.hmhco.com/v4/students?facet=detail',
        headers: {
            'Vnd-HMH-Api-Key': hmh_config.api_key,
            'Authorization': hmh_config.auth,
            'Accept' : 'application/json'
        }
    };
    request.get(options, function(error, response, body){
        res.write(body);
        res.end();
    });
});

router.get("/myroster", function(req,res,next) {
    var options = {
        url: 'http://sandbox.graph.hmhco.com/v4/rosters?facet=detail&include=staff,student,term',
        headers: {
            'Vnd-HMH-Api-Key': hmh_config.api_key,
            'Authorization': hmh_config.auth,
            'Accept' : 'application/json'
        }
    };
    request.get(options, function(error, response, body){
        res.write(body);
        res.end();
    });
});

router.get("/mylearningcontent", function(req,res,next) {
    var options = {
        url: 'http://sandbox.graph.hmhco.com/v4/learning_contents?facet=detail',
        headers: {
            'Vnd-HMH-Api-Key': hmh_config.api_key,
            'Authorization': hmh_config.auth,
            'Accept' : 'application/json'
        }
    };
    request.get(options, function(error, response, body){
        res.write(body);
        res.end();
    });
});

router.get("/mydocuments", function(req,res,next) {
    var options = {
        url: 'http://sandbox.graph.hmhco.com/v4/documents',
        headers: {
            'Vnd-HMH-Api-Key': hmh_config.api_key,
            'Authorization': hmh_config.auth,
            'Accept' : 'application/json'
        }
    };
    request.get(options, function(error, response, body){
        res.write(body);
        res.end();
    });
});

module.exports = router;
