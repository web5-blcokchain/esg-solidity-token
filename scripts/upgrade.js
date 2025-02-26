const { ethers, upgrades } = require("hardhat");

async function main() {
    const PROXY_ADDRESS = "0x66BFD0A03513B22c98142F386EB163b351a1fd8E";

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