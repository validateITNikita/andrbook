import { BSC_MAINNET_NETWORK, BSC_TESTNET_NETWORK } from "@/const/blockchain";

export const addBSCMainnet = async () => {
    try {
        // Check if MetaMask is installed
        if (window.ethereum) {
            // Request MetaMask to add the BSC Mainnet network
            await window.ethereum.request!({
                method: "wallet_addEthereumChain",
                params: [BSC_MAINNET_NETWORK],
            });

            // Network added successfully
            console.log("BSC Mainnet added to MetaMask");
        } else {
            // MetaMask not installed
            console.log("MetaMask is not installed");
        }
    } catch (error) {
        // Error adding or switching network
        console.error("Error:", error);
    }
};

export const addBSCTestnet = async () => {
    try {
        // Check if MetaMask is installed
        if (window.ethereum) {
            // Request MetaMask to add the BSC Testnet network
            await window.ethereum.request!({
                method: "wallet_addEthereumChain",
                params: [BSC_TESTNET_NETWORK],
            });

            // Network added successfully
            console.log("BSC Testnet added to MetaMask");
        } else {
            // MetaMask not installed
            console.log("MetaMask is not installed");
        }
    } catch (error) {
        // Error adding or switching network
        console.error("Error:", error);
    }
};

export const addBSC = async () => {
    useRuntimeConfig().app.NUXT_IS_MAINNET === "true"
        ? addBSCMainnet()
        : addBSCTestnet();
};
