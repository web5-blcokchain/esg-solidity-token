const { TokenHelper } = require('./utils/common');

async function main() {
    const contractAddress = "0x66BFD0A03513B22c98142F386EB163b351a1fd8E";

    try {
        const helper = new TokenHelper(contractAddress);
        await helper.init();

        console.log("\n=== 测试代币燃烧功能 ===");

        // 查看初始总供应量和账户余额
        const initialSupply = await helper.token.totalSupply();
        console.log("初始总供应量:", helper.formatUnits(initialSupply));
        await helper.logBalance(helper.owner.address, "Owner 初始");

        // 燃烧 1000 个代币
        const burnAmount = helper.parseUnits("1000");
        const tx = await helper.token.connect(helper.owner).burn(burnAmount);
        await tx.wait();
        console.log("燃烧完成，交易哈希:", tx.hash);

        // 查看燃烧后的总供应量和账户余额
        const finalSupply = await helper.token.totalSupply();
        console.log("当前总供应量:", helper.formatUnits(finalSupply));
        await helper.logBalance(helper.owner.address, "Owner 当前");

        // 验证供应量减少是否正确
        const supplyDifference = initialSupply - finalSupply;
        console.log("供应量减少:", helper.formatUnits(supplyDifference));

        // 监听 TokensBurned 事件
        const filter = helper.token.filters.TokensBurned();
        const events = await helper.token.queryFilter(filter, tx.blockNumber, tx.blockNumber);

        if (events.length > 0) {
            const event = events[0];
            console.log("\n燃烧事件详情:");
            console.log("燃烧地址:", event.args[0]);
            console.log("燃烧数量:", helper.formatUnits(event.args[1]));
        }

    } catch (error) {
        console.error("燃烧测试失败:", error.message || error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });