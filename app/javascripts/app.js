// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
import "bootstrap/dist/css/bootstrap.css";
// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import myWallet_artifacts from '../../build/contracts/Token.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MyWallet = contract(myWallet_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
   MyWallet.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      //document.getElementById("address").innerHTML=accounts.join("<br>");
      App.supply();
      //App.basicInfo();
      App.listenEvent();
      
    });
  },
  basicInfo: function(){
    var user=document.getElementById("walletAddress").value;
    MyWallet.deployed().then(function(instance){
        return instance.getWallet(user);
    }).then(function(result){
        document.getElementById("PQD").innerHTML=result;
        //document.getElementById("Ether").innerHTML=web3.fromWei(web3)
    }).catch(function(err){
      console.error(err);
    })
  },
  supply: function(){
    MyWallet.deployed().then(function(instance){
      return instance.PQD({from:accounts[0]});
    }).then(function(result){
      console.log(result);
    }).catch(function(err){
      console.error(err);
    })
  },
  buyPQD:function(){
    var key=document.getElementById("key").value;
    var amount=parseInt(document.getElementById("amount").value);
    MyWallet.deployed().then(function(instance){
      return instance.buyPQD(key,amount,{from:accounts[0]});
    }).then(function(result){
      console.log(result);
    }).catch(function(err){
      console.error(err);
    })
  },
  sendEther:function(){
    var from=document.getElementById("from").value;
    var to=document.getElementById("to").value;
    var value=parseInt(document.getElementById("value").value);
    MyWallet.deployed().then(function(instance){
      return instance.exchange(from,to,value,{from:accounts[0]});
    }).then(function(result){
      console.log(result);
    }).catch(function(err){
      console.error(err);
    })
  },
  listenEvent: function(){
    MyWallet.deployed().then(function(instance){
      instance.trade().watch(function(error,event){
          document.getElementById("eventTrade").innerHTML+=JSON.stringify(event);
      })
    });
  }
  // getAddress: function(){
  //   MyWallet.deployed().then(function(instance){
  //     return instance.getAddress();
  //   }).then(function(result){
  //     document.getElementById("balance").innerHTML=result;
  //   })
  // }
 
  
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});
