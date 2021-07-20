// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Donation {
    struct Fundraiser {
        address fundraiser_account;
        uint target_amount;
        address beneficiary_account;
    }

    Fundraiser[] public fundraisers;

    function donate(uint amount, address fundraiser_account, string password) public {

    }

    function send_amount_when_not_acchieved(address fundraiser_account, uint now_fundaiser) public {

    }
    
    function create_fundraiser(address fundraiser_account, address beneficiary_account,uint target_amount)public {
        
    }
}