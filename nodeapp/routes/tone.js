/**
 * Created by David on 5/7/16.
 */
var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var _ = require('lodash-node');

var tone_analyzer = watson.tone_analyzer({
    url: "https://gateway.watsonplatform.net/tone-analyzer-beta/api",
    password: "GRIZqf17Ecbb",
    username: "07e4c273-b25a-4acf-96d7-a2b4f720c33f",
    version: 'v3-beta',
    version_date: '2016-02-11'
});


router.get('/', function(req, res, next) {
    tone_analyzer.tone({ text: req.query.text },
        function(err, tone) {
            tone["document_tone"]["tone_categories"].map(function(ele) {
                ele.tones = ele.tones.sort(function(a, b) {
                    return b.score - a.score;
                });
            });


            if (err)
            {
                console.log(err);
                res.write("<p>ERROR: " + err + "</p>");
                res.end();
            }
            else
            {
                res.writeHead(200, {"Content-Type": "text/json"});
                res.write(JSON.stringify(tone, null, 2));
                res.end();
            }

        });
});

router.get("/top", function(req,res,next) {
    tone_analyzer.tone({ text: req.query.text },
        function(err, tone) {
            if (err)
            {
                console.log(err);
                res.write("<p>ERROR: " + err + "</p>");
                res.end();
            }
            else
            {
                var topTone = {};

                tone.document_tone.tone_categories.forEach(function(toneCat)
                {
                    if (toneCat.category_id == 'emotion_tone'){
                        var rows = 0;
                        var limit = toneCat.tones.length;
                        toneCat.tones.forEach(function(tone){
                            rows++;
                            if(!topTone.score){
                                topTone = tone;
                            }else if(topTone.score < tone.score){
                                topTone = tone;
                            }

                            if(rows == limit){
                                res.writeHead(200, {"Content-Type": "text/json"});
                                res.write(JSON.stringify(topTone, null, 2));
                                res.end();
                            }
                        });
                    }
                });
            }

        });
});

router.post("/topFromEmail", function(req,res,next) {
    tone_analyzer.tone({ text: req.body.body },
        function(err, tone) {
            if (err)
            {
                console.log(err);
                res.write("<p>ERROR: " + err + "</p>");
                res.end();
            }
            else
            {
                var topTone = {};
                var limit = tone.document_tone.tone_categories.length;

                tone.document_tone.tone_categories.forEach(function(toneCat)
                {
                    if (toneCat.category_id == 'emotion_tone'){
                        var rows = 0;
                        toneCat.tones.forEach(function(tone){
                            rows++;
                            if(!topTone.score){
                                topTone = tone;
                            }else if(topTone.score < tone.score){
                                topTone = tone;
                            }

                            if(rows == limit){
                                res.writeHead(200, {"Content-Type": "text/json"});
                                res.write(JSON.stringify(topTone, null, 2));
                                res.end();
                            }
                        });
                    }
                });
            }

        });
});

module.exports = router;
