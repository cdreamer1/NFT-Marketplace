// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFTWallet.sol";

contract NFTFactory is Ownable {
    string public baseURI;
    uint256 public mintFee;
    uint256 public platformFee;
    address payable public feeRecipient;

    bytes4 private constant INTERFACE_ID_ERC721 = 0x80ac58cd;
    
    mapping(address => bool) public exists;
    mapping(address => uint256) public indexes;
    mapping(address => mapping(uint256 => address)) public contracts;
    
    event ContractCreated(address creator, address nft);
    event ContractDisabled(address caller, address nft);

    constructor(
        string memory _baseURI
    ) {
        baseURI = _baseURI;
    }

    function updateBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    function updateMintFee(uint256 _mintFee) external onlyOwner {
        mintFee = _mintFee;
    }

    function updatePlatformFee(uint256 _platformFee) external onlyOwner {
        platformFee = _platformFee;
    }

    function updateFeeRecipient(address payable _feeRecipient)
        external
        onlyOwner
    {
        feeRecipient = _feeRecipient;
    }

    function createNFTContract(string memory _ipfsUrl)
        external
        payable
        returns (address)
    {
        NFTWallet nft = new NFTWallet(
            baseURI,
            _ipfsUrl,
            mintFee,
            feeRecipient,
            msg.sender
        );
        exists[address(nft)] = true;
        contracts[msg.sender][indexes[msg.sender]] = address(nft);
        indexes[msg.sender]++;

        emit ContractCreated(_msgSender(), address(nft));
        return address(nft);
    }

    function registerERC721Contract(address _tokenContractAddress)
        external
        onlyOwner
    {
        require(!exists[_tokenContractAddress], "NFTWallet contract already registered");
        require(IERC165(_tokenContractAddress).supportsInterface(INTERFACE_ID_ERC721), "Not an ERC721 contract");
        exists[_tokenContractAddress] = true;
        contracts[msg.sender][indexes[msg.sender]] = _tokenContractAddress;
        indexes[msg.sender]++;
        emit ContractCreated(_msgSender(), _tokenContractAddress);
    }

    function disableTokenContract(address _tokenContractAddress)
        external
        onlyOwner
    {
        require(exists[_tokenContractAddress], "NFTWallet contract is not registered");
        exists[_tokenContractAddress] = false;
        emit ContractDisabled(_msgSender(), _tokenContractAddress);
    }

    function getContractList(address _creator) external view returns (address[] memory) {
        address[] memory ret = new address[](indexes[_creator]);
        for (uint256 i = 0; i < indexes[_creator]; i++) {
            ret[i] = contracts[_creator][i];
        }
        return ret;
    }
}
