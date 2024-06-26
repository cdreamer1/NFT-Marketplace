require('dotenv').config();
const { 
  FEE_RECIPIENT, 
  PLATFORM_FEE, 
} = process.env;

async function main() {
  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
  const NFTMarketplaceDeployed = await NFTMarketplace.deploy();
  await NFTMarketplaceDeployed.waitForDeployment();
  console.log("marketplace contract deployed at: ", NFTMarketplaceDeployed.target);
  
  await NFTMarketplaceDeployed.initialize(FEE_RECIPIENT, PLATFORM_FEE);
  console.log('Marketplace contract was initialized');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
