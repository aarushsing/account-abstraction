const hre = require ("hardhat");

const smart_account_address = "0x75537828f2ce51be7289709686A69CbFDbB714F1";

async function main() {

    const account = await hre.ethers.getContractAt("Account",smart_account_address);
    const count = await account.count();
    console.log(count);
    
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1; 
  });
  
