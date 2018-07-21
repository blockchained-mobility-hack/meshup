'use strict';

var util = require('util');

module.exports = {
    getstate:getstate,
    poststate:poststate
};

var state = "well";

function getstate(req, res) {
  res.json(state);
}

function poststate(req, res) {

    //console.log(JSON.stringify(req.swagger.params.body));
    state = req.swagger.params.body.value.event || "seems well";
    res.json(state);
  }