var myWallet=artifacts.require("./token.sol");
module.exports=function(deployer){
	deployer.deploy(myWallet);
};