const hre = require("hardhat");
const FACTORY_NONCE = 1;

const FACTORY_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const EP_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


async function main() {
  const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);


  const sender = await hre.ethers.getCreateAddress({
    from : FACTORY_ADDRESS,
    nonce : FACTORY_NONCE,
  });

  //signer (owner) , we gonna use as an argument which will be our calldata
  const [signer] = await hre.ethers.getSigners();  // it will get us array of accounts
  const address0 = await signer.getAddress();     // we can use address of the signers we have as calldata


  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");

  const initCode = FACTORY_ADDRESS + AccountFactory.interface.encodeFunctionData("createAccount",[address0]).slice(2);

  const Account = await hre.ethers.getContractFactory("Account");

  const userOP = {
     sender,
     nonce: await entryPoint.getNonce(sender,0),
     initCode,
     callData: Account.interface.encodeFunctionData("execute"),
     callGasLimit: 200_000,
     verificationGasLimit: 200_000,
     preVerificationGas: 50_000,
     maxFeePerGas: hre.ethers.parseUnits("10","gwei"),
     maxPriorityFeePerGas: hre.ethers.parseUnits("5","gwei"),
     paymasterAndData:"0x",
     signature:"0x"
  }

  const tx = await entryPoint.handleOps([userOP], address0);
  const receipt = await tx.wait();
  console.log(receipt);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
