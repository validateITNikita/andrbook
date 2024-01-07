import {
    GENTLEMEN_ADDRESS,
    GENTLEMEN_ADDRESS_TESTNET,
} from "@/const/blockchain";

export default () =>
    computed(() =>
        useRuntimeConfig().app.NUXT_IS_MAINNET === "true"
            ? GENTLEMEN_ADDRESS
            : GENTLEMEN_ADDRESS_TESTNET
    );
