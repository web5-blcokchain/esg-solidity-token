const { TokenHelper } = require('./utils/common');

async function main() {
    const contractAddress = "0x66BFD0A03513B22c98142F386EB163b351a1fd8E";

    try {
        const helper = new TokenHelper(contractAddress);
        await helper.init();

        console.log("\n=== 测试黑名单功能 ===");

        // 1. 测试设置黑名单
        console.log("\n1. 测试添加地址到黑名单");
        const tx1 = await helper.token.connect(helper.owner).setBlacklist(helper.addr1.address, true);
        await tx1.wait();
        console.log("已将地址添加到黑名单，交易哈希:", tx1.hash);

        // 验证黑名单状态
        const isBlacklisted = await helper.token.isBlacklisted(helper.addr1.address);
        console.log("地址是否在黑名单中:", isBlacklisted);

        // 2. 测试向黑名单地址转账（应该失败）
        console.log("\n2. 测试向黑名单地址转账");
        try {
            await helper.transfer(helper.owner, helper.addr1.address, 100);
            console.log("错误：转账应该失败");
        } catch (error) {
            console.log("转账被黑名单成功阻止：", error.message);
        }

        // 3. 测试从黑名单地址转账（应该失败）
        console.log("\n3. 测试从黑名单地址转账");
        try {
            // 先给黑名单地址转一些代币（先解除黑名单）
            await helper.token.connect(helper.owner).setBlacklist(helper.addr1.address, false);
            await helper.transfer(helper.owner, helper.addr1.address, 100);
            // 重新加入黑名单
            await helper.token.connect(helper.owner).setBlacklist(helper.addr1.address, true);

            // 尝试从黑名单地址转账
            await helper.transfer(helper.addr1, helper.addr2.address, 50);
            console.log("错误：转账应该失败");
        } catch (error) {
            console.log("转账被黑名单成功阻止：", error.message);
        }

        // 4. 测试移除黑名单
        console.log("\n4. 测试移除地址从黑名单");
        const tx2 = await helper.token.connect(helper.owner).setBlacklist(helper.addr1.address, false);
        await tx2.wait();
        console.log("已将地址从黑名单移除，交易哈希:", tx2.hash);

        // 验证移除后可以正常转账
        console.log("\n5. 验证移除黑名单后的转账");
        const tx3 = await helper.transfer(helper.addr1, helper.addr2.address, 50);
        console.log("黑名单移除后转账成功，交易哈希:", tx3.hash);

        // 监听黑名单更新事件
        console.log("\n6. 查看黑名单事件日志");
        const filter = helper.token.filters.BlacklistUpdated();
        const events = await helper.token.queryFilter(filter);

        events.forEach((event, index) => {
            console.log(`事件 ${index + 1}:`);
            console.log("地址:", event.args[0]);
            console.log("黑名单状态:", event.args[1]);
        });

    } catch (error) {
        console.error("测试失败:", error.message || error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });