// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Donation {
    
    struct Fundraiser {
        address fundraiserAccount;
        uint targetAmount;
        address beneficiaryAccount;
    }

    Fundraiser[] public fundraisers;

    constructor () public {
        fundraisers.push(Fundraiser(0xEb3909f904D19E2ad7D0A7EB11284C333A9C0061, 100,0x8008bb9c9De470b88F99AfD0F761DEFc8bc73245));
    }

    // function donate(address payable fundraiser_account) payable public returns (uint){
    //     // already check the price

    //     Fundraiser memory fundraiser;
    //     uint index;

    //     for(uint i = 0; i < fundraisers.length; i++){
    //         if(fundraisers[i].fundraiser_account == fundraiser_account){
    //             fundraiser = fundraisers[i];
    //             index = i;
    //             break;
    //         }
    //     }
    //     uint amount = msg.value;
    //     // donate
    //     fundraiser_account.transfer(msg.value);
    //     fundraiser.current_amount += amount;

    //     if (fundraiser.current_amount + amount >= fundraiser.target_amount){
    //         // done 
    //         // transfer all token to beneficiary
    //         address payable beneficiary_account = address(uint160(fundraiser.beneficiary_account));
    //         beneficiary_account.transfer(fundraiser.current_amount);
    //         // delete fundraiser from array
    //         fundraisers[index] = fundraisers[fundraisers.length - 1];
    //         delete fundraisers[fundraisers.length - 1];
    //         fundraisers.length--;
    //     } 
    //     uint cur = fundraiser.current_amount;
    //     return cur;
    // }

    // Development using now that can display the current time in Solidity
    uint lastUpdated;
    //set lastupdated to now
    function updateTimestamp() public {
        lastUpdated = now;
    }
    //true if 30 days have passed since the last updateTimestamp was called, false if not yet
    function monthHavePssded() public view returns (bool) {
        return (now >= (lastUpdated + 30 days));
    }
    function sendAmountWhenNotAcchieved() public {
        if(now >= (lastUpdated + 30 days)) {
            do sendTransation;
        }
    }

    function createFundraiser(address _fundraiserAccount, address _beneficiaryAccount,uint _targetAmount)public {
        fundraisers.push(Fundraiser(_fundraiserAccount, _targetAmount, _beneficiaryAccount ));
    }
    
    function showFundraiser(uint _index) public view returns (address, uint, address) {
        return (fundraisers[_index].fundraiserAccount, fundraisers[_index].targetAmount, fundraisers[_index].beneficiaryAccount);
    }
}