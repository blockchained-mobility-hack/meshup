// Require the use of IOTA library
const IOTA = require("iota.lib.js")
// Create a new instance of the IOTA class object.
// Use 'provider' variable to specify which Full Node to talk to
const iota = new IOTA({provider: "https://nodes.testnet.iota.org:443"})


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
