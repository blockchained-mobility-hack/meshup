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

const trytes = 'HELLOXXXXXHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD'
const message = iota.utils.toTrytes('Airbag: OMG, I just released!')

const transfers = [
  {
      value: 0,
      address: trytes,
      message: message,
      tag: 'MESHUP'
    }
]

iota.api.sendTransfer(trytes, 3, 9, transfers, (error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log(success)
  }
})
