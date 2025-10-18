import React, { useState } from "react";
import { ethers } from "ethers";
import { getBeanContract } from "../utils/contract";

export default function MintToken({ provider, onSuccess }) {
    const [status, setStatus] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("10");

    async function mint() {
        try {
            if (!provider) throw new Error("Wallet not connected");

            const contract = await getBeanContract(provider, true);
            const tx = await contract.mint(to, ethers.parseUnits(amount, 18));
            setStatus("⏳ Waiting for confirmation...");
            await tx.wait();
            setStatus("✅ Tokens minted!");
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error(err);
            setStatus("❌ " + (err.message || "Transaction failed"));
        }
    }

    return (
        <div style={{ marginTop: "1rem" }}>
            <input
                placeholder="Recipient address"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                style={{ marginRight: "1rem", width: "250px" }}
            />
            <input
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ marginRight: "1rem", width: "100px" }}
            />
            <button onClick={mint}>Mint</button>
            <p>{status}</p>
        </div>
    );
}
