// Require the use of IOTA library
const IOTA = require("iota.lib.js")
// Create a new instance of the IOTA class object.
// Use 'provider' variable to specify which Full Node to talk to
const iota = new IOTA({provider: "https://nodes.testnet.iota.org:443"})

//var searchValues = {'tags': ['MESHUP']};
var searchValues = {'tags': ['YAUASAABWARAABYASAUAVA99999']};


iota.api.findTransactionObjects( searchValues, function( error, txObjects ) {

  if(!error) {
    //if(outputLoc != null) {
      let msg = '<div class="container">';
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
      console.log(msg)
    }
//    resolve(txObjects);
  } else {
    reject(error);
  }
});
