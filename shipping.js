var express = require('express');
var https = require('https');
var request = require('request');
var shippo = require('shippo')('');
var bodyParser = require('body-parser');
//var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000
//var todos = [];
//var todoNextId = 1;
app.use(bodyParser.json());

//root dir
app.get('/', function (req, res) {
    res.send('TODO API Root for shipping app');
});


//GET /todos/:id
app.get('/fedex/:id', function (req, res) {
    request('https://api.goshippo.com/v1/tracks/fedex/' +  req.params.id, function(error, response, body){
        if (!error && response.statusCode == 200){
            var temp = JSON.parse(body);

            var status_date
            if (temp.tracking_status != null && temp.tracking_status.status_date != null) {
                status_date = temp.tracking_status.status_date
            }
            
            var status_details
            if (temp.tracking_status != null && temp.tracking_status.status_details != null) {
                status_details = temp.tracking_status.status_details
            }
            
            var status = {
                carrier: temp.carrier,
                date: status_date,
                details: status_details
            }

            res.json(status);
        }
    });
});

//GET /todos/:id
app.get('/usps/:id', function (req, res) {
    request('https://api.goshippo.com/v1/tracks/usps/' +  req.params.id, function(error, response, body){
        if (!error && response.statusCode == 200){
            var temp = JSON.parse(body);

            var status = {
                carrier: temp.carrier,
                date: temp.tracking_status.status_date,
                details: temp.tracking_status.status_details
            }

            res.json(status);
        }
    });
});

app.get('/ups/:id', function (req, res) {
    request('https://api.goshippo.com/v1/tracks/ups/' +  req.params.id, function(error, response, body){
        if (!error && response.statusCode == 200){
            var temp = JSON.parse(body);

            var status = {
                carrier: temp.carrier,
                date: temp.tracking_status.status_date,
                details: temp.tracking_status.status_details
            }

            res.json(status);
        }
    });
});

app.listen(PORT, function () {
    console.log('Express listening on port ' + PORT + '!');
});

