'use strict';

$(function() {
  $(window).load(function() {
    var web3;
    var web3Provider;
    // create web3Provider
  
    // if (typeof web3 !== 'undefined'){
    //   web3Provider = web3.currentProvider;
    //   window.ethereum.enable();
    //   web3 = new Web3(web3Provider);
    // }else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    web3 = new Web3(web3Provider)
    // }


    // ------------- Sangil's Part -------------------
    // $("#test").click(function(){
    //   alert("test");
    //    App.contracts.Donation.deployed().then(function (instance) {
    //     donationInstance = instance;
    //     return donationInstance.donate("0xEb3909f904D19E2ad7D0A7EB11284C333A9C0061", {from: App.account, value: web3.toWei(10, 'ether')});
    //   }).then(data => console.log(data))
    // })
    // --------------------------------------------------

    // setting function when click button(id=new)
    $("#new").click(function(){
      // get all accounts and print

      web3.eth.getAccounts(function(err, accounts){
        console.log(accounts);
      });

      // create new Account and print all accounts
      // check the console on the broswer F12
      web3.personal.newAccount('p', (err, createdAddress) => {
        console.log(createdAddress)

        let accounts = web3.eth.accounts
        console.log(accounts)
      });
    });

  });
});
