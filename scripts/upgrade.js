const { ethers, upgrades } = require("hardhat");

async function main() {
    const PROXY_ADDRESS = "0xd443A79aEE39C1D87e6F163Fc5F8E2BF3B2A90c6";

    console.log("准备升级合约...");
    const ESGTokenV2 = await ethers.getContractFactory("ESGTokenV2");
    const upgraded = await upgrades.upgradeProxy(PROXY_ADDRESS, ESGTokenV2);

    await upgraded.waitForDeployment();
    console.log("合约升级完成，地址:", await upgraded.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });