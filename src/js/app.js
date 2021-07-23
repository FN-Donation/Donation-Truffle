'use strict';
let App = {
    web3Provider: null,
    contracts: {},
    account: null,
    fundraiser: {"account1":{
        "fundName":"혼자 하늘이를 돌보는 아픈 엄마, 내일 굶을까 걱정입니다.",
        "description":"태어나기 전부터 폭력에 시달렸던 하늘이, 그리고 엄마 하늘이가 엄마 배 속에 있을 때부터 아빠의 폭력은 시작되었습니다. 폭언과 폭력이 일상이 될 쯤 하늘이가 세상에 태어났습니다. 갓난아기와 함께 지내는 일은 깜짝 놀랄 만큼 신비하지만 그만큼 힘이 듭니다. 그 낯선 어려움에 하늘이 아빠는 더 심한 폭력으로 하늘이 엄마에게 스트레스를 풀었습니다. 출산 후 제대로 된 몸조리도 할 수 없었던 엄마는 홀로 하늘이를 돌보며 아빠의 폭력에 어떤 대응도 하지 못했습니다. 하늘이가 두 살이 될 즈음 하늘이 엄마는 병원에서 입원권유를 받을 지경까지 몸이 상태가 악화되었습니다. 지속적인 폭력으로 몸이 망가져 있는 것은 물론이고 우울증과 공황장애로 정상적인 생활이 불가능했기 때문입니다.",
        "organizationEmail":"푸드스마일즈 우양",
        "date":"2021.08.31",
        "category":"Children",
        "image" : "images/daeyoung-1.jpg"
    },
    "account2":{
        "fundName":"피오줌을 누는 젤리, 털이 숭숭 빠진 만두",
        "description":"보호소에서 지내며 병에 걸린 동물들. 최근 카라는 ‘달봉이네 보호소’에서 15마리의 개를 구조했습니다. 이중 중 10마리는 심장사상충 진단을 받았습니다. 심장사상충은 치료가 어렵고 시간과 비용이 많이 들며 색전증이나 폐렴 같은 합병증으로 이어져 사망에 이를 수도 있는 아주 위험한 중증 질환입니다. 심장사상충 진단을 받은 젤리는 혈뇨를 누는 등 상태가 매우 좋지 못하고, 젤리와 동일한 심장사상충 진단을 받은 위고, 하니, 데니스, 델리, 모네, 뽀양, 철수, 뽀리, 뽀은 전처치약을 처방받고 치료 계획에 따라 치료할 예정입니다.",
        "organizationEmail":"",
        "date":"2021.07.31",
        "category":"Animal",
        "image" : "images/daeyoung-2.jpg"
    },
    "account3":{
        "fundName":"해양쓰레기로부터 바다를 구하는 방법!",
        "description":"플라스틱 위험에 빠진 도심과 바다. 도심에서 주로 발견되는 쓰레기는 무엇이라고 생각하시나요? 바로 담배꽁초와 플라스틱 쓰레기입니다. 요즘과 같이 방역을 이유로 배달 용기, 플라스틱 컵과 같은 플라스틱류 쓰레기가 많이 발견되는데요. 바다에서 발견되는 쓰레기도 이와 다르지 않다는 것 알고 계시나요? 영국 가디언지에 따르면 바다에서 발견되는 쓰레기의 80% 이상이 플라스틱, 그중 음식 포장 용기가 큰 비중을 차지한다고 발표하였습니다. 우리의 편한 일상에 짧은 순간 사용되는 플라스틱 일회용품들이 바다에 쌓여 몇 십 년, 몇 백 년을 표류해야 하다니 놀라운 사실이죠.",
        "organizationEmail":"환경재단",
        "date":"2021.12.12",
        "category":"Nature",
        "image" : "images/daeyoung-3.jpg"
    }
  },
  number: 0
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
      $('#my-account').text(`My Account ${App.account}`);
      $("#account").text(`My Account: ${App.account.substring(2,10)}`);
      
      // ### Setting Current Account
      $(".set-account").click(function(event){
        // alert("123");
        // console.log(event.target.text)
        App.account = event.target.name;
        $("#my-account").text(`My Account ${App.account}`)
        $("#account").text(`My Account: ${App.account.substring(0,10)}`)
        return false;
      })
    });


    // Create Contract Instance
    $.getJSON("Donation.json", function(data){
      // change to contract address (Donation)
      const address = '0x51358a85b25C8a5Ac49bB07586316928907Da17e'; // sangil contract address
      console.log(data.abi)
      App.contracts.Donation = new web3.eth.Contract(data.abi, address);

      showTxHistory();
    });
    

    // Test Contract Instance
    // Function showFundraiser
    // Check console log in F12
    $("#testContract").click(()=>{
      App.contracts.Donation.methods.showFundraiser(2).call().then(result => console.log(result));
    });

    // ### Show the Transaction Infos
    let showTxHistory = function() {
      
      // get Transactions
      App.contracts.Donation.getPastEvents('DonationEvent', {
        // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
        toBlock: 'latest'
      }, function(error, events){ 
        // console.log(events); 
        let index = 0;
        $("#tx-infos").text('');
        var carousel = $(".owl-carousel");
        carousel.trigger('destroy.owl.carousel'); 
        carousel.find('.owl-stage-outer').children().unwrap();
        carousel.removeClass("owl-center owl-loaded owl-text-select-on");

        for(var i = events.length - 1 ; i >= 0 && i > events.length - 10; i--){
          index = 1;
          // console.log(events[i].returnValues)
          let txInfos = events[i].returnValues;
        //   trigger('add.owl.carousel', ['<div class="item"><img src="http://placehold.it/140x100" alt=""></div>'])
        // .trigger('refresh.owl.carousel');
          let description;
          let fundName;
          let date;
          for (var j = 0; j < App.number; j++){
            if (App.fundraiser[`account${j + 1}`]['f-address'].localeCompare(txInfos.fundraiser, undefined, { sensitivity: 'accent' }) === 0 || App.fundraiser[`account${j + 1}`]['f-address'].localeCompare(txInfos.donator, undefined, { sensitivity: 'accent' }) === 0){
              description = App.fundraiser[`account${j + 1}`]['description'];
              fundName = App.fundraiser[`account${j + 1}`]['fundName'];
              date = App.fundraiser[`account${j + 1}`]['date'];
              $(".owl-carousel").append(`<div class="item">
                  <div class='card card${j + 1}'>
                      <div class="price">
                          <h6>${web3.utils.fromWei(txInfos.amount)} ETH</h6>
                      </div>
                      <div class='info'>
                          <h1 class='title'>fundraiser: ${fundName}</h1>
                          <p class='description'>${description}</p>
                          <div class="main-text-button">
                              <div class="scroll-to-section"><a>${date} <i class="fa fa-angle-down"></i></a></div>
                          </div>
                      </div>
                  </div>
              </div>`);
              break;
            }
          }
        }
        carousel.owlCarousel();
          // index += 1;
      });
    }

    // ### Donate Fundtion Call###
    let donationFunction = (n) => $(`.do-donation${n}`).click(function(e){
      // e.preventDefault();
      let amount_ether = prompt("how much would you donate?");
      if(!amount_ether) return false;

      
      let password = prompt("Please input your password")
      if(!password) return false
      else{
        // console.log(App.account);
        web3.eth.personal.unlockAccount(App.account, password, 600)
        .then(result => console.log(result))
        .catch((e) => {
          alert("Wrong Password");
          return false;
        });
      }
      let id = this.id;
      // console.log(id);
      
      let fundraiserAccount = document.getElementById(`${id}-fundraiser`).innerHTML;
      // console.log(fundraiserAccount)
      // console.log(amount_ether)
      let amount = web3.utils.toWei('' + amount_ether);
      // console.log(amount);


      let resetting = function(){
        showTxHistory();

        web3.eth.getAccounts().then(async accounts => {
          $("#assign-account").text('')
          for(var i = 0; i < 4; i++){
            // console.log(web3.eth.getBalance(accounts[i]).PromiseResult)
            // var balanceEther = web3.utils.fromWei(web3.eth.getBalance(accounts[i]), "ether");
            let balance = await web3.eth.getBalance(accounts[i]);
            let balanceEther = Math.ceil(web3.utils.fromWei(balance));
            console.log(Math.ceil(balanceEther))
            
            $("#assign-account").append(`<li><a name="${accounts[i]}" class="set-account" href="#">${accounts[i].substring(2, 10)} : ${balanceEther} ETH</a></li>`);
          }
              // ### Setting Current Account
          $(".set-account").click(function(event){
            // alert("123");
            // console.log(event.target.text)
            App.account = event.target.name;
            $("#my-account").text(`My Account ${App.account}`)
            $("#account").text(`My Account: ${App.account.substring(0,10)}`)
            return false;
          })
        });
      }
      App.contracts.Donation.methods.donate(fundraiserAccount, amount).send({from: App.account, gasPrice: "20000000000", gas: "210000",})
      .then(result => {
        console.log(result);
        let flag = result.events.ActionEvent.returnValues.action;
        console.log(flag);
        if (flag == 2){
          // transaction to fundraiser
          web3.eth.sendTransaction({
            from: App.account, // change to sender
            gasPrice: "20000000000",
            gas: "21000",
            to: fundraiserAccount, // change to fundraiser account
            value: amount,
            data: ""
          }, password).then(tx_info =>{
            console.log(tx_info);
            // transaction to beneficiary all balance in fundraiser
            web3.eth.personal.unlockAccount(fundraiserAccount, "p", 600).then(async result => {
              console.log(result);
              let target = await App.contracts.Donation.methods.showFundraiser(id-1).call();
              console.log(target);
              web3.eth.sendTransaction({
                from: fundraiserAccount, // change to fundraiser
                gasPrice: "20000000000",
                gas: "21000",
                to: '0x786975aF91F8d92D9810139Fab535b84cB1F3161', // change to beneficiary account
                value: target[1] - (20000000000 * 21000),
                data: ""
              }, 'p').then((d) => {
                console.log(d);
                alert("Thank you for your Donation!, This Funding Has Done!")
                resetting();
              });
            });
          });
        }else if(flag == 1){
          web3.eth.sendTransaction({
            from: App.account, // change to sender
            gasPrice: "20000000000",
            gas: "21000",
            to: fundraiserAccount, // change to fundraiser account
            value: amount,
            data: ""
          }, password).then((result) => {
            console.log(result)
            alert("Thank you for your Donation!");
            resetting();
          }).catch(e => console.log(e)); 
        }else if(flag == 0){
          // transaction error
          alert("error: please donate smaller amount");
        }
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
            App.contracts.Donation.methods.createFundraiser(createdAddress, "0x786975aF91F8d92D9810139Fab535b84cB1F3161",amounts)
            .send({from: App.account, gasPrice: "20000000000", gas: "200000"}).then(result => console.log(result));
            App.number += 1;
            console.log(App.fundraiser[`account${App.number}`]);
            $("#fundraisers-card").append(
            `<div class="col-lg-4">
                    <div class="fundraiser-item">
                        <div class="thumb">
                            <div class="overlay"></div>
                            <ul class="social-icons">
                                <li><a id="${App.number}" class="do-donation${App.number}" href="#menu"><i class="fa fa-heart"></i></a></li>
                            </ul>
                            <img src="images/daeyoung-${App.number}.jpg" alt="fundraiser #1">
                        </div>
                        <div class="down-content">
                            <h4>${App.fundraiser[`account${App.number}`]["fundName"]}</h4>
                            <span>${App.fundraiser[`account${App.number}`]["category"]}</span>
                            <span id="${App.number}-fundraiser" hidden>${createdAddress}</span>
                        </div>
                    </div>
                </div> `);
              App.fundraiser[`account${App.number}`]["f-address"] = createdAddress;
              donationFunction(App.number);
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
            to: '0x786975aF91F8d92D9810139Fab535b84cB1F3161', // change to beneficiary account
            value: amount,
            data: ""
          }, 'password').then(console.log);
          // done or revise.. make deceision!$$
        }
      })
    })

    // ### Function for searching
    $("#button-addon2").click(function (event) {
      event.preventDefault();

      const eoa = $("input[name='EOA']").val();
      // console.log(eoa);
      if (eoa.length != 42){
        alert("Incorrect Account! (should add 0x at the head of the account)");
        return false;
      }
      App.contracts.Donation.getPastEvents('DonationEvent', {
          // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
          fromBlock: 0,
          toBlock: 'latest'
        }, function(error, events){ 
          // console.log(events);
          $("#search-result").text('');
          events.forEach(event => {
            // console.log(event);
            if(eoa.localeCompare(event.returnValues.donator, undefined, { sensitivity: 'accent' }) === 0){
              console.log(event.returnValues.donator);
              let infos = event.returnValues;
              let description;
              let fundName;
              let image;
              for (var j = 0; j < App.number; j++){
                if (App.fundraiser[`account${j + 1}`]['f-address'].localeCompare(infos.fundraiser, undefined, { sensitivity: 'accent' }) === 0 || App.fundraiser[`account${j + 1}`]['f-address'].localeCompare(infos.donator, undefined, { sensitivity: 'accent' }) === 0){
                  description = App.fundraiser[`account${j + 1}`]['description'];
                  fundName = App.fundraiser[`account${j + 1}`]['fundName'];
                  image = App.fundraiser[`account${j + 1}`]['image'];
                  $("#search-result")
                  .append(`<div class="col-lg-4">
                    <div class="tab-item">
                        <img src="${image}" alt="" width="100px">
                        <h4>${web3.utils.fromWei(infos.amount)} ETH</h4>
                        <p>${fundName}</p>
                        <div class="price">
                            <h6>${infos.fundraiser.substring(0, 20)}..</h6>
                        </div>
                    </div>
                  </div>`);
                  break;
              }
            }
          }
        })
      });
    });

    
  });
});