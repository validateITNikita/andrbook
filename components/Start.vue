<script lang="ts" setup>
import { formatEther, formatUnits } from 'ethers'
</script>

<template>
    <GentlemenSVG class="mt-10" />
    <div class="h-768px w-full relative flex items-end gap-x-8 justify-center z-10">

        <!-- images -->
        <div class="w-full relative" v-motion-slide-left>
            <img class="absolute left-0 w-1000px h-768px object-top object-cover bottom-0 opacity-70"
                src="/stroke_guy.png" />
            <img class="absolute bottom-0 left-30 w-500px h-768px object-top object-cover -right-5" src="/Gent.png" />
        </div>

        <div
            class="w-[500px] h-fit text-white absolute right-40 my-auto top-0 bottom-0 right-0 bg-gradient-to-b from-transparent to-white/10 backdrop-blur-xl py-6 px-10 rounded-lg border border-solid border-light/20 text-balance leading-normal space-y-2 flex flex-col gap-y-4">
            <p class="font-black text-5xl">Gentlemen NFT</p>
            <p class="opacity-75 text-lg">
                Stands out as a groundbreaking opportunity for enthusiasts and investors alike to
                delve into the world of finance through exclusive educational content. These non-fungible tokens represent more
                than just digital assets. 
                They unlock a wealth of knowledge curated by experts in the field.
            </p>
            <button class="border border-solid border-light/20 rounded-lg px-10 py-2 w-fit mr-auto bg-white/10 backdrop-blur-xl hover:bg-white shadow active:shadow-xl active:shadow-white/40 duration-100 text-white hover:text-black active:scale-90 cursor-pointer font-bold text-xl">
                MINT
            </button>
        </div>


    </div>
</template>



<style></style>