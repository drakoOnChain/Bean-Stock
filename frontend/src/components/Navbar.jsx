
function Navbar({ account, connectWallet }) {
    return (
        <nav className="navbar">
            <h1>BeanStock</h1>
            <button onClick={connectWallet}>
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
            </button>
        </nav>
    );
}

export default Navbar;
