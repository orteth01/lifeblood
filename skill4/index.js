var AlexaSkill = require('./utils/AlexaSkill');
var APP_ID = 'amzn1.echo-sdk-ams.app.e145a54b-e0ac-4d5c-8a8a-70a96147b94b';

//Custom Intents

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
};


exports.handler = function (event, context) {
    var skill = new LifeBlood();
    skill.execute(event, context);
}
