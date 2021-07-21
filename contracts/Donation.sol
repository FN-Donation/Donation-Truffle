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
        fundraisers.push(Fundraiser(0x42AE8ac9A9d74272Fef45f793193E92B4CFaca6A, 100000000000000000000, 0x8008bb9c9De470b88F99AfD0F761DEFc8bc73245));
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
            return 2;
        }else if(amount + currentAmount < targetAmount){
            // fundraiserAccount.transfer(amount);
            return 1;
        }else {
            //error
            return 0;
        }
        // donate
        // fundraiser_account.transfer(msg.value);
        // fundraiser.current_amount += amount;

        // if (fundraiser.current_amount + amount >= fundraiser.target_amount){
        //     // done 
        //     // transfer all token to beneficiary
        //     address payable beneficiary_account = address(uint160(fundraiser.beneficiary_account));
        //     beneficiary_account.transfer(fundraiser.current_amount);
        //     // delete fundraiser from array
        //     fundraisers[index] = fundraisers[fundraisers.length - 1];
        //     delete fundraisers[fundraisers.length - 1];
        //     fundraisers.length--;
        // } 
        // uint cur = fundraiser.current_amount;
    }

    function sendAmountWhenNotAcchieved(address _fundraiserAccount, uint _nowFundaiser) public {

    }

    function createFundraiser(address _fundraiserAccount, address _beneficiaryAccount,uint _targetAmount)public {
        fundraisers.push(Fundraiser(_fundraiserAccount, _targetAmount, _beneficiaryAccount ));
    }
    
    function showFundraiser(uint _index) public view returns (address, uint, address) {
        return (fundraisers[_index].fundraiserAccount, fundraisers[_index].targetAmount, fundraisers[_index].beneficiaryAccount);
    }
}