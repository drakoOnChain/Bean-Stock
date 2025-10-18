import React, { useState } from "react";
import { ethers } from "ethers";
import { getBeanContract } from "../utils/contract";

export default function BurnToken({ provider, onSuccess }) {
    const [status, setStatus] = useState("");
    const [amount, setAmount] = useState("1");

    async function burn() {
        try {
            if (!provider) throw new Error("Wallet not connected");

            const contract = await getBeanContract(provider, true);
            const tx = await contract.burn(ethers.parseUnits(amount, 18));
            setStatus("⏳ Waiting for confirmation...");
            await tx.wait();
            setStatus("✅ Tokens burned!");
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error(err);
            setStatus("❌ " + (err.message || "Transaction failed"));
        }
    }

    return (
        <div style={{ marginTop: "1rem" }}>
            <input
                placeholder="Amount to burn"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ marginRight: "1rem", width: "100px" }}
            />
            <button onClick={burn}>Burn</button>
            <p>{status}</p>
        </div>
    );
}
