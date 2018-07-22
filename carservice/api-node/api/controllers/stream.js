'use strict';

var util = require('util');

module.exports = {
    // receive string "car_2" location(lat and lon) >> update car with lat and lon
    setvehiclelocation:setvehiclelocation,
    // gets stream for that vehicle
    getstreamvehicle:getstreamvehicle,
    // send string "car_2" & content & location >> update main stream 
    sendvehiclemsg:sendvehiclemsg,
    reset:reset
};

function reset(req, res) {
    stream = [];


    res.json('Reset!');
  }

function setvehiclelocation(req, res) {

    //console.log(JSON.stringify(req.swagger.params.body));

    var id = req.swagger.params.body.value.vehicle;
    var index = vehicles.findIndex(x => x.id === id);
   // console.log('position car at setvehiclelocation (before): ' + JSON.stringify(vehicles[index].location));

    vehicles[index].location = req.swagger.params.body.value.location;

    //console.log(JSON.stringify(vehicles[index]));

    //console.log('position car at setvehiclelocation (after): ' + JSON.stringify(vehicles[index].location));

    res.json('vehicle ' + id + ' is now at ' + JSON.stringify(vehicles[index].location));
  }
  
  function getstreamvehicle(req, res) {

    //console.log(JSON.stringify(req.swagger.params.name.value));
    var id = req.swagger.params.name.value;
    var index = vehicles.findIndex(x => x.id === id);

    //console.log(JSON.stringify(vehicles[index].location));

    var lat = Math.round(vehicles[index].location.lat*100)/100;
    var lon = Math.round(vehicles[index].location.lon*100)/100;

    vehicles[index].stream = [];
    
    //console.log('stream at getstreamvehicle (before): ' + JSON.stringify(vehicles[index].stream));

    stream.forEach(function(element) {
        //console.log(element);
        var latStream = Math.round(element.location.lat*100)/100;
        var lonStream = Math.round(element.location.lon*100)/100;

        if (lat === latStream && lon === lonStream) {
            vehicles[index].stream.push(element);
        }
    });
    
    //console.log('vehicle at getstreamvehicle (after): ' + JSON.stringify(vehicles[index].stream));
    res.json(vehicles[index].stream);
  }

  // send string "car_2" & content & location >> update main stream 
  function sendvehiclemsg(req, res) {
    //console.log(JSON.stringify(req.swagger.params.body));
    var id = req.swagger.params.body.value.vehicle;

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                        ];

    var timeNow = new Date();
    // 01 January 1970, 00:00:00, 000 miliseconds
    var timestamp = '' + timeNow.getDate() + ' ' +  monthNames[timeNow.getMonth()] + ' ' + timeNow.getFullYear() + ', ' + timeNow.getHours() + ':' + timeNow.getMinutes() + ':' + timeNow.getSeconds() + ', ' + timeNow.getMilliseconds() + ' miliseconds';

    console.log('Stream (sendvehiclemsg) has ' + JSON.stringify(stream))
    //console.log(timestamp);
    var msgObject = {
        "location": {
            "lat": req.swagger.params.body.value.location.lat,
            "lon": req.swagger.params.body.value.location.lon
        },
        'time': timestamp,
        'sender': req.swagger.params.body.value.vehicle,
        'content': req.swagger.params.body.value.content
      };

    //console.log('Stream (sendvehiclemsg) has now ' + JSON.stringify(stream));

    stream.push(msgObject);
    res.json('Stream (sendvehiclemsg) has now ' + JSON.stringify(stream));
  }

var stream = [
    {
        "location": {
            "lat": 0,
            "lon": 0
        },
        'time': '',
        'sender': '',
        'content': 'No events!' 
      }
]

var vehicles = [{
    "id": "car_1",
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": [
        {
            "location": {
                "lat": 40.717,
                "lon": -74.0064
            },
            'time': '',
            'sender': '',
            'content': 'Started vehicle!' 
          }
    ]
},
{   "id": "car_2",
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": [
        {
            "location": {
                "lat": 0,
                "lon": 0
            },
            'time': '',
            'sender': '',
            'content': 'Started vehicle!' 
          }
    ]
},
{   "id": "car_3",
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": [
        {
            "location": {
                "lat": 0,
                "lon": 0
            },
            'time': '',
            'sender': '',
            'content': 'Started vehicle!' 
          }
    ]
},
{   "id": "car_4",
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": [
        {
            "location": {
                "lat": 0,
                "lon": 0
            },
            'time': '',
            'sender': '',
            'content': 'Started vehicle!' 
          }
    ]
},
{   "id": "car_5",
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": [
        {
            "location": {
                "lat": 0,
                "lon": 0
            },
            'time': '',
            'sender': '',
            'content': 'Started vehicle!' 
          }
    ]
},
{   "id": "car_6",
    "location": {
        "lat": 0,
        "lon": 0
    },
    "stream": [
        {
            "location": {
                "lat": 0,
                "lon": 0
            },
            'time': '',
            'sender': '',
            'content': 'Started vehicle!' 
          }
    ]
}];

