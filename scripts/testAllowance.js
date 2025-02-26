const { TokenHelper } = require('./utils/common');

async function main() {
    const contractAddress = "0x66BFD0A03513B22c98142F386EB163b351a1fd8E";

    try {
        const helper = new TokenHelper(contractAddress);
        await helper.init();

        console.log("\n=== 测试普通转账 ===");
        // 查看初始余额
        await helper.logBalance(helper.owner.address, "Owner 初始");
        await helper.logBalance(helper.addr1.address, "接收地址初始");

        // 执行转账
        const tx1 = await helper.transfer(helper.owner, helper.addr1, 100);
        console.log("转账完成，交易哈希:", tx1.hash);

        // 查看转账后余额
        await helper.logBalance(helper.owner.address, "Owner 当前");
        await helper.logBalance(helper.addr1.address, "接收地址当前");

        console.log("\n=== 测试授权转账 ===");
        // 授权额度
        const approveAmount = helper.parseUnits("50");
        const tx2 = await helper.token.connect(helper.addr1).approve(helper.addr2.address, approveAmount);
        await tx2.wait();
        console.log("授权完成，交易哈希:", tx2.hash);

        // 查看授权额度
        const allowance = await helper.token.allowance(helper.addr1.address, helper.addr2.address);
        console.log("授权额度:", helper.formatUnits(allowance));

        // 使用授权额度转账
        const tx3 = await helper.token.connect(helper.addr2).transferFrom(
            helper.addr1.address,
            helper.addr2.address,
            helper.parseUnits("30")
        );
        await tx3.wait();
        console.log("授权转账完成，交易哈希:", tx3.hash);

        // 查看最终余额
        await helper.logBalance(helper.addr1.address, "授权方当前");
        await helper.logBalance(helper.addr2.address, "接收方当前");

    } catch (error) {
        console.error("测试失败:", error.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });