import React, { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Balance from "./components/Balance";
import MintToken from "./components/MintToken";
import BurnToken from "./components/BurnToken";

export default function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const balanceRef = useRef();

  const refreshBalance = () => {
    if (balanceRef.current) balanceRef.current.refreshBalance();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Navbar setProvider={setProvider} setAccount={setAccount} account={account} />
      {account && (
        <>
          <Balance ref={balanceRef} provider={provider} account={account} />
          <MintToken provider={provider} onSuccess={refreshBalance} />
          <BurnToken provider={provider} onSuccess={refreshBalance} />
        </>
      )}
    </div>
  );
}
