const { TokenHelper } = require('./utils/common');
const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0xd443A79aEE39C1D87e6F163Fc5F8E2BF3B2A90c6";
    const targetAddress = "0x93eede5BCEE878CE893e057C4cD5238D68Bc951a";

    try {
        const helper = new TokenHelper(contractAddress);
        await helper.init();

        console.log("\n=== 转移全部代币 ===");
        console.log("合约地址:", contractAddress);
        console.log("目标地址:", targetAddress);

        const balance = await helper.token.balanceOf(helper.owner.address);
        console.log("当前持有代币数量:", helper.formatUnits(balance));

        if (balance.toString() === '0') {
            console.log("账户余额为0，无需转账");
            return;
        }

        console.log("\n开始转账...");
        const tx = await helper.token.connect(helper.owner).transfer(targetAddress, balance);
        console.log("等待交易确认...");
        await tx.wait();
        console.log("转账完成，交易哈希:", tx.hash);

        const newOwnerBalance = await helper.token.balanceOf(helper.owner.address);
        const targetBalance = await helper.token.balanceOf(targetAddress);

        console.log("\n转账后余额:");
        console.log("原地址余额:", helper.formatUnits(newOwnerBalance));
        console.log("目标地址余额:", helper.formatUnits(targetBalance));

        if (newOwnerBalance.toString() === '0') {
            console.log("\n转账成功：所有代币已转移到目标地址");
        } else {
            console.log("\n警告：转账后原地址仍有余额");
        }

    } catch (error) {
        console.error("\n转账失败:");
        if (error.code === 'NETWORK_ERROR') {
            console.error("网络连接失败，请检查网络配置");
        } else if (error.code === 'INSUFFICIENT_FUNDS') {
            console.error("账户余额不足以支付 gas 费用");
        } else {
            console.error(error.message || error);
        }
        throw error;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });