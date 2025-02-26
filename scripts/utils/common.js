const hre = require("hardhat");

class TokenHelper {
    constructor(contractAddress) {
        this.contractAddress = contractAddress;
    }


    // 所有权相关方法
    async transferOwnership(newOwner) {
        const tx = await this.token.connect(this.owner).transferOwnership(newOwner);
        await tx.wait();
        return tx;
    }

    async getOwner() {
        return await this.token.owner();
    }

    async init() {
        // 获取签名者
        const signers = await hre.ethers.getSigners();


        // 从环境变量获取地址，如果未配置则使用默认签名者
        this.owner = process.env.OWNER_ADDRESS ?
            await hre.ethers.getSigner(process.env.OWNER_ADDRESS) :
            signers[0];

        this.addr1 = process.env.ADDR1_ADDRESS ?
            await hre.ethers.getSigner(process.env.ADDR1_ADDRESS) :
            signers[1];

        this.addr2 = process.env.ADDR2_ADDRESS ?
            await hre.ethers.getSigner(process.env.ADDR2_ADDRESS) :
            signers[2];

        // 获取升级后的合约实例
        const ESGTokenV2 = await hre.ethers.getContractFactory("ESGTokenV2", this.owner);
        this.token = ESGTokenV2.attach(this.contractAddress);
    }

    async getBalance(address) {
        const balance = await this.token.balanceOf(address);
        return this.formatUnits(balance);
    }

    async transfer(from, to, amount) {
        const transferAmount = this.parseUnits(amount.toString());
        const tokenWithSigner = this.token.connect(from);
        const toAddress = typeof to === 'string' ? to : to.address;
        const tx = await tokenWithSigner.transfer(toAddress, transferAmount);
        await tx.wait();
        return tx;
    }

    async logBalance(address, label) {
        const balance = await this.getBalance(address);
        console.log(`${label} 余额:`, balance);
    }

    parseUnits(amount) {
        return hre.ethers.parseUnits(amount.toString(), 18);
    }

    formatUnits(amount) {
        return hre.ethers.formatUnits(amount, 18);
    }

    // V2 特性的辅助方法
    async setBlacklist(address, value) {
        const tx = await this.token.connect(this.owner).setBlacklist(address, value);
        await tx.wait();
        return tx;
    }

    async isBlacklisted(address) {
        return await this.token.isBlacklisted(address);
    }

    // 事件查询辅助方法
    async getEvents(eventName, fromBlock = 0) {
        const filter = this.token.filters[eventName]();
        const events = await this.token.queryFilter(filter, fromBlock);
        return events;
    }
}

module.exports = {
    TokenHelper
};