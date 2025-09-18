const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SecretBetHide contract...");

  // Get the contract factory
  const SecretBetHide = await ethers.getContractFactory("SecretBetHide");

  // Deploy the contract
  const secretBetHide = await SecretBetHide.deploy();

  // Wait for deployment to complete
  await secretBetHide.waitForDeployment();

  const contractAddress = await secretBetHide.getAddress();
  
  console.log("SecretBetHide deployed to:", contractAddress);
  console.log("Contract owner:", await secretBetHide.owner());
  
  // Verify contract on Etherscan (if on mainnet/testnet)
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await secretBetHide.deploymentTransaction().wait(6);
    
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("Contract verified on Etherscan");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
