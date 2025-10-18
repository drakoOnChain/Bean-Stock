import { ethers } from "ethers";

export const BEAN_TOKEN_ADDRESS = import.meta.env.VITE_BEAN_CONTRACT_ADDRESS;

export const BEAN_ABI = [
    "function balanceOf(address) view returns (uint256)",
    "function mint(address to, uint256 amount)",
    "function burn(uint256 amount)",
    "event TokensMinted(address indexed to, uint256 amount)",
    "event TokensBurned(address indexed from, uint256 amount)"
];

export async function getBeanContract(provider, withSigner = false) {
    if (!provider) throw new Error("Wallet not connected");

    if (withSigner) {
        const signer = await provider.getSigner();
        return new ethers.Contract(BEAN_TOKEN_ADDRESS, BEAN_ABI, signer);
    } else {
        return new ethers.Contract(BEAN_TOKEN_ADDRESS, BEAN_ABI, provider);
    }
}
