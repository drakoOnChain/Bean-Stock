

##  BeanToken DApp — Tokenized Coffee Rewards

### Overview

**BeanToken** is a decentralized ERC-20 token project built to simulate a real-world coffee shop loyalty system on the blockchain. Customers earn BEAN tokens for every coffee purchase, which can later be burned for discounts or rewards.

This project combines **Solidity smart contracts**, **Hardhat**, and a **React + Vite + Ethers.js** frontend to form a complete Web3 DApp. It demonstrates the full development cycle:
writing, testing, deploying, and interacting with an ERC-20 token through a connected MetaMask wallet.

---

###  Background

I built **BeanToken** as part of my blockchain learning journey to understand the bridge between smart contracts and the frontend layer.
Originally, I worked only in Solidity — writing contracts, deploying, and testing on Remix or Hardhat. But this project marks the transition into **full-stack Web3 development**, integrating blockchain logic with real-world UI components.

It represents a tokenized micro-economy:

* The **owner (shop)** can mint tokens for customers (simulating reward points).
* **Customers** can burn tokens to redeem coffee or discounts.
* Every transaction updates instantly through MetaMask and Ethers.js.

The goal is to replicate how token economies can drive user engagement and automation in small business ecosystems.

---


###  Smart Contract Overview

**File:** `contracts/BeanToken.sol`

* Inherits from OpenZeppelin ERC-20 implementation.
* Owner-only minting and open burning.
* Emits events `TokensMinted` and `TokensBurned`.

#### Key Functions

* `mint(address to, uint256 amount)` — Owner mints new tokens.
* `burn(uint256 amount)` — Any wallet can burn their tokens.
* `balanceOf(address)` — View balance for any address.

---

###  Frontend Setup

**Folder Structure**

```
frontend/
 ├─ src/
 │   ├─ components/
 │   │   ├─ Navbar.jsx
 │   │   ├─ Balance.jsx
 │   │   ├─ MintToken.jsx
 │   │   └─ BurnToken.jsx
 │   ├─ utils/
 │   │   └─ contract.js
 │   ├─ App.jsx
 │   └─ main.jsx
 ├─ .env
 └─ package.json
```

**.env**

```bash
VITE_BEAN_CONTRACT_ADDRESS="0xYourDeployedContractAddressHere"
VITE_NETWORK_NAME="sepolia"
```

**Install and Run**

```bash
cd frontend
npm install
npm run dev
```

---

###  Interaction Flow

1. **Connect Wallet** — MetaMask popup opens automatically.
2. **View Balance** — Displays the current BEAN token balance.
3. **Mint Tokens** — Owner can send BEAN tokens to any address.
4. **Burn Tokens** — Any user can burn BEANs from their wallet.
5. **Auto Refresh** — Balance updates instantly after each transaction.

---

###  Learning Outcomes

Through this project, I gained deeper understanding of:

* Connecting Ethers.js with MetaMask using React hooks.
* Using contract ABI to call read/write functions from the browser.
* Managing private/public UI elements for different wallet roles.
* Structuring modular DApp components for clarity and scalability.

---


