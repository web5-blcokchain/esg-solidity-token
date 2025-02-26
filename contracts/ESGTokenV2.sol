// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ESGToken.sol";

contract ESGTokenV2 is ESGToken {
    mapping(address => bool) private _blacklist;

    event BlacklistUpdated(address indexed account, bool isBlacklisted);
    
    function setBlacklist(address account, bool value) external onlyOwner {
        _blacklist[account] = value;
        emit BlacklistUpdated(account, value);
    }

    function isBlacklisted(address account) public view returns (bool) {
        return _blacklist[account];
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal view {
        require(!_blacklist[from], "ESGTokenV2: Sender is blacklisted");
        require(!_blacklist[to], "ESGTokenV2: Recipient is blacklisted");
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        _beforeTokenTransfer(msg.sender, to, amount);  
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        _beforeTokenTransfer(from, to, amount);  
        return super.transferFrom(from, to, amount);
    }
}
