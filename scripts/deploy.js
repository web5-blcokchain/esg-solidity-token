const { ethers, upgrades } = require("hardhat");

async function main() {
    const ESGToken = await ethers.getContractFactory("ESGToken");
    console.log("Deploying ESGToken...");

    const esgToken = await upgrades.deployProxy(ESGToken, [], {
        initializer: "initialize",
    });

    await esgToken.waitForDeployment();

    const address = await esgToken.getAddress();
    console.log("ESGToken deployed to:", address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });