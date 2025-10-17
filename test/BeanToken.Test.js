const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BeanToken", function () {
    let BeanToken, bean, owner, user1, user2;
    const CAP = ethers.parseEther("1000"); // cap = 1000 BEAN

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();
        BeanToken = await ethers.getContractFactory("BeanToken");
        bean = await BeanToken.deploy(CAP, owner.address);
    });

    it("should have correct name, symbol, and cap", async function () {
        expect(await bean.name()).to.equal("BeanToken");
        expect(await bean.symbol()).to.equal("BEAN");
        expect(await bean.cap()).to.equal(CAP);
    });

    it("should allow owner to mint tokens", async function () {
        const mintAmount = ethers.parseEther("100");
        await expect(bean.connect(owner).mint(user1.address, mintAmount))
            .to.emit(bean, "TokensMinted")
            .withArgs(user1.address, mintAmount);

        expect(await bean.balanceOf(user1.address)).to.equal(mintAmount);
    });

    it("should not allow non-owner to mint", async function () {
        const mintAmount = ethers.parseEther("10");
        await expect(
            bean.connect(user1).mint(user1.address, mintAmount)
        ).to.be.revertedWithCustomError(bean, "OwnableUnauthorizedAccount");
    });

    it("should not exceed cap", async function () {
        await bean.connect(owner).mint(user1.address, CAP);
        await expect(
            bean.connect(owner).mint(user2.address, ethers.parseEther("1"))
        ).to.be.revertedWith("cap exceeded");
    });

    it("should allow user to burn their tokens", async function () {
        const mintAmount = ethers.parseEther("50");
        await bean.connect(owner).mint(user1.address, mintAmount);

        await expect(bean.connect(user1).burn(ethers.parseEther("20")))
            .to.emit(bean, "TokensBurned")
            .withArgs(user1.address, ethers.parseEther("20"));

        expect(await bean.balanceOf(user1.address)).to.equal(
            ethers.parseEther("30")
        );
    });

    it("should not allow burning more than balance", async function () {
        await expect(bean.connect(user1).burn(ethers.parseEther("1"))).to.be.reverted;
    });
});
