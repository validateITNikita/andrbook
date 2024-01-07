<script setup lang="ts">
import { useNFTStore } from '~~/stores/NFTStore';
import { useUserStore } from '~~/stores/UserStore';

useHead({
        title: 'Inventory',
        link: [{
            rel: 'icon',
            type: 'image/vnd.microsoft.icon',
            href: '/favicon.ico'
        }]
    })
</script>

<template>
    <div class="h-fit flex-1 flex-col p-6 space-y-4 max-w-screen-2xl mx-auto">
        <div class="text-center xs:text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-black  break-words">
            Your Gentleman's NFTs:
        </div>
        <div class="border-2 border-white/30 rounded-lg h-fit min-h-[300px] min-w-full max-w-fit md:max-w-5xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-3 ">
            <div v-for="gentelman in useUserStore().CURRENT_USER.userGentelmans"
                :key="gentelman.tokenId"
            >
                <GentelmanCard 
                    :image="gentelman.image"
                    :token-id="gentelman.tokenId"
                    :rarity="gentelman.rarity"
                />
                
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>