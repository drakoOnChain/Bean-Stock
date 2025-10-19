function Balance({ balance }) {
    return (
        <div className="card">
            <h2>Your Balance</h2>
            <div className="balance-box">{balance} BEAN</div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                BeanStock Tokens
            </p>
        </div>
    );
}

export default Balance;