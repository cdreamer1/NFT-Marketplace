async function main() {
  const TokenRegistry = await ethers.getContractFactory('TokenRegistry');
  const TokenRegistryDeployed = await TokenRegistry.deploy();
  await TokenRegistryDeployed.waitForDeployment();
  console.log("token registry contract deployed at: ", TokenRegistryDeployed.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
