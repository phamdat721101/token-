pragma solidity ^0.4.10;
contract Token{
	uint totalSupply=5000;
   //create the method to provide PQD token
   mapping(address => uint) balanceOf;
   function PQD() public{
        balanceOf[msg.sender]=totalSupply;
   }
   //create the event to show the data of transaction
   event trade(address from, address to, uint amount);
   //create the method to buy PQD token
   function buyPQD(address owner, uint amount) public{
       require(balanceOf[msg.sender]>amount);
       balanceOf[msg.sender]-=amount;
       balanceOf[owner]+=amount;
       trade(msg.sender,owner,amount);
   }
   //create the method to get balance of the account
   function getWallet(address owner) public constant returns(uint){
       return balanceOf[owner];
   }
   //create the method to trade between to account
   function exchange(address seller, address buyer, uint amount) public{
       require(balanceOf[seller]>amount);
       balanceOf[seller]-=amount;
       balanceOf[buyer]+=amount;
       trade(seller,buyer,amount);
   }
    
}