
require("hardhat");

async function main() {
  const NFTWallet = await ethers.getContractFactory('NFTWallet');
  const NFTWalletDeployed = await NFTWallet.deploy("https://ipfs.io/ipfs/");
  await NFTWalletDeployed.waitForDeployment();

  const Account = await ethers.getContractFactory('ERC6551Account');
  const AccountDeployed = await Account.deploy();
  await AccountDeployed.waitForDeployment();

  const Registry = await ethers.getContractFactory('ERC6551Registry');
  const RegistryDeployed = await Registry.deploy();
  await RegistryDeployed.waitForDeployment();

  console.log("NFTWallet contract deployed at:", NFTWalletDeployed.target);
  console.log("Account contract deployed at:", AccountDeployed.target);
  console.log("Registry contract deployed at:", RegistryDeployed.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});