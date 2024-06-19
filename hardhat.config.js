require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true,
    }
  },
  sourcify: {
    enabled: true
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    base: {
      url: `${process.env.ALCHEMY_BASE_URL}`,
      chainId: 8453,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    }, 
    sepolia: {
      url: `${process.env.ALCHEMY_SEPOLIA_URL}`,
      chainId: 84532,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    }, 
  }, 
  etherscan: {
    apiKey: {
      baseSepolia: process.env.SEPOLIA_API_KEY,
    },
  },
};
