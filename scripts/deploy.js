const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying BeanToken with account:", deployer.address);

    const cap = ethers.parseEther("1000000"); // 1,000,000 BEAN max supply
    const BeanToken = await ethers.getContractFactory("BeanToken");
    const bean = await BeanToken.deploy(cap, deployer.address);

    await bean.waitForDeployment();

    console.log("BeanToken deployed to:", await bean.getAddress());
    console.log("Token cap:", cap.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
