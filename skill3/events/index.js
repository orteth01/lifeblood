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

    request.post(options, function(err, resp, body) {
        if (err) {
            console.log('!!!!!!!!!!\n!!!!!!!!!!ERROR IN onLaunch\n!!!!!!!!!!\n', err);
        }
        // don't do shit.
        var output = '';
        var reprompt = '';

        var title = body.title;

        // output += 'Tomorrow, you are reading ' + title  + '.';
        output += 'It looks like billy’s grades are slipping.';
        response._session = newSession;

        return response.tell(output);
    });
    var output = '';
    var reprompt = '';

    output += 'It looks like billy’s grades are slipping.';
    response._session = newSession;

    return response.tell(output);

};

module.exports = {
    onLaunch: onLaunch,
};
