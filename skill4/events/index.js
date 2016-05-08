var request = require('request');
var utils = require('../utils');

function onLaunch (launchRequest, session, response) {
    console.log(
        '\nSTARTING onLaunch\n!!!!!!!!!!!!!\n!!!!!!!!!!!!!\nlaunchRequest:',
        launchRequest,
        '\nsession:',
        session,
        '\nresponse:',
        response
    );

    var newSession = {
        state: utils.states.ONE,
    }

    var output = '';
    var reprompt = '';

    output += 'Your car is waiting for you. See you at work.';
    response._session = newSession;

    return response.tell(output);

};

module.exports = {
    onLaunch: onLaunch,
};
