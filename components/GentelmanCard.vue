
<script setup lang="ts">

import {RARITY} from '~/types/GentelmanNFT'
import { useNFTStore } from '~~/stores/NFTStore';

interface Props {
    tokenId : number | string,
    rarity: RARITY,
    image : string
}

const props = defineProps<Props>();
const receiverAddress = ref<string>('');
</script>

<template>
    <div class="border border-white/30 rounded-lg flex flex-col w-fit ">
        <img :src="props.image" alt="nft" class="w-[300px] h-[300px] object-cover rounded-t-lg">
        
        <div class="px-2 py-2">
            <div class="text-xl">
                <b>Rarity:</b> {{ props.rarity }}
            </div>
            <div class="text-xl">
                <b>ID:</b> {{ props.tokenId}}
            </div>

            <div class="gap-1 flex">
                <div>SEND TO: </div>
                <input type="text" 
                class="text-white px-2"
                placeholder="address"
                v-model="receiverAddress"
                />
                <button class="bg-white px-2 py-0.5 rounded"
                @click="useNFTStore().sendGentelmanTo(receiverAddress, Number(tokenId))"
                >
                    SEND
                </button>
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>