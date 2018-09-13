/*infura token*/
var infuraToken = 'RkeQNk1tmz2SlNBIFu2X';
/*network name*/
var network_name = "mainnet";
/*metamask activated*/
var Metamask = false;
/*network type mainnet=1; rinkeby=4 kovan=42*/
var _netWork = '1';
var i = 0;
var balance = 0;
var addressFaltantes = [];

/*beginning*/
$(document).ready(function(){

  getAbi(function(abi){

    var abi = abi.abi;

    getContractAddress(function(contractAddress){

      var contractAddress = contractAddress.contractAddress;

      console.log("abi:",abi);

      console.log("contractAddress:",contractAddress);

      console.log("Hello world Dividens")

      if (typeof web3 !== 'undefined') { 
        

        console.log('Using Metamask')
        
        var web3 = new Web3(web3.currentProvider);
        
        Metamask = true;

      } else {
        
        Metamask = false;
        
        var web3 = new Web3(new Web3.providers.HttpProvider("https://"+network_name+".infura.io/"+infuraToken)); 
      }

      contract = web3.eth.contract(abi).at(contractAddress);

      console.log('Contract balance:',web3.eth.getBalance(contractAddress).toNumber()/1000000000000000000+" eth");
      balance=web3.eth.getBalance(contractAddress).toNumber()/1000000000000000000;

      web3.version.getNetwork(function(err,result){ 
        
        if (err) {
          alert('Error getting type:',err);
        }else{
          console.log("Network type:",result)
        }
        
        _netWork = result;
        if (_netWork == 1) {
          $('.Contract_activity_btn').attr('href','https://etherscan.io/address/'+contractAddress)
        }
        if (_netWork == 4) {
          $('.Contract_activity_btn').attr('href','https://rinkeby.etherscan.io/address/'+contractAddress)
        }
        if (_netWork == 42) {
          $('.Contract_activity_btn').attr('href','https://kovan.etherscan.io/address/'+contractAddress)
        }
        getAddress(function(address){

          var address = address;

          console.log('address:',address.length);

          $(".flushEthers").click(function(){
          
              $.ajax({
                url:'/flush/'+_netWork,
                success:function(r){
                  if (r.error) {
                    alert(r.error)
                  }else{
                    alert("TxAddress:\n"+r.result);
                  }
                }
              })
          })
      
          $("#begin").click(function(){
            var myVar = setInterval(function(){
              if (address[i]) {
                value = address[i];
                contract.balances(value.address,function(error,result){
                  if (web3.toWei(result) == 0) {
                    addressFaltantes.push(value);
                    console.log('enviara a:',value.address);
                    hacerTransaccion(value.address,_netWork);
                    console.log('Llamo a la funcion sign',new Date());
                    
                  }else{
                    console.log('Address:',value.address,' -> '+web3.toWei(result)/1000000000000000000);

                  }
                  
                }) 
                i++;             
              }else{
                clearInterval(myVar);
                $("#begin").click();
              }
   
            },8000);            
          })

       
         
        })

      })

    })

  })


})