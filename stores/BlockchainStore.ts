import { ethers } from "ethers";
import type EthChain from "~/types/EthChain";
import { useNFTStore } from "./NFTStore";
import { useUserStateStore } from "./UserStateStore";
import { useUserStore } from "./UserStore";

export const useBlockchainStore = defineStore("blockchainStore", () => {
    const TESNET_NETWORK: EthChain = {
        chainName: "Crazy Internet Coin",
        blockExplorerUrls: [],
        rpcUrls: ["https://testapi.cicscan.com/"],
        chainId: ethers.toBeHex(1252),
        nativeCurrency: {
            name: "CICT",
            symbol: "CICT",
            decimals: 18,
        },
    };

    const NETWORK: EthChain = {
        chainName: "Crazy Internet Coin",
        blockExplorerUrls: ["https://cicscan.com"],
        rpcUrls: ["https://rpceu.cicscan.com"],
        chainId: ethers.toBeHex(1353),
        nativeCurrency: {
            name: "CIC",
            symbol: "CIC",
            decimals: 18,
        },
    };

    const TESTNET_CHAIN_ID = TESNET_NETWORK.chainId;
    const CHAIN_ID = NETWORK.chainId;

    const getAccount = async (provider: typeof window.ethereum) => {
        if (!provider.request) return;

        const accounts = await provider.request({
            method: "eth_requestAccounts",
        });

        useUserStore().CURRENT_USER.address = ethers.getAddress(
            accounts[0]
        );
    };

    // const getChainId = async (provider : typeof window.ethereum) => {
    //     if(!provider.request) return;

    //     useUserStore().CURRENT_USER.value = await provider.request({method : 'eth_chainId'});

    //     return chainId;
    // }

    const getSigner = async (
        provider: typeof window.ethereum
    ): Promise<ethers.JsonRpcSigner> => {
        const localProvider = new ethers.BrowserProvider(
            provider
        );

        let signer = markRaw(
            localProvider.getSigner(<string>useUserStore().CURRENT_USER.address)
        );

        return signer;
    };

    const switchChain = async (
        provider: ethers.BrowserProvider,
        localChain: string
    ) => {
        try {
            await provider.send("wallet_switchEthereumChain", {
                chainId: localChain,
            });
        } catch (error) {
            // ! TRY TO ADD CHAIN
            throw error;
        }
    };

    const accountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) disconnect(window.ethereum);
        else
            useUserStore().CURRENT_USER.address = ethers.getAddress(
                accounts[0]
            );
        useUserStore().setupUser();
    };

    const chainChanged = async () => {
        await disconnect(window.ethereum);
    };

    const connect = async (provider: typeof window.ethereum) => {
        if (provider.on) {
            provider.on("accountsChanged", accountsChanged);
            provider.on("chainChanged", chainChanged);
            provider.on("disconnect", disconnect);
        }

        await getAccount(provider);
        // await getChainId(provider);
        await getSigner(provider);
    };

    const disconnect = async (provider: typeof window.ethereum) => {
        if (!provider.removeListener) return;

        provider.removeListener("accountsChanged", accountsChanged);
        provider.removeListener("chainChanged", chainChanged);
        provider.removeListener("disconnect", disconnect);

        useUserStore().CURRENT_USER.address = null;

        useUserStateStore().IS_USER_CONNECTED = false;
    };

    return {
        NETWORK,
        TESNET_NETWORK,
        TESTNET_CHAIN_ID,
        CHAIN_ID,
        switchChain,
        connect,
        disconnect,
        getSigner,
    };
});
