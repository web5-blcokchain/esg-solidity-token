import { ethers, upgrades } from "hardhat";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("ESGToken", function () {
    let ESGToken: ContractFactory;
    let esgToken: Contract;
    let owner: HardhatEthersSigner;
    let addr1: HardhatEthersSigner;
    let addr2: HardhatEthersSigner;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        ESGToken = await ethers.getContractFactory("ESGToken");
        esgToken = await upgrades.deployProxy(ESGToken, [], { initializer: "initialize" });
        await esgToken.waitForDeployment();
    });

    it("Should have correct name and supply", async function () {
        expect(await esgToken.name()).to.equal("ESG");
        expect(await esgToken.symbol()).to.equal("ESG");
        const totalSupply = await esgToken.totalSupply();
        expect(totalSupply).to.equal(ethers.parseUnits("8100000000", 18));
    });

    it("Should allow burning tokens", async function () {
        const burnAmount = ethers.parseUnits("100", 18);
        await esgToken.connect(owner).burn(burnAmount);
        const expectedBalance = ethers.parseUnits("8099999900", 18);
        expect(await esgToken.balanceOf(owner.address)).to.equal(expectedBalance);
    });

    it("Should upgrade to ESGTokenV2 and enable blacklisting", async function () {
        const ESGTokenV2 = await ethers.getContractFactory("ESGTokenV2");
        const upgraded = await upgrades.upgradeProxy(await esgToken.getAddress(), ESGTokenV2);

        await upgraded.setBlacklist(addr1.address, true);
        expect(await upgraded.isBlacklisted(addr1.address)).to.be.true;
    });
});