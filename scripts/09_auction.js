require('dotenv').config();
const { 
  FEE_RECIPIENT, 
} = process.env;

async function main() {
  const NFTAuction = await ethers.getContractFactory('NFTAuction');
  const NFTAuctionDeployed = await NFTAuction.deploy();
  await NFTAuctionDeployed.waitForDeployment();
  console.log("auction contract deployed at: ", NFTAuctionDeployed.target);
  
  await NFTAuctionDeployed.initialize(FEE_RECIPIENT);
  console.log('Auction contract was initialized');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
