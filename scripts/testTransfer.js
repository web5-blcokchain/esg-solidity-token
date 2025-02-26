const { TokenHelper } = require('./utils/common');

async function main() {
    const contractAddress = "0xd443A79aEE39C1D87e6F163Fc5F8E2BF3B2A90c6";

    try {
        const helper = new TokenHelper(contractAddress);
        await helper.init();

        // 查看初始余额
        await helper.logBalance(helper.owner.address, "Owner 初始");
        await helper.logBalance(helper.addr1.address, "接收地址初始");

        // 转账 100 个代币
        const tx = await helper.transfer(helper.owner, helper.addr1.address, 100);
        console.log("转账完成，交易哈希:", tx.hash);

        // 查看转账后的余额
        await helper.logBalance(helper.owner.address, "Owner 当前");
        await helper.logBalance(helper.addr1.address, "接收地址当前");

    } catch (error) {
        console.error("转账失败:", error.message || error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });