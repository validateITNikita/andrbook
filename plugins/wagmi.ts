import { UseWagmiPlugin, createConfig } from "use-wagmi";
import { bsc, bscTestnet } from "@wagmi/chains";
import { createPublicClient, http } from "viem";

export default defineNuxtPlugin((nuxtApp) => {
    const config = createConfig({
        autoConnect: true,
        publicClient: createPublicClient({
            chain:
                useRuntimeConfig().app.NUXT_IS_MAINNET === "true"
                    ? bsc
                    : bscTestnet,
            transport: http(),
        }),
    });

    nuxtApp.vueApp.use(UseWagmiPlugin, config);
});
