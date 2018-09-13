var fs = require('fs');
module.exports=function(abi,contractAddress,addressFrom,to,privKey,netWork,cb){
	const Web3 = require('web3')
	const Tx = require('ethereumjs-tx')

	// connect to Infura node
	if (netWork == 4) {
		var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/RkeQNk1tmz2SlNBIFu2X'))
	}
	if (netWork == 42) {
		var web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/RkeQNk1tmz2SlNBIFu2X'))
	}
	if (netWork == 1) {
		var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/RkeQNk1tmz2SlNBIFu2X'));
		// console.log('web3',web3);
	}

	var block = web3.eth.getBlock("latest");

	var coder = require('web3/lib/solidity/coder');

	var CryptoJS = require('crypto-js');


	// Signs the given transaction data and sends it. Abstracts some of the details 
	// of buffering and serializing the transaction for web3.
	function sendSigned(txData, cb) {
	  const privateKey = new Buffer(privKey, 'hex')
	  const transaction = new Tx(txData)
	  transaction.sign(privateKey)
	  const serializedTx = transaction.serialize().toString('hex');
	  web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
	}
	
	if (to == '' && amount == '') {
		var data = '0x' + encodeFunctionTxData('flushEthers', [], [])

	}else{

		var data = '0x' + encodeFunctionTxData('sendEtherTo', ['address'], [to])
	}
	// get the number of transactions sent so far so we can create a fresh nonce
	web3.eth.getTransactionCount(addressFrom).then(txCount => {
		// console.log('txCount',txCount)
	  // construct the transaction data
	  if (netWork == 4) {
	  	contractAddress = require('./contractAddress')();
	  	console.log('netWork',netWork);
	  }
	  if (netWork == 42) {
	  	contractAddress = require('./contractAddress')();
	  	console.log('netWork',netWork);

	  }
	  if (netWork == 1) {
	  	contractAddress = require('./contractAddress')();
	  	console.log('netWork',netWork);

	  }
	  const txData = {
	    nonce: (txCount),
	    gasLimit: (120000),
	    gasPrice: (21e9), // 21 Gwei
	    to:contractAddress ,
	    from: addressFrom,
	    data:data,
	    value: (0)
	  }

	  // fire away!
	  sendSigned(txData, function(err, result) {
	  	console.log("Enviaron una transaction para : ",{address:to}, "fecha: ",new Date(),"\n");
	  	console.log('Data de la ultima transaction:',txData)
	  	console.log('\n');
	  	if (err) {
	  		data = "Error "+new Date()+" : "+err+"\n";
	  	}else{
	  		data = "txAdress "+new Date()+" : "+result+"\n";
	  	}
	  	fs.appendFile('log.txt', data, function (err) {
		  if (err) throw err;
		  	// console.log('Saved!');
	    	//cb(err,result)
		  	data2 = "Enviaron una transaction para: "+to+" con fecha: "+(new Date())+"\n";

		  	fs.appendFile('transaccionesLog.txt', data2, function (err) {
			  if (err) throw err;
			  	// console.log('Saved!');
		    	cb(err,result)
			});
		});



	  })

	})
	function encodeFunctionTxData(functionName, types, args) {
	  var fullName = functionName + '(' + types.join() + ')';
	  var signature = CryptoJS.SHA3(fullName, { outputLength: 256 }).toString(CryptoJS.enc.Hex).slice(0, 8);
	  var dataHex = signature + coder.encodeParams(types, args);
	  return dataHex;
	}
}