const hre = require("hardhat");

async function main() {
  const ep = await hre.ethers.deployContract("EntryPoint");

  const userOP = {
     sender,
     nonce,
     initCode,
     callData,
     callGasLimit: 200_000,
     verificationGasLimit: 200_000,
     preVerificationGas: 50_000,
     maxFeePerGas: hre.ethers.parseUnits("10","gwei"),
     maxPriorityFeePerGas: hre.ethers.parseUnits("5","gwei"),
     paymasterAndData:"0x",
     signature:"0x"
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
