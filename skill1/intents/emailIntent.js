var _ = require('lodash-node');
var request = require('request');
var utils = require('../utils');

module.exports = function (intent, session, response) {
    console.log("\n!!!!!!!!!!\n!!!!!!!!!! EMAIL INTENT\n!!!!!!!!!!");
    var watsonCallback = function (err, resp,  body) {
        if (err) {
            console.log('lol gtfo');
        }
        console.log('\n!!!!!!!!!!\n!!!!!!!!!!\n!!!!!!!!!! WATSON CALLBACK!!');
        // Do something with returned data
        var text = "";
        var cardText = "";
        var repromptText = "";
        var heading = "";
        var tell = false;
        var withCard = true;

        var newSession = _.assign({}, session);

        text += 'You have an email in Outlook, from your mother. ';
        text += 'She sounds mad. ';
        text += '"Teddy, Why are you at a hackathon on Mother’s Day!? ';
        text += 'You’re a terrible son!”';

        response._session = newSession;

        if (tell && withCard) {
            return response.tellWithCard(text, heading, cardText);
        } else if (tell) {
            return response.tell(text);
        } else if (withCard) {
            return response.askWithCard(text, repromptText, heading, cardText);
        } else {
            return response.ask(text, repromptText);
        }
    }

    var emailCallback = function(err, resp, body) {
        if (err) {
            console.log('lol gtfo');
        }
        console.log('\n!!!!!!!!!!\n!!!!!!!!!!\n!!!!!!!!!! EMAIL CALLBACK!!');
        // Parse returned data and pass it to watson
        var data = JSON.parse(body);

        var options = {
            method: 'GET',
            url: utils.baseApiUrl + utils.watson + data.body,
        }
        request(options, watsonCallback);
    };

    var options = {
        method: 'GET',
        url: utils.baseApiUrl + utils.email,
    }
    request(options, emailCallback);

    var text = "";
    var cardText = "";
    var repromptText = "";
    var heading = "";
    var tell = false;
    var withCard = false;

    var newSession = _.assign({}, session);

    text += 'You have an email in Outlook from your mother. ';
    text += 'She sounds mad. It reads: ';
    text += '“Teddy, Why are you at a hackathon on Mother’s Day!? ';
    text += 'You’re a terrible son!”';

    response._session = newSession;

    if (tell && withCard) {
        return response.tellWithCard(text, heading, cardText);
    } else if (tell) {
        return response.tell(text);
    } else if (withCard) {
        return response.askWithCard(text, repromptText, heading, cardText);
    } else {
        return response.ask(text, repromptText);
    }
};