'use strict';

var util = require('util');

module.exports = {
    setvehiclelocation:setvehiclelocation,
    getstreamvehicle:getstreamvehicle,
    sendvehiclemsg:sendvehiclemsg
};

var vehicles = [{
    "id": 1,
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": []
},
{   "id": 2,
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": []
},
{   "id": 3,
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": []
},
{   "id": 4,
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": []
},
{   "id": 5,
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": []
},
{   "id": 6,
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": []
}];

function setvehiclelocation(req, res) {

  var id = req.swagger.params.id.value;
  var id = req.swagger.params.id.value;
  res.json('vehicle' + id + ' is now at ' + vehicles[id].location.value);
}

function getstreamvehicle(req, res) {

    var id = req.swagger.params.id.value;
    res.json(vehicles[id].stream);
}

function sendvehiclemsg(req, res) {

    var id = req.swagger.params.id.value;
    var lat = Math.round(req.swagger.params.lat.value*100)/100;
    var lon = Math.round(req.swagger.params.lon.value*100)/100;

    vehicles.forEach(element => {
        
    });
    vehicles[id].location = req.swagger.params.body.value.suggestion;
  
    res.json(vehicles[id].name + ' is now in ' + req.swagger.params.body.value.suggestion);
}