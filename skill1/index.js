var AlexaSkill = require('./utils/AlexaSkill');
var APP_ID = 'amzn1.echo-sdk-ams.app.efc49636-0c78-402b-8f95-3dcfe3c9478b';

//Custom Intents
var handleEmailIntent = require('./intents/emailIntent');

// Amazon Intent Overrides

//Custom Events
var events = require('./events');

var LifeBlood = function() {
    AlexaSkill.call(this, APP_ID);
};

LifeBlood.prototype = Object.create(AlexaSkill.prototype);
LifeBlood.prototype.constructor = LifeBlood;

LifeBlood.prototype.eventHandlers.onLaunch = events.onLaunch;

LifeBlood.prototype.intentHandlers = {
    Email: handleEmailIntent,
};


exports.handler = function (event, context) {
    var skill = new LifeBlood();
    skill.execute(event, context);
}
