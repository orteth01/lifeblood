module.exports = function (intent, session, response) {
     console.log("\n!!!!!!!!!!\n!!!!!!!!!! BUY INTENT\n!!!!!!!!!!");

    var text = "";
    var cardText = "";
    var repromptText = "";
    var heading = "";
    var tell = false;
    var withCard = true;

    var newSession = _.assign({}, session);

    text += 'Which of these do you think mom will like best?';

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