require('dotenv').config();
const { 
  BASE_URI, 
} = process.env;
const { ethers } = require('hardhat');

async function main() {
  const NFTFactory = await ethers.getContractFactory("NFTFactory");
  const NFTFactoryDeployed = await NFTFactory.deploy(
    BASE_URI
  );
  await NFTFactoryDeployed.waitForDeployment();
  console.log("factory contract deployed at: ", NFTFactoryDeployed.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
