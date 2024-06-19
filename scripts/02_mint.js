require("hardhat");
require("dotenv").config();

async function main() {
  // Get the contract instance
  const NFTWallet = await ethers.getContractFactory("NFTWallet");
  const nftWallet = await NFTWallet.attach(process.env.NFTWALLET_ADDRESS);
  tokenId = await nftWallet.nextId();
   //Replae with your IPFS hash from pinContent.js (json file)
  const baseURI = "ipfs://QmWFuVcVhY8XTFa5hvfpyx2wZD9tJjbpGCqQZ6DPbdhSjD";
 
  //Address you want to mint your NFT to
  const to = process.env.METAMASK_WALLET_ADDRESS;
  // Mint token
  const tx = await nftWallet.safeMint(to, baseURI);

  // Wait for the transaction to be mined
  const receipt = await tx.wait();

  // Log the transaction details
  console.log("Transaction hash:", receipt.hash);
  console.log("Gas used:", receipt.cumulativeGasUsed);

  // Check if the transaction was successful (status 1)
  if (receipt.status === 1) {
    console.log(`Transaction was successful. Token ${tokenId} minted to ${to}`);
  } else {
    console.log("Transaction failed.");
  }

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


