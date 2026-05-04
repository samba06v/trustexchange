const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying TrustExchange Escrow Contract...\n");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // USDT Contract Address (update based on network)
  const USDT_ADDRESSES = {
    ethereum: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    polygon: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    arbitrum: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    // For testnet, deploy a mock USDT
    hardhat: "0x0000000000000000000000000000000000000000" // Will be replaced
  };

  const network = hre.network.name;
  let usdtAddress = USDT_ADDRESSES[network];

  // Deploy mock USDT for local/testnet
  if (network === "hardhat" || network === "localhost") {
    console.log("\n📝 Deploying Mock USDT for testing...");
    const MockUSDT = await hre.ethers.getContractFactory("MockUSDT");
    const mockUSDT = await MockUSDT.deploy();
    await mockUSDT.waitForDeployment();
    usdtAddress = await mockUSDT.getAddress();
    console.log("Mock USDT deployed to:", usdtAddress);
  }

  // Deploy TrustExchangeEscrow
  console.log("\n📝 Deploying TrustExchangeEscrow...");
  const TrustExchangeEscrow = await hre.ethers.getContractFactory("TrustExchangeEscrow");
  const escrow = await TrustExchangeEscrow.deploy(usdtAddress);
  
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();

  console.log("\n✅ Deployment Complete!");
  console.log("═══════════════════════════════════════");
  console.log("TrustExchangeEscrow:", escrowAddress);
  console.log("USDT Token:", usdtAddress);
  console.log("Network:", network);
  console.log("═══════════════════════════════════════\n");

  // Add initial arbiter (deployer)
  console.log("🔧 Setting up initial arbiter...");
  const tx = await escrow.addArbiter(deployer.address);
  await tx.wait();
  console.log("✅ Arbiter added:", deployer.address);

  // Save deployment info
  const fs = require("fs");
  const deploymentInfo = {
    network: network,
    escrowContract: escrowAddress,
    usdtToken: usdtAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber()
  };

  fs.writeFileSync(
    `deployments/${network}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log(`\n💾 Deployment info saved to deployments/${network}.json`);

  // Verify on Etherscan (if not local network)
  if (network !== "hardhat" && network !== "localhost") {
    console.log("\n⏳ Waiting for block confirmations...");
    await escrow.deploymentTransaction().wait(6);
    
    console.log("\n🔍 Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: escrowAddress,
        constructorArguments: [usdtAddress],
      });
      console.log("✅ Contract verified on Etherscan");
    } catch (error) {
      console.log("⚠️  Verification failed:", error.message);
    }
  }

  console.log("\n🎉 All done! Contract is ready to use.\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
