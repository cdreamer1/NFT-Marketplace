// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AddressRegistry is Ownable {
    address public auction;
    address public marketplace;
    address public nftFactory;
    address public tokenRegistry;

    function updateAuction(address _auction) external onlyOwner {
        auction = _auction;
    }

    function updateMarketplace(address _marketplace) external onlyOwner {
        marketplace = _marketplace;
    }

    function updateNFTFactory(address _factory) external onlyOwner {
        nftFactory = _factory;
    }

    function updateTokenRegistry(address _tokenRegistry) external onlyOwner {
        tokenRegistry = _tokenRegistry;
    }
}
