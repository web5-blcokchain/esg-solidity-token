const { TokenHelper } = require('./utils/common');

async function main() {
    const contractAddress = "0xd443A79aEE39C1D87e6F163Fc5F8E2BF3B2A90c6";

    try {
        const helper = new TokenHelper(contractAddress);
        await helper.init();

        console.log("\n=== 测试所有权转让 ===");

        // 1. 查看当前所有者
        const currentOwner = await helper.getOwner();
        console.log("当前所有者:", currentOwner);

        // 2. 将所有权转让给 addr1
        console.log("\n1. 转让所有权给新地址");
        const tx = await helper.transferOwnership(helper.addr1.address);
        console.log("所有权转让交易哈希:", tx.hash);

        // 3. 验证新的所有者
        const newOwner = await helper.getOwner();
        console.log("新的所有者:", newOwner);
        console.log("是否转让成功:", newOwner === helper.addr1.address);

        // 4. 测试权限变更（原所有者不能再设置黑名单）
        console.log("\n2. 测试原所有者权限");
        try {
            await helper.setBlacklist(helper.addr2.address, true);
            console.log("错误：原所有者不应该能够设置黑名单");
        } catch (error) {
            console.log("权限验证成功：原所有者无法设置黑名单");
        }

        // 5. 测试新所有者权限
        console.log("\n3. 测试新所有者权限");
        try {
            const tx2 = await helper.token.connect(helper.addr1).setBlacklist(helper.addr2.address, true);
            await tx2.wait();
            console.log("新所有者成功设置黑名单");
        } catch (error) {
            console.log("错误：新所有者应该能够设置黑名单", error);
        }

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