const {ethers} = require("hardhat");
require("dotenv").config();
const artifact = require("../artifacts/contracts/ERC6551Account.sol/ERC6551Account.json")

async function main() {
  const provider = new ethers.AlchemyProvider(
    84532,
    process.env.SEPOLIA_API_KEY
  );
  const signer = new ethers.Wallet(process.env.METAMASK_PRIVATE_KEY, provider);
  //insert your TBA address here from scripts/createAccount.js
  const tokenBoundAccount = "0x5EEcEdf62A714A666d0C907133983E9BBA4af46B";
  const tba = new ethers.Contract(tokenBoundAccount, artifact.abi, signer);

  //Localhost implementation (hardhat node)
  // const [signer, account] = await ethers.getSigners();

  const newName = ethers.encodeBytes32String("BaseInu NFT Wallet");
  const tx =  await tba.setAccountName(newName);
  await tx.wait();
  const accountName =  await tba.getAccountName();
  console.log("New Account Name: ", ethers.decodeBytes32String(accountName));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
  
  