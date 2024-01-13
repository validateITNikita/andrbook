import { address } from "types/Address";

export const USDT = "0xdac17f958d2ee523a2206206994597c13d831ec7";
export const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const PUBLIC_PROVIDER = "https://bsc-dataseed.binance.org/";

export const BSC_MAINNET_NETWORK = {
    chainId: "0x38",
    chainName: "Binance Smart Chain Mainnet",
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com/"],
    nativeCurrency: {
        name: "Binance Coin",
        symbol: "BNB",
        decimals: 18,
    },
};

export const BSC_TESTNET_NETWORK = {
    chainId: "0x61",
    chainName: "Binance Smart Chain Testnet",
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
    nativeCurrency: {
        name: "Binance Coin",
        symbol: "BNB",
        decimals: 18,
    },
};

export const GENTLEMEN_ADDRESS: address =
    "";
export const GENTLEMEN_ADDRESS_TESTNET: address =
    "0x3ea6ad9432Bd0C220cD052386a85Ac0E485587F4";
