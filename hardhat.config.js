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
      url: process.env.ALCHEMY_BASE_URL,
      chainId: 8453,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    },
    base_sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL,
      chainId: 84532,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    }, 
  }, 
  etherscan: {
    apiKey: {
      "base": process.env.BASE_API_KEY,
      "base-sepolia": process.env.SEPOLIA_API_KEY,
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      }
    ]
  },
};
