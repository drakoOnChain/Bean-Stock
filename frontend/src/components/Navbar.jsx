import React from "react";
import { ethers } from "ethers";

export default function Navbar({ setProvider, setAccount, account }) {
    const connectWallet = async () => {
        try {
            if (!window.ethereum) throw new Error("MetaMask not installed");

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const account = accounts[0];
            const provider = new ethers.BrowserProvider(window.ethereum);

            setProvider(provider);
            setAccount(account);
        } catch (err) {
            console.error("Wallet connection failed:", err);
            alert(err.message || "Failed to connect wallet");
        }
    };

    return (
        <nav style={{ marginBottom: "1rem" }}>
            {!account ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <span>Connected: {account}</span>
            )}
        </nav>
    );
}
