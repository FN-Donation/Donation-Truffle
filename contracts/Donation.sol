// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Donation {
    
    struct Fundraiser {
        address fundraiserAccount;
        uint targetAmount;
        address beneficiaryAccount;
    }

    Fundraiser[] public fundraisers;
    event DonationEvent (address indexed donator, address indexed fundraiser, uint amount);
    event ActionEvent(uint8 action);
        
    constructor () public {
        // fundraisers.push(Fundraiser(0x42AE8ac9A9d74272Fef45f793193E92B4CFaca6A, 100000000000000000000, 0x8008bb9c9De470b88F99AfD0F761DEFc8bc73245));
    }

    function donate(address payable fundraiserAccount, uint amount) payable public returns (uint){
        // check not over the targetAmount
        // ##params : fundraiser_account, amount_to_donate
        // cur = fundraiser_account.balance
        // if amount + cur == target
        // : transfer to fundraiser amount & delete fundraiser from array & transfer target to beneficiary
        // elif amount + cur < target
        // : transfer to fundraiser amount
        // else : error break;
        uint currentAmount = fundraiserAccount.balance;

        Fundraiser memory fundraiser;
        uint index;

        for(uint i = 0; i < fundraisers.length; i++){
            if(fundraisers[i].fundraiserAccount == fundraiserAccount){
                fundraiser = fundraisers[i];
                index = i;
                break;
            }
        }

        uint targetAmount = fundraiser.targetAmount;
        if (amount + currentAmount == targetAmount){

            // delete fundraiser from array
            fundraisers[index] = fundraisers[fundraisers.length - 1];
            delete fundraisers[fundraisers.length - 1];
            fundraisers.length--;

            // fundraiserAccount.transfer(amount);
            // transfer target to beneficiary
            emit DonationEvent(msg.sender, fundraiserAccount, amount);
            emit ActionEvent(2);
        }else if(amount + currentAmount < targetAmount){
            // fundraiserAccount.transfer(amount);
            emit DonationEvent(msg.sender, fundraiserAccount, amount);
            emit ActionEvent(1);
        }else {
            //error
            emit ActionEvent(0);
        }

    }

    // Development using now that can display the current time in Solidity
    uint lastUpdated;
    //set lastupdated to now
    function updateTimestamp() public {
        lastUpdated = now;
    }
    //true if 30 days have passed since the last updateTimestamp was called, false if not yet
    function monthHavePassed() public view returns (bool) {
        return (now >= (lastUpdated + 30 days));
    }

    function createFundraiser(address _fundraiserAccount, address _beneficiaryAccount, uint _targetAmount) public returns (uint) {
        Fundraiser memory fundraiser;
        fundraiser.fundraiserAccount = _fundraiserAccount;
        fundraiser.beneficiaryAccount = _beneficiaryAccount;
        fundraiser.targetAmount = _targetAmount;
        fundraisers.push(fundraiser);
        return fundraisers.length;
    }
    
    function showFundraiser(uint _index) public view returns (address, uint, address) {
        return (fundraisers[_index].fundraiserAccount, fundraisers[_index].targetAmount, fundraisers[_index].beneficiaryAccount);
    }
}