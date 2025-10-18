import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { ethers } from "ethers";
import { getBeanContract } from "../utils/contract";

const Balance = forwardRef(({ provider, account }, ref) => {
    const [balance, setBalance] = useState("0");

    const fetchBalance = async () => {
        if (!provider || !account) return;
        const contract = await getBeanContract(provider);
        const bal = await contract.balanceOf(account);
        setBalance(ethers.formatUnits(bal, 18));
    };

    useImperativeHandle(ref, () => ({
        refreshBalance: fetchBalance
    }));

    useEffect(() => {
        fetchBalance();
    }, [provider, account]);

    return <p>Your BEAN balance: {balance}</p>;
});

export default Balance;
