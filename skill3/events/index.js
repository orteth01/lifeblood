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
        url: utils.baseApiUrl + utils.students,
        form: newSession,
    }

    var output = '';
    var reprompt = '';

    output += 'Which of these do you think your mom will like best?';
    response._session = newSession;

    return response.tell(output);

};

module.exports = {
    onLaunch: onLaunch,
};
