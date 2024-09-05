const hre = require("hardhat");
const FACTORY_NONCE = 1;

const FACTORY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const EP_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


async function main() {
  const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);


  const sender = await hre.ethers.getCreateAddress({
    from : FACTORY_ADDRESS,
    nonce : FACTORY_NONCE
  })

  const userOP = {
     sender,
     nonce: await entryPoint.getNonce(sender,0),
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
