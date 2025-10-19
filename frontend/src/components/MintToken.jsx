import { useState } from "react";

function MintToken({ mintTokens }) {
    const [amount, setAmount] = useState("");

    const handleMint = async () => {
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        await mintTokens(amount);
        setAmount("");
    };

    return (
        <div className="card">
            <h2>Mint Tokens</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Create new BEAN tokens
            </p>
            <input
                type="number"
                placeholder="Enter amount to mint"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
            />
            <br />
            <button onClick={handleMint}>Mint Tokens</button>
        </div>
    );
}

export default MintToken;