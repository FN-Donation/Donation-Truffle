// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Donation {
    struct Fundraiser {
        address fundraiser_account;
        uint target_amount;
        uint current_amount;
        address beneficiary_account;
    }

    Fundraiser[] public fundraisers;

    constructor () public {
        fundraisers.push(Fundraiser(0xEb3909f904D19E2ad7D0A7EB11284C333A9C0061, 100, 0,0x8008bb9c9De470b88F99AfD0F761DEFc8bc73245));
    }
    function donate(address payable fundraiser_account) payable public returns (uint){
        // already check the price

        Fundraiser memory fundraiser;
        uint index;

        for(uint i = 0; i < fundraisers.length; i++){
            if(fundraisers[i].fundraiser_account == fundraiser_account){
                fundraiser = fundraisers[i];
                index = i;
                break;
            }
        }
        uint amount = msg.value;
        // donate
        fundraiser_account.transfer(msg.value);
        fundraiser.current_amount += amount;

        if (fundraiser.current_amount + amount >= fundraiser.target_amount){
            // done 
            // transfer all token to beneficiary
            address payable beneficiary_account = address(uint160(fundraiser.beneficiary_account));
            beneficiary_account.transfer(fundraiser.current_amount);
            // delete fundraiser from array
            fundraisers[index] = fundraisers[fundraisers.length - 1];
            delete fundraisers[fundraisers.length - 1];
            fundraisers.length--;
        } 
        uint cur = fundraiser.current_amount;
        return cur;
    }

    function send_amount_when_not_acchieved(address fundraiser_account, uint now_fundaiser) public {
 
    }
    
    function create_fundraiser(address fundraiser_account, address beneficiary_account,uint target_amount)public {
        
    }
}