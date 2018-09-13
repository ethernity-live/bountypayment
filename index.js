// server.js
// load the things we need
var express = require('express');
var app = express();
app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/serialize/:to/:netWork', function(req, res) {
	var to = req.params.to;
	var netWork = req.params.netWork;
	// var gasResult = req.params.gasResult;
	var abi = require('./abi.js')();
	var contractAddress = require('./contractAddress')();

	var myPrivateKey = require('./myPrivateKey')();
	var myAddress = require('./myAddress')();

	require('./sign')(abi,contractAddress,myAddress,to,myPrivateKey,netWork,function(err,result){
		res.status(200).json({error:err,result:result});
	});
});

app.get('/flush/:netWork',function(req,res){
	// var to = req.params.to;
	// var amount = req.params.amount;
	var netWork = req.params.netWork;
	// var gasResult = req.params.gasResult;
	var abi = require('./abi.js')();
	var contractAddress = require('./contractAddress')();

	var myPrivateKey = require('./myPrivateKey')();
	var myAddress = require('./myAddress')();

	require('./sign')(abi,contractAddress,myAddress,'',myPrivateKey,'',netWork,function(err,result){
		res.status(200).json({error:err,result:result});
	});
})

app.get('/getAbi',function(req,res){
	var abi = require('./abi.js')();
	res.status(200).json({
		abi:abi
	})
})

app.get('/getContractAddress',function(req,res){
	var contractAddress = require('./contractAddress')();
	res.status(200).json({
		contractAddress:contractAddress
	})
})

app.get('/getAddress',function(req,res){
	var Address = require('./secondBountyList')();
	res.status(200).json({
		address:Address
	})
})

var port = 8080;

app.listen(port);

console.log('======================================================================');
console.log('======================================================================');
console.log('==============SERVER IS RUNNING IN PORT:'+port+'===========================');
console.log('======================================================================');
console.log('======================================================================');

