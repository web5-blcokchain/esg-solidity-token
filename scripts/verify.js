const hre = require("hardhat");

async function main() {
    const proxyAddress = "0x66BFD0A03513B22c98142F386EB163b351a1fd8E";

    console.log("开始验证合约...");

    try {
        // 获取实现合约地址
        const implAddress = await hre.upgrades.erc1967.getImplementationAddress(proxyAddress);
        console.log("实现合约地址:", implAddress);

        // 验证实现合约
        await hre.run("verify:verify", {
            address: implAddress,
            constructorArguments: []
        });
        console.log("实现合约验证成功");

        // 验证代理合约
        await hre.run("verify:verify", {
            address: proxyAddress
        });
        console.log("代理合约验证成功");

    } catch (error) {
        console.error("验证失败:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });