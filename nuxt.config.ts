// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "nuxt-icon",
        "@unocss/nuxt",
        "@pinia/nuxt",
        "@vueuse/motion/nuxt",
        "@vueuse/nuxt",
        "@use-wagmi/nuxt",
    ],
    pinia: {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
    },
    ssr: false,
    build: {
        transpile: ["vue3-toastify"],
    },
    wagmi: {
        autoImports: false,
    },
    runtimeConfig: {
        app: {
            NUXT_IS_MAINNET: process.env.NUXT_IS_MAINNET,
        }
    }
});
