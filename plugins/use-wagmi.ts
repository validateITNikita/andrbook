import { http, createConfig } from 'use-wagmi'
import { bscTestnet } from 'use-wagmi/chains'
import { VueQueryPlugin } from "@tanstack/vue-query"
import { injected } from '@wagmi/connectors' 

export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http('https://bsc-testnet.publicnode.com'),
  },
  connectors: [
    injected()
  ]
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(UseWagmiPlugin, { config });
  nuxtApp.vueApp.use(VueQueryPlugin)
});
