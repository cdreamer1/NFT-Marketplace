require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 11155111,
    },
      sepolia: {
        url: `${process.env.ALCHEMY_SEPOLIA_URL}`,
        accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
      }, 
  }, 
  defaultNetwork: "hardhat",
};
