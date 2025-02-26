// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract ESGToken is ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    uint256 private _futureFeature1;
    uint256 private _futureFeature2;
    uint256 private _futureFeature3;

    event TokensBurned(address indexed from, uint256 amount);

    function initialize() public initializer {
        __ERC20_init("ESG", "ESG");
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();

        _mint(msg.sender, 8_100_000_000 * 10 ** decimals()); // 81亿
    }
    
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
    
    
    function futureFeature1() external view returns (uint256) {
        return _futureFeature1;
    }

    function futureFeature2() external view returns (uint256) {
        return _futureFeature2;
    }

    function futureFeature3() external view returns (uint256) {
        return _futureFeature3;
    }
}
