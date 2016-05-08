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
        url: utils.baseApiUrl + utils.content,
        form: newSession,
    }

    request.post(options, function(err, resp, body) {
        if (err) {
            console.log('!!!!!!!!!!\n!!!!!!!!!!ERROR IN onLaunch\n!!!!!!!!!!\n', err);
        }
        // don't do shit.
        var output = '';
        var reprompt = '';

        var title = body.title;

        // output += 'Tomorrow, you are reading ' + title  + '.';
        output += 'Tomorrow, you are reading Heads or Tails by Bill Holt.';
        response._session = newSession;

        return response.tell(output);
    });
    var output = '';
    var reprompt = '';

    output += 'Tomorrow, you are reading Heads or Tails by Bill Holt.';
    response._session = newSession;

    return response.tell(output);

};

module.exports = {
    onLaunch: onLaunch,
};
