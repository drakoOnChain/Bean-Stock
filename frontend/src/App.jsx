import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import Navbar from "./components/Navbar";
import Balance from "./components/Balance";
import MintToken from "./components/MintToken";
import BurnToken from "./components/BurnToken";
import { getContract } from "./utils/contract";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const [isOwner, setIsOwner] = useState(false);

  // Debug function to check ownership
  const debugOwnership = async () => {
    try {
      const contract = await getContract();
      if (!contract) {
        console.log("---! No contract found");
        return;
      }

      const owner = await contract.owner();
      const currentAccount = account;

      console.log("🔍 DEBUG OWNERSHIP:");
      console.log("Contract address:", import.meta.env.VITE_BEAN_CONTRACT_ADDRESS);
      console.log("Contract owner:", owner);
      console.log("Connected account:", currentAccount);
      console.log("Owner lowercase:", owner.toLowerCase());
      console.log("Account lowercase:", currentAccount.toLowerCase());
      console.log("Are they equal?", owner.toLowerCase() === currentAccount.toLowerCase());

    } catch (error) {
      console.error("---! Debug error:", error);
    }
  };

  // Test basic contract functions
  const testBasicFunctions = async () => {
    try {
      const contract = await getContract();
      console.log("- Testing basic functions...");

      const name = await contract.name();
      console.log("Token name:", name);

      const symbol = await contract.symbol();
      console.log("Token symbol:", symbol);

      const cap = await contract.cap();
      console.log("Token cap:", cap.toString());

    } catch (error) {
      console.error("---! Basic function test failed:", error);
    }
  };

  // Check if connected account is the contract owner
  const checkIfOwner = async (address) => {
    try {
      const contract = await getContract();
      if (!contract) return;

      const owner = await contract.owner();
      console.log("- Raw owner from contract:", owner);
      console.log("- Raw connected address:", address);

      const isOwnerMatch = owner.toLowerCase() === address.toLowerCase();
      console.log("- Ownership match:", isOwnerMatch);

      setIsOwner(isOwnerMatch);

    } catch (error) {
      console.error("---! Error checking owner:", error);
    }
  };

  // Connect MetaMask wallet
  const connectWallet = async () => {
    console.log("-- connectWallet function called");
    if (!window.ethereum) {
      console.log("---! MetaMask not found");
      return alert("MetaMask not found!");
    }
    try {
      console.log("-- Requesting accounts from MetaMask...");
      const [selectedAccount] = await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("-- Account connected:", selectedAccount);
      setAccount(selectedAccount);
      await loadBalance(selectedAccount);
      await checkIfOwner(selectedAccount);
      await debugOwnership();
      await testBasicFunctions();
    } catch (error) {
      console.error("---! Wallet connection failed:", error);
    }
  };

  // Load balance of connected account
  const loadBalance = async (address) => {
    console.log("-- loadBalance called for address:", address);
    try {
      const contract = await getContract();
      if (!contract) return;

      const balanceBN = await contract.balanceOf(address);
      const formattedBalance = ethers.formatUnits(balanceBN, 18);
      console.log("-- Balance:", formattedBalance);
      setBalance(formattedBalance);
    } catch (error) {
      console.error("---! Failed to load balance:", error);
    }
  };

  // Mint tokens - ONLY WORKS FOR OWNER
  const mintTokens = async (amount) => {
    console.log(" mintTokens function called with amount:", amount);

    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!isOwner) {
      alert(" Only contract owner can mint tokens!\n\nYou are not the owner of this contract. Only the shop/admin wallet can mint new tokens.");
      console.log(" User tried to mint but is not owner");
      return;
    }

    try {
      const contract = await getContract();
      if (!contract) return;

      const parsedAmount = ethers.parseUnits(amount, 18);
      console.log(" Calling mint function...");

      const tx = await contract.mint(account, parsedAmount);
      console.log(" Transaction sent:", tx);

      console.log(" Waiting for transaction confirmation...");
      await tx.wait();
      console.log(" Transaction confirmed!");

      await loadBalance(account);
      alert(" Tokens minted successfully!");
    } catch (error) {
      console.error("---! Minting failed:", error);

      if (error.message.includes("cap exceeded")) {
        alert("Minting failed: Cap exceeded - cannot mint more than total supply cap");
      } else if (error.message.includes("onlyOwner")) {
        alert("Minting failed: Only contract owner can mint tokens");
      } else {
        alert("Minting failed: " + error.message);
      }
    }
  };

  // Burn tokens - WORKS FOR ANY USER
  const burnTokens = async (amount) => {
    console.log(" burnTokens function called with amount:", amount);

    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }

    const currentBalance = parseFloat(balance);
    if (currentBalance < parseFloat(amount)) {
      alert(` Insufficient balance! You have ${balance} BEAN but trying to burn ${amount} BEAN`);
      return;
    }

    try {
      const contract = await getContract();
      if (!contract) return;

      const parsedAmount = ethers.parseUnits(amount, 18);
      console.log(" Calling burn function...");

      const tx = await contract.burn(parsedAmount);
      console.log(" Transaction sent:", tx);

      console.log(" Waiting for transaction confirmation...");
      await tx.wait();
      console.log(" Transaction confirmed!");

      await loadBalance(account);
      alert(" Tokens burned successfully!");
    } catch (error) {
      console.error("---! Burning failed:", error);
      alert("Burning failed: " + error.message);
    }
  };

  // In your App.jsx, add this useEffect to debug:
  useEffect(() => {
    console.log('🔍 Debug - mintTokens function:', typeof mintTokens);
    console.log('🔍 Debug - isOwner:', isOwner);
  }, [mintTokens, isOwner]);

  useEffect(() => {
    console.log("🔍 App mounted, checking for account...");
    if (account) {
      console.log(" Account found in state, loading balance...");
      loadBalance(account);
      checkIfOwner(account);
    }
  }, [account]);

  return (
    <div className="app">
      <Navbar account={account} connectWallet={connectWallet} />
      <main className="main-content container">
        <div className="dashboard">
          {/* Left Column - Actions */}
          <div className="left-column">
            <MintToken mintTokens={mintTokens} />
            <BurnToken burnTokens={burnTokens} balance={balance} />
          </div>

          {/* Right Column - Account Info */}
          <div className="right-column">
            <Balance balance={balance} />

            {/* Contract Info Card */}
            <div className="card contract-info">
              <h2>Contract Info</h2>
              <p><strong>Contract Address:</strong></p>
              <p style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
                {import.meta.env.VITE_BEAN_CONTRACT_ADDRESS}
              </p>
              <p><strong>Your Address:</strong></p>
              <p style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
                {account || 'Not connected'}
              </p>
              <p><strong>Network:</strong> Sepolia Testnet</p>
              <p><strong>Token:</strong> BEAN</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        BeanStock © {new Date().getFullYear()} — Crafted with ☕ & Solidity
      </footer>
    </div>
  );
}

export default App;