'use strict';

var util = require('util');

module.exports = {
    vehicle:vehicle,
    runaway:runaway
};

var vehicles = [{
    "id": "0",
    "name": "audi",
    "color": "red",
    "state": "well",
    "location": "tile1"},
{   "id": "1",
    "name": "bmw",
    "color": "blue",
    "state": "well",
    "location": "tile2"},
{   "id": "2",
    "name": "vw",
    "color": "grey",
    "state": "well",
    "location": "tile1"}];


function vehicle(req, res) {

  var id = (req.swagger.params.id.value < 2) ? req.swagger.params.id.value : 2;
  var vehicle =  vehicles[id];

  res.json(vehicle);
}

function runaway(req, res) {

    //console.log(JSON.stringify(req.swagger.params.body));

    var id = (req.swagger.params.body.value.vehicle < 2) ? req.swagger.params.body.value.vehicle : 2;
    vehicles[id].location = req.swagger.params.body.value.suggestion;
  
    res.json(vehicles[id].name + ' is now in ' + req.swagger.params.body.value.suggestion);
  }