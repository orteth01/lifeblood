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
    var options = {
        url: utils.baseApiUrl + utils.statusUpdate,
        form: newSession,
    }

    var output = '';
    var reprompt = '';

    output += 'Good morning Teddy. ';
    output += 'It’s going to be a beautiful day today. ';
    output += 'How can I help you?';
    response._session = newSession;

    return response.ask(output, reprompt);

};

module.exports = {
    onLaunch: onLaunch,
};
