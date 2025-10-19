import { useState } from "react";

function BurnToken({ burnTokens, balance }) {
    const [amount, setAmount] = useState("");

    const handleBurn = async () => {
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        if (parseFloat(balance) < parseFloat(amount)) {
            alert(`Insufficient balance! You have ${balance} BEAN`);
            return;
        }

        await burnTokens(amount);
        setAmount("");
    };

    return (
        <div className="card">
            <h2>Burn Tokens</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Destroy BEAN tokens (irreversible)
            </p>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                Your balance: <strong>{balance} BEAN</strong>
            </p>
            <input
                type="number"
                placeholder="Enter amount to burn"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                max={balance}
            />
            <br />
            <button onClick={handleBurn}>Burn Tokens</button>
        </div>
    );
}

export default BurnToken;