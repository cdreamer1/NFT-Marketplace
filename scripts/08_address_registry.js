async function main() {
  const AddressRegistry = await ethers.getContractFactory('AddressRegistry');
  const AddressRegistryDeployed = await AddressRegistry.deploy();
  await AddressRegistryDeployed.waitForDeployment();
  console.log("address registry contract deployed at: ", AddressRegistryDeployed.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
