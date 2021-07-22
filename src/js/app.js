'use strict';
let App = {
    web3Provider: null,
    contracts: {},
    account: null,
}

$(function() {
  $(window).load(function() {
    // create web3Provider
  
    // if (typeof web3 !== 'undefined'){
    //   web3Provider = web3.currentProvider;
    //   window.ethereum.enable();
    //   web3 = new Web3(web3Provider);
    // }else {
    App.web3Provider = new Web3.providers.WebsocketProvider('ws://localhost:7545'); // Create Web3 Instance
    web3 = new Web3(App.web3Provider)
    // }


    // ### Assign the Donator Account Setting ###
    web3.eth.getAccounts().then(async accounts => {
      for(var i = 0; i < 4; i++){
        // console.log(web3.eth.getBalance(accounts[i]).PromiseResult)
        // var balanceEther = web3.utils.fromWei(web3.eth.getBalance(accounts[i]), "ether");
        let balance = await web3.eth.getBalance(accounts[i]);
        let balanceEther = Math.ceil(web3.utils.fromWei(balance));
        console.log(Math.ceil(balanceEther))
        $("#assign-account").append(`<li><a name="${accounts[i]}" class="set-account" href="#">${accounts[i].substring(2, 10)} : ${balanceEther} ETH</a></li>`);
      }
      App.account = accounts[0];
      $('#my-account').text(`My Account ${App.account.substring(2,10)}`);
      $("#account").text(`My Account: ${App.account.substring(2,10)}`);
      
      $(".set-account").click(function(event){
        // alert("123");
        // console.log(event.target.text)
        App.account = event.target.name;
        $("#my-account").text(`My Account ${App.account.substring(0,10)}`)
        $("#account").text(`My Account: ${App.account.substring(0,10)}`)
        return false
      })
    });


    // Create Contract Instance
    $.getJSON("Donation.json", function(data){
      // change to contract address (Donation)
      const address = '0x0bBECE91a18CE116f1C5E2D8885062a8E0D80b5c'; // sangil contract address
      console.log(data.abi)
      App.contracts.Donation = new web3.eth.Contract(data.abi, address);

      showTxHistory();
    });
    

    // Test Contract Instance
    // Function showFundraiser
    // Check console log in F12
    $("#testContract").click(()=>{
      App.contracts.Donation.methods.showFundraiser(0).call().then(result => console.log(result));
    });

    // ### Show the Transaction Infos
    let showTxHistory = function() {
      
      // get Transactions
      App.contracts.Donation.getPastEvents('DonationEvent', {
        // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
        toBlock: 'latest'
      }, function(error, events){ 
        console.log(events); 
        let index = 0;
        $("#tx-infos").text('');
        var carousel = $(".owl-carousel");
        carousel.trigger('destroy.owl.carousel'); 
        carousel.find('.owl-stage-outer').children().unwrap();
        carousel.removeClass("owl-center owl-loaded owl-text-select-on");
        for(var i = events.length - 1 ; i >= 0 && i > events.length - 10; i--){
          index = 1;
          console.log(events[i].returnValues)
          let txInfos = events[i].returnValues;
        //   trigger('add.owl.carousel', ['<div class="item"><img src="http://placehold.it/140x100" alt=""></div>'])
        // .trigger('refresh.owl.carousel');
          $(".owl-carousel").append(`<div class="item">
              <div class='card card${index}'>
                  <div class="price">
                      <h6>$${web3.utils.fromWei(txInfos.amount)}</h6>
                  </div>
                  <div class='info'>
                      <h1 class='title'>fundraiser: ${txInfos.fundraiser.substring(0, 5)}</h1>
                      <p class='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedii do eiusmod teme.
                      </p>
                      <div class="main-text-button">
                          <div class="scroll-to-section"><a href="#reservation">Make Reservation <i class="fa fa-angle-down"></i></a></div>
                      </div>
                  </div>
              </div>
          </div>`);
        }
        carousel.owlCarousel();
          // index += 1;
      });
    }

    // ### Donate Fundtion Call###
    $(".do-donation").click(function(){
      let amount_ether = prompt("how much would you donate?");
      let amount = web3.utils.toWei('' + amount_ether);
      console.log(amount);
      let id = this.id;
      console.log(id);
      let fundraiserAccount = document.getElementById(`${id}-fundraiser`).innerHTML;
      console.log(fundraiserAccount)
      App.contracts.Donation.methods.donate(fundraiserAccount, amount).send({from: App.account, gasPrice: "20000000000", gas: "210000",})
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
          }, 'password').then((result) => {
            console.log(result)
          }); 
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
        showTxHistory();
        });
      });
    });


    // setting function when click button(id=new)
    // ### Create Fundraiser Function Call!! (form tag) ###
    $("#submit-fundraiser").click(function(event) {
        event.preventDefault();
        // get all accounts and print
        
          // Need to Accept the information of Fudraiser
          // create new Account and print all accounts
          // check the console on the broswer F12
          web3.eth.personal.newAccount('p', (err, createdAddress) => {
            console.log(createdAddress)
            let amounts = web3.utils.toWei($("#target-amount").val())
            App.contracts.Donation.methods.createFundraiser(createdAddress, "0x809A846e00371024A8b82531eC25c99b60Bb11d9",amounts)
            .send({from: App.account, gasPrice: "20000000000", gas: "200000"}).then(result => console.log(result));
            
          });
          // create fundraiser
          // App.contracts.Donation.methods
          // start duration of fundraiser

          // App.contracts.Donation.methods.updateTimestamp().call().then(result => console.log(result));
          return false;
      });
      

    //  ###Test Function, now=> get Past Events###
    $("#test").click(function(){
    //   App.contracts.Donation.getPastEvents('DonationEvent', {
    //     // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    //     fromBlock: 0,
    //     toBlock: 'latest'
    // }, function(error, events){ console.log(events); })
    // .then(function(events){
    //     console.log(events) // same results as the optional callback above
    // });
      showTxHistory();
    })
    

    // ###Function Call When Season Passed###
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