var AlexaSkill = require('./utils/AlexaSkill');
var APP_ID = 'amzn1.echo-sdk-ams.app.ae351af2-5ab1-478a-b26e-e7cb71070bdf';

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
