'use strict';
let App = {
    web3Provider: null,
    contracts: {},
    account: null,
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
    // Assign the Donator Account
    web3.eth.getAccounts().then(async accounts => {
      for(var i = 0; i < 4; i++){
        // console.log(web3.eth.getBalance(accounts[i]).PromiseResult)
        // var balanceEther = web3.utils.fromWei(web3.eth.getBalance(accounts[i]), "ether");
        let balance = await web3.eth.getBalance(accounts[i]);
        let balanceEther = Math.ceil(web3.utils.fromWei(balance));
        console.log(Math.ceil(balanceEther))
        $("#assign-account").append(`<li><a class="set-account" href="#">${accounts[i].substring(2, 10)} : ${balanceEther} ETH</a></li>`);
      }
      App.account = accounts[0];
      $('#my-account').text(`My Account ${App.account.substring(2,10)}`);
      $("#account").text(`My Account: ${App.account.substring(2,10)}`);
      
      $(".set-account").click(function(event){
        // alert("123");
        // console.log(event.target.text)
        App.account = event.target.text.split(":")[0];
        $("#my-account").text(`My Account ${App.account.substring(0,10)}`)
        $("#account").text(`My Account: ${App.account.substring(0,10)}`)
        return false
      })
    });

    $.getJSON("Donation.json", function(data){
      // change to contract address (Donation)
      const address = '0x22369567E3Ef06FeFe9567bBc6ee7F96A81b8698'; 
      console.log(data.abi)
      App.contracts.Donation = new web3.eth.Contract(data.abi, address);
    });
    
    // Test Contract Instance
    // Function showFundraiser
    // Check console log in F12
    $("#testContract").click(()=>{
      App.contracts.Donation.methods.showFundraiser(1).call().then(result => console.log(result));
    });

    // ------------- Sangil's Part -------------------
    $(".do-donation").click(function(){
      let amount_ether = prompt("how much would you donate?");
      let amount = web3.utils.toWei('' + amount_ether);
      console.log(amount);
      let id = this.id;
      console.log(id);
      let fundraiserAccount = document.getElementById(`${id}-fundraiser`).innerHTML;
      console.log(fundraiserAccount)
      App.contracts.Donation.methods.donate(fundraiserAccount, amount).call()
      .then(data => {
        console.log(data);
        if (data == 2){
          // transaction to fundraiser
          web3.eth.sendTransaction({
            from: App.account, // change to sender
            gasPrice: "20000000000",
            gas: "21000",
            to: fundraiserAccount, // change to fundraiser account
            value: amount,
            data: ""
          }, 'password').then(tx_info =>{
            console.log(tx_info);
            // transaction to beneficiary all balance in fundraiser
            web3.eth.sendTransaction({
              from: fundraiserAccount, // change to fundraiser
              gasPrice: "20000000000",
              gas: "21000",
              to: '0x2C46aDBA9eA6948DfC6e2bb0fAc987E45E5410c1', // change to beneficiary account
              value: amount - (20000000000 * 21000),
              data: ""
            }, 'password').then(console.log);
            alert("Thank you for your Donation!, This Funding Has Done!");
          });
        }else if(data == 1){
          web3.eth.sendTransaction({
            from: App.account, // change to sender
            gasPrice: "20000000000",
            gas: "21000",
            to: fundraiserAccount, // change to fundraiser account
            value: amount,
            data: ""
          }, 'password').then(console.log); 
          alert("Thank you for your Donation!");
        }else if(data == 0){
          // transaction error
          alert("error: please donate smaller amount");
        }
        web3.eth.getAccounts().then(async accounts => {
          $("#assign-account").text('')
          for(var i = 0; i < 4; i++){
            // console.log(web3.eth.getBalance(accounts[i]).PromiseResult)
            // var balanceEther = web3.utils.fromWei(web3.eth.getBalance(accounts[i]), "ether");
            let balance = await web3.eth.getBalance(accounts[i]);
            let balanceEther = Math.ceil(web3.utils.fromWei(balance));
            console.log(Math.ceil(balanceEther))
            
            $("#assign-account").append(`<li><a class="set-account" href="#">${accounts[i].substring(2, 10)} : ${balanceEther} ETH</a></li>`);
          }
        });
      });
    });
    // --------------------------------------------------
    // setting function when click button(id=new)
    $("#submit-fundraiser").click(function(event) {
        event.preventDefault();
        // get all accounts and print
        
        // web3.eth.getAccounts(function(err, accounts) {
          //     console.log(accounts);
          // });
          // Need to Accept the information of Fudraiser
          // create new Account and print all accounts
          // check the console on the broswer F12
          web3.eth.personal.newAccount('p', (err, createdAddress) => {
            console.log(createdAddress)
            
            let accounts = web3.eth.accounts
            console.log(accounts)
            App.contracts.Donation.methods.createFundraiser("0x809A846e00371024A8b82531eC25c99b60Bb11d9", "0x809A846e00371024A8b82531eC25c99b60Bb11d9", 123).call().then(result => console.log(result));
          });
          // create fundraiser
          // App.contracts.Donation.methods
          // start duration of fundraiser

          App.contracts.Donation.methods.updateTimestamp().call().then(result => console.log(result));
      });
    $("#season-pass").click(function(){
      App.contracts.Donation.methods.monthHavePassed().call()
      .then(passed => {
        if (passed){
          // due over
          // send the amount of current funds
          web3.eth.sendTransaction({
            from: "0xEb3909f904D19E2ad7D0A7EB11284C333A9C0061", // change to fudnraiser
            gasPrice: "20000000000",
            gas: "21000",
            to: '0x42AE8ac9A9d74272Fef45f793193E92B4CFaca6A', // change to beneficiary account
            value: amount,
            data: ""
          }, 'password').then(console.log);
          // done or revise.. make deceision!$$
        }
      })
    })
  });
});