import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { Signer } from "ethers";
import hre, { ethers } from "hardhat";

describe("QuickToken", function () {
    async function deployQuickTokenFixture() {
        const [deployer] = await hre.ethers.getSigners();
        const QuickToken = await hre.ethers.getContractFactory("QuickToken");
        const quickToken = await QuickToken.deploy();
        return { quickToken, deployer };
    }

    async function getQuickTokenInstance(signer: Signer) {
        const { quickToken } = await loadFixture(deployQuickTokenFixture);
        return quickToken.connect(signer);
    }

    describe("Deployment", function () {
        it("Should set the right name", async function () {
            const { quickToken } = await loadFixture(deployQuickTokenFixture);
            expect(await quickToken.name()).to.equal("QuickToken");
        });
        it("Should set the right symbol", async function () {
            const { quickToken } = await loadFixture(deployQuickTokenFixture);
            expect(await quickToken.symbol()).to.equal("QT");
        });
        it("Should set the right decimals", async function () {
            const { quickToken } = await loadFixture(deployQuickTokenFixture);
            expect(await quickToken.decimals()).to.equal(18);
        });
        it("Should set the right total supply", async function () {
            const { quickToken } = await loadFixture(deployQuickTokenFixture);
            expect(await quickToken.totalSupply()).to.equal(ethers.parseEther("1000000"));
        });
    });

    describe("Transfer", function () {
        it("Should transfer tokens between accounts", async function () {
            const [owner, otherAccount] = await hre.ethers.getSigners();
            const quickToken = await getQuickTokenInstance(owner);
            await quickToken.transfer(otherAccount.address, ethers.parseEther("100"));
            expect(await quickToken.balanceOf(otherAccount.address)).to.equal(ethers.parseEther("100"));
            expect(await quickToken.balanceOf(owner.address)).to.equal(ethers.parseEther("999900"));
        });
        it("Should fail if sender does not have enough tokens", async function () {
            const [owner, otherAccount] = await hre.ethers.getSigners();
            const quickToken = await getQuickTokenInstance(owner);
            await expect(quickToken.transfer(otherAccount.address, ethers.parseEther("2000000"))).to.be.reverted;
        });
        it("Should fail if recipient is zero address", async function () {
            const [owner] = await hre.ethers.getSigners();
            const quickToken = await getQuickTokenInstance(owner);
            await expect(quickToken.transfer(ethers.ZeroAddress, ethers.parseEther("100"))).to.be.reverted;
        });
    });

    describe("Approve", function () {
        it("Should approve spender", async function () {
            const [owner, spender] = await hre.ethers.getSigners();
            const quickToken = await getQuickTokenInstance(owner);
            await quickToken.approve(spender.address, ethers.parseEther("100"));
            expect(await quickToken.allowance(owner.address, spender.address)).to.equal(ethers.parseEther("100"));
        });
        it("Should fail if spender is zero address", async function () {
            const [owner] = await hre.ethers.getSigners();
            const quickToken = await getQuickTokenInstance(owner);
            await expect(quickToken.approve(ethers.ZeroAddress, ethers.parseEther("100"))).to.be.reverted;
        });
    });

    describe("TransferFrom", function () {
        it("Should transfer tokens from one account to another", async function () {
            const [owner, spender, recipient] = await hre.ethers.getSigners();
            const quickToken = await getQuickTokenInstance(owner);
            await quickToken.approve(spender.address, ethers.parseEther("100"));
            await quickToken.connect(spender).transferFrom(owner.address, recipient.address, ethers.parseEther("50"));
            expect(await quickToken.balanceOf(recipient.address)).to.equal(ethers.parseEther("50"));
            expect(await quickToken.balanceOf(owner.address)).to.equal(ethers.parseEther("999950"));
        });
        it("Should fail if spender does not have enough allowance", async function () {
            const [owner, spender, recipient] = await hre.ethers.getSigners();
            const quickToken = await getQuickTokenInstance(spender);
            await expect(quickToken.transferFrom(owner.address, recipient.address, ethers.parseEther("100"))).to.be.reverted;
        });
        it("Should fail if spender is zero address", async function () {
            const [owner, recipient] = await hre.ethers.getSigners();
            const quickToken = await getQuickTokenInstance(owner);
            await expect(quickToken.transferFrom(owner.address, recipient.address, ethers.parseEther("100"))).to.be.reverted;
        });
        it("Should fail if recipient is zero address", async function () {
            const [owner, spender] = await hre.ethers.getSigners();
            const quickToken = await getQuickTokenInstance(owner);
            await expect(quickToken.transferFrom(owner.address, ethers.ZeroAddress, ethers.parseEther("100"))).to.be.reverted;
        });
    });

    describe("Mint", function () {
        it("Should mint tokens to an address", async function () {
            const [owner, recipient] = await hre.ethers.getSigners();
            const quickToken = await getQuickTokenInstance(owner);
            await quickToken.mint(recipient.address, ethers.parseEther("100"));
            expect(await quickToken.balanceOf(recipient.address)).to.equal(ethers.parseEther("100"));
        });
        it("Should fail if minted to zero address", async function () {
            const [owner] = await hre.ethers.getSigners();
            const quickToken = await getQuickTokenInstance(owner);
            await expect(quickToken.mint(ethers.ZeroAddress, ethers.parseEther("100"))).to.be.reverted;
        });
    });
});
