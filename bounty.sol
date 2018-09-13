pragma solidity ^0.4.15;

contract EthernityFinancialOracle{
    event Request (string _coin , string _againstCoin , address _address);
    function requestEtherInUSD();
}

contract BountyCampaign{
    
    address public deployer;
    uint public ethRate;
    uint public dolarsToSend;
    address public oracle_address;
    
    mapping(address => uint) public balances;
    
    modifier onlyDeployer{
        require(deployer == msg.sender);
        _;
    }
    function () payable{
        
    }
    function BountyCampaign() payable {
        ethRate = 81871;
        dolarsToSend  = 2;
        deployer = msg.sender;
    }

    function setDolarToSend(uint _qty){
        dolarsToSend = _qty;
    }
    
    function balanceOf(address _user) public constant returns(uint){
        return balances[_user];
    }
    
    function sendEtherTo(address _user) onlyDeployer {
        require(balances[_user] == 0);
        /*
        1th -> ethRate
        x <- dolarsToSend;
        */
        
        balances[_user] = (dolarsToSend * 1 ether) / ethRate;
        balances[_user] = balances[_user] * 100; //decimal from ethRate 2 decimals
        _user.transfer(balances[_user]);
        
    }
    function getNewRate(){
        oracle_address = 0x8A9Aae0421FC48B40b4563586991e2116554c4c9;
        EthernityFinancialOracle oracle = EthernityFinancialOracle(oracle_address);
        oracle.requestEtherInUSD();
    }
    function stringToUint(string s) constant returns (uint result) {
        bytes memory b = bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint c = uint(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
        return result;
    }
    function callback(string _result){
        ethRate = stringToUint(_result);
    }
    function flushEthers() onlyDeployer public {
        deployer.transfer(this.balance);
    }
    function setEthRate(string _rate){
        ethRate = stringToUint(_rate);
    }
}