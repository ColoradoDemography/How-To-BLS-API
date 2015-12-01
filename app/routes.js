var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next){
	var context = {};
	res.render('bls', context);
});

router.post('/', function(req, res, next){
    if (req.body['Add Series']){
        var context = {};
        context.results = [];
        
        request({
            "url":"http://api.bls.gov/publicAPI/v1/timeseries/data/",
            "method":"POST",
            "headers":{"Content-Type":"application/json"},
            "body":'{"seriesid":["' + req.body.series + '"],
                     "startyear": "' + req.body.syear + '", "endyear": "' + req.body.eyear + '"}'}, 
        function(err, response, body){
            if(!err && response.statusCode < 400){
                var parsedBody = JSON.parse(body);
                var index = 0;
                while(parsedBody.Results.series[0].data[index] != undefined){
                    context.results.push({"year": parsedBody.Results.series[0].data[index].year,
                                          "month": parsedBody.Results.series[0].data[index].periodName,
                                          "value": parsedBody.Results.series[0].data[index].value});
                    index = index + 1;
                }     
                res.render('bls',context);
            } else {
                if(response){
                    console.log(response.statusCode);
                }
                next(err);
            }
        });
     }
});
module.exports = router;