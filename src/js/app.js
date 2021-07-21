'use strict';
let App = {
  web3Provider: null,
  contracts: {},
}

$(function() {
  $(window).load(function() {
    var donation;
    // create web3Provider
  
    // if (typeof web3 !== 'undefined'){
    //   web3Provider = web3.currentProvider;
    //   window.ethereum.enable();
    //   web3 = new Web3(web3Provider);
    // }else {
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    web3 = new Web3(App.web3Provider)
    // }
    // const abi = require('Donation.json').abi; \
    $.getJSON("Donation.json", function(data){
      const address = '0x22369567E3Ef06FeFe9567bBc6ee7F96A81b8698'; 
      console.log(data.abi)
      App.contracts.Donation = new web3.eth.Contract(data.abi, address);
    });
    
    // Test Contract Instance
    // Function showFundraiser
    // Check console log in F12
    $("#testContract").click(()=>{
      // console.log(App.contracts.Donation);
      App.contracts.Donation.methods.showFundraiser(0).call().then(result => console.log(result));
      // console.log(web3.eth.accounts);
    });
    
    // var donation = web3.eth.Contract("Donation.json", '0x6bc1aEA651BcaD6533BB73c433b3985c5318A707');
    // ------------- Sangil's Part -------------------
    $("#test").click(function(){
      alert("test");
      //  App.contracts.Donation.deployed().then(function (instance) {
      //   donationInstance = instance;
      //   return donationInstance.donate("0xEb3909f904D19E2ad7D0A7EB11284C333A9C0061", 10,  {from: App.account});
      let amount = web3.utils.toWei("5");
      console.log(amount);
      App.contracts.Donation.methods.donate("0x42AE8ac9A9d74272Fef45f793193E92B4CFaca6A", amount).call()
      .then(data => {
        console.log(data);
        if (data == 2){
          // transaction to fundraiser
          web3.eth.sendTransaction({
            from: "0xEb3909f904D19E2ad7D0A7EB11284C333A9C0061", // change to sender
            gasPrice: "20000000000",
            gas: "21000",
            to: '0x42AE8ac9A9d74272Fef45f793193E92B4CFaca6A', // change to fundraiser account
            value: amount,
            data: ""
          }, 'password').then(tx_info =>{
            console.log(tx_info);
            // transaction to beneficiary all balance in fundraiser
            // web3.eth.sendTransaction({
            //   from: "0xEb3909f904D19E2ad7D0A7EB11284C333A9C0061", // change to fundraiser
            //   gasPrice: "20000000000",
            //   gas: "21000",
            //   to: '0x42AE8ac9A9d74272Fef45f793193E92B4CFaca6A', // change to beneficiary account
            //   value: amount,
            //   data: ""
            // }, 'password').then(console.log);
          });
        }else if(data == 1){
          web3.eth.sendTransaction({
            from: "0xEb3909f904D19E2ad7D0A7EB11284C333A9C0061", // change to sender
            gasPrice: "20000000000",
            gas: "21000",
            to: '0x42AE8ac9A9d74272Fef45f793193E92B4CFaca6A', // change to fundraiser account
            value: amount,
            data: ""
          }, 'password').then(console.log);
        }else if(data == 0){
          // transaction error
          alert("error: please donate smaller amount");
        }
      });
    });
    // --------------------------------------------------

    // setting function when click button(id=new)
    $("#new").click(function(){
      // get all accounts and print

      web3.eth.getAccounts(function(err, accounts){
        console.log(accounts);
      });

      // create new Account and print all accounts
      // check the console on the broswer F12
      web3.eth.personal.newAccount('p', (err, createdAddress) => {
        console.log(createdAddress)

        let accounts = web3.eth.accounts;
        console.log(accounts)
      });
    });

  });
});
