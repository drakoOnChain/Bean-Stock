import { ethers } from "ethers";
import { BeanStockABI } from "../contract/BeanStockABI";

export const BEAN_TOKEN_ADDRESS = import.meta.env.VITE_BEAN_CONTRACT_ADDRESS;

export const getContract = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return null;
    }

    try {
        // Request wallet connection
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        console.log("📝 Creating contract with ABI:", BeanStockABI);
        console.log("📝 Contract address:", BEAN_TOKEN_ADDRESS);

        const contract = new ethers.Contract(BEAN_TOKEN_ADDRESS, BeanStockABI, signer);

        // Test if contract works
        console.log("✅ Contract created successfully");
        return contract;
    } catch (err) {
        console.error("❌ Error connecting to contract:", err);
        return null;
    }
};