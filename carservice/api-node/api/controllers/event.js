'use strict';

var util = require('util');
// Require the use of IOTA library
const IOTA = require("iota.lib.js");
// Create a new instance of the IOTA class object.
// Use 'provider' variable to specify which Full Node to talk to
const iota = new IOTA({provider: "https://nodes.testnet.iota.org:443"});

module.exports = {
  getevents:getevents,
  postevent:postevent
};

var state = "well";

//find transaction
function getevents(req, res) {
  
  let msg = '<div class="container">';
  //var searchValues = {'tags': ['MESHUP']};
  var searchValues = {'tags': ['YAUASAABWARAABYASAUAVA99999']};

  iota.api.findTransactionObjects( searchValues, function( error, txObjects ) {
    if(!error) {
      //if(outputLoc != null) {
        msg += '<pre>';
        if(txObjects.length == 0) {
          msg += 'No data found \n';
        } else {
          // Sort the transactions by attachmentTimestamp
          // By doing this the transactions are ordered by currentIndex 0,1,2,...
          // The oldest dates are shown last.
          txObjects.sort(function(a,b){
            return b.attachmentTimestamp-a.attachmentTimestamp;
          });

          txObjects.forEach(function(txObject) {
            let trytes = iota.utils.transactionTrytes(txObject);
            msg += 'Transaction object: \n';
            msg += JSON.stringify(txObject, null, "\t");
            msg += '\n\n';
            msg += 'Transaction object converted into trytes: \n';
            msg += trytes;
            msg += '\n';
            msg += 'Transaction object trytes length: '+trytes.length;
            msg += '\n';
//          msg += 'Transaction object timestamp: '+timeConverter(txObject.timestamp);
//          msg += '\n\n';
            msg += '-------------------------------------------------------------------------';
            msg += '\n\n';
          });
      //  }
      //  msg += '<'+'/pre>';
      //  msg += '<'+'/div>';
      //  msg += "<"+"/br><"+"/br>";
        //document.getElementById(outputLoc).innerHTML = msg;
        console.log(msg);
        res.json(msg);
      }
  //    resolve(txObjects);
    } else {
      reject(error);
      res.json(':(');
    }
  });
}

//send transaction
function postevent(req, res) {
    // Call the 'getNodeInfo call to check that the node is working
    /*iota.api.getNodeInfo((error, success) => {
      if (error) {
        console.log(error)
      } else {
        console.log(success)
      }
    })*/
    //const trytes = 'HELLOXXXXXHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD'
    const vehicle1 = 'VEHICLEONEVEHICLEONEVEHICLEONEVEHICLEONEVEHICLEONEVEHICLEONEVEHICLEONEVEHICLEONEV'
    const vehicle2 = 'VEHICLETWOVEHICLETWOVEHICLETWOVEHICLETWOVEHICLETWOVEHICLETWOVEHICLETWOVEHICLETWOV'
    const vehicle3 = 'VEHICLETHRVEHICLETHRVEHICLETHRVEHICLETHRVEHICLETHRVEHICLETHRVEHICLETHRVEHICLETHRV'
    const vehicle4 = 'VEHICLEFOUVEHICLEFOUVEHICLEFOUVEHICLEFOUVEHICLEFOUVEHICLEFOUVEHICLEFOUVEHICLEFOUV'
    //const message = iota.utils.toTrytes('Airbag: OMG, I just released!')
    sendMessage (vehicle1,40.717000, -74.006400, 'Airbag: OMG, I just released!')
    sendMessage (vehicle2,40.717000, -74.006400, 'Breaks: Nailed it!! From 100 to 0 in 3s')
    sendMessage (vehicle3,40.717000, -74.006400, 'Cruise Control: Why is everyone slowing down')
    sendMessage (vehicle4,40.717000, -74.006400, 'Meshup: Detected Accident ahead')

    //console.log(JSON.stringify(req.swagger.params.body));
    //state = req.swagger.params.body.value.event || "seems well";
    res.json("All ok! " + req.swagger.params.body.value.event);
}
/*
* Sends a message from a vehicle together with the message to the tangle
*/
function sendMessage(vehicleAddress, lat, long, message) {
  const messageTryte = iota.utils.toTrytes(message)
  var roundedLat = parseFloat(lat).toFixed(2)
  var roundedLong = parseFloat(long).toFixed(2)
  var tag = roundedLat.concat(roundedLong)//.replace(".", "D").replace(".", "D").replace("-", "M")
  var transactionMessage = '{ "message":' + message + ', "latitude":' + lat + ', "longitude":' + long + ' }';
  console.log('tag')
  console.log(tag)
  console.log(iota.utils.toTrytes(tag))
  console.log('message')
  console.log(transactionMessage)
  const transfers = [
  {
      value: 0,
      address: vehicleAddress,
      message: iota.utils.toTrytes(transactionMessage),
      tag: iota.utils.toTrytes(tag)
    }
  ]
  iota.api.sendTransfer(vehicleAddress, 3, 9, transfers, (error, success) => {
    if (error) {
      console.log(error)
    } else {
      console.log(success)
    }
  })
}
