// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Donation {
    struct Fundraiser {
        address fundraiserAccount;
        uint targetAmount;
        address beneficiaryAccount;
    }

    Fundraiser[] public fundraisers;

    function donate(uint _amount, address _fundraiserAccount, string _password) public {

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