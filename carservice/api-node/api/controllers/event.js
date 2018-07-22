'use strict';

var util = require('util');
// Require the use of IOTA library
const IOTA = require("iota.lib.js");
// Create a new instance of the IOTA class object.
// Use 'provider' variable to specify which Full Node to talk to
const iota = new IOTA({provider: "https://nodes.testnet.iota.org:443"});

var vehicles = ['ONE', 'TWO', 'THREE', 'FOUR'];
var seeds = ['VEHICLEONEVEHICLEONEVEHICLEONEVEHICLEONEVEHICLEONEVEHICLEONEVEHICLEONEVEHICLEONEV',
               'VEHICLETWOVEHICLETWOVEHICLETWOVEHICLETWOVEHICLETWOVEHICLETWOVEHICLETWOVEHICLETWOV',
               'VEHILCETHRVEHILCETHRVEHILCETHRVEHILCETHRVEHILCETHRVEHILCETHRVEHILCETHRVEHILCETHRV',
               'VEHILCEFOUVEHILCEFOUVEHILCEFOUVEHILCEFOUVEHILCEFOUVEHILCEFOUVEHILCEFOUVEHILCEFOUV'];


module.exports = {
  getevents:getevents,
  postevent:postevent
};

//find transaction
function getevents(req, res) {

  var msg = [];
  //var searchValues = {'tags': ['MESHUP']};
  var searchValues = {'tags': ['ZAUASABBWARAABYASAUAVA99999']};

  iota.api.findTransactionObjects( searchValues, function( error, txObjects ) {
    if(!error) {
      //if(outputLoc != null) {
        if(txObjects.length == 0) {
          msg.push({
            'origin': '',
            'time': '',
            'id_sender': '',
            'message': 'No data found!'
          });
        } else {
          // Sort the transactions by attachmentTimestamp
          // By doing this the transactions are ordered by currentIndex 0,1,2,...
          // The oldest dates are shown last.
          txObjects.sort(function(a,b){
            return b.attachmentTimestamp-a.attachmentTimestamp;
          });

          txObjects.forEach(function(txObject) {
            let trytes = iota.utils.transactionTrytes(txObject);
          //  let transactionMessage = convertFromTrytes(txObject.signatureMessageFragment).replace("'", "\"").replace("'", "\"");
          //  let transactionMessageObject = JSON.parse(transactionMessage);
          let transactionMessage = JSON.parse(convertFromTrytes(txObject.signatureMessageFragment));
            console.log(transactionMessage);

            msg.push({
              'origin': txObject.address,
              'time': timeConverter(txObject.timestamp),
              'id_sender': vehicles[seeds.indexOf(txObject.address)],
              //'message': convertFromTrytes(txObject.signatureMessageFragment)
              'message':transactionMessage.message,
              'latitude':transactionMessage.latitude,
              'longitute':transactionMessage.longitude
            });
          });
        res.json(msg);
      }
  //    resolve(txObjects);
    } else {
      reject(error);
      msg.push({
        'origin': '',
        'time': '',
        'id_sender': '',
        'message': 'Error ocurred: ' + error
      });
      res.json(msg);
    }
  });
}

function timeConverter(UNIX_timestamp){
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getUTCFullYear();
	var month = months[a.getUTCMonth()];
	var date = a.getUTCDate();
	var hour = a.getUTCHours() < 10 ? '0' + a.getUTCHours() : a.getUTCHours();
	var min = a.getUTCMinutes() < 10 ? '0' + a.getUTCMinutes() : a.getUTCMinutes();
	var sec = a.getUTCSeconds() < 10 ? '0' + a.getUTCSeconds() : a.getUTCSeconds();
	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	return time;
}


function convertFromTrytes(trytes){
	// Remove spaces
	trytes = trytes.trim();
	// Remove the '9' padding. The result should have an even number of trytes
	let message = trytes.replace(/(99)+$/, '');
	if(message.length % 2 != 0) {
		// Remove last character from string
		message = message.slice(0, -1);
	}
	return iota.utils.fromTrytes(message);
}

function calculateTag (lat, lon) {
  var roundedLat = parseFloat(lat).toFixed(2);
  var roundedLon = parseFloat(lon).toFixed(2);

  var tag = roundedLat.concat(roundedLon);
  return iota.utils.toTrytes(tag);
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
    // const trytes  = 'HELLOXXXXXHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD'
    // 81 characters
    //let vehicleAddress = 'VEHICLE' + req.swagger.params.body.value.vehicle;
    //vehicleAddress += "9".repeat(81-vehicleAddress.length);

    //const message = iota.utils.toTrytes('Airbag: OMG, I just released!')
    //sendMessage (seeds[1], 40.717000, -74.006400, 'Airbag: OMG, I just released!');
    //sendMessage (seeds[2],40.717000, -74.006400, 'Breaks: Nailed it!! From 100 to 0 in 3s');
    //sendMessage (seeds[3],40.717000, -74.006400, 'Cruise Control: Why is everyone slowing down');
    //sendMessage (seeds[4],40.717000, -74.006400, 'Meshup: Detected Accident ahead');
    let lat = req.swagger.params.body.value.lat;
    let lon = req.swagger.params.body.value.lon;
    let message = req.swagger.params.body.value.msg;
    let vehicle = req.swagger.params.body.value.vehicle;
    let vehicleAddress = seeds[vehicles.indexOf(vehicle)];

    const messageTryte = iota.utils.toTrytes(message);

    //var roundedLat = parseFloat(lat).toFixed(2);
    //var roundedLon = parseFloat(lon).toFixed(2);

    //var tag = roundedLat.concat(roundedLon); //.replace(".", "D").replace(".", "D").replace("-", "M")

    var transactionMessage = '{ "message": "' + message + '", "latitude":' + lat + ', "longitude":' + lon + ' }';

    //console.log('tag: ' + tag + ' ? ' + iota.utils.toTrytes(tag));
    console.log('message: ' + transactionMessage);
    //console.log('address: ' + vehicleAddress);

    const transfers = [
    {
        value: 0,
        address: vehicleAddress,
        message: iota.utils.toTrytes(transactionMessage),
        //tag: iota.utils.toTrytes(tag)
        tag: calculateTag(lat,lon)
      }
    ];

    var result = [];
    iota.api.sendTransfer(vehicleAddress, 3, 9, transfers, (error, success) => {
      if (error) {
        console.log(error);
        result.push({
          'origin': '',
          'time': '',
          'id_sender': '',
          'message': 'Error ocurred: ' + error
        });
      } else {
        console.log(success);
        result.push({
          'origin': success[0].address,
          'time': success[0].timestamp,
          'id_sender': success[0].address,
          'message': success[0].signatureMessageFragment
        });
        res.json(result);
      }

    });
}
