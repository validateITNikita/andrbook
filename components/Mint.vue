<template>
    <div class="w-full h-768px relative">
        <MintNowSVG class="mt-6" />

        <div class="w-full h-fit flex items-center justify-center">
            <div class="w-600px h-600px">
                <img src="/Frederick Fairchild.jpg" alt="" class="" />
            </div>
            <div class="h-400px xl:w-500px h-400px xl:h-500px flex flex-col items-center justify-center space-y-4">
                <div class="flex flex-col items-center -space-y-10 xl:-space-y-14">
                    <div class="font-black text-150px xl:text-200px text-center">
                        ONLY
                    </div>
                    <div class="font-semibold text-75px xl:text-100px text-center">
                        {{ getMintPrice }} USDT
                    </div>
                </div>

                <div class="w-fit mx-auto text-black font-semibold text-center px-10 py-2 bg-white rounded-xl text-4xl cursor-pointer z-10"
                    @click="useNFTStore().mint">
                    MINT GENTLEMEN
                </div>

                <div class="w-full h-full text-center text-white text-opacity-70 text-2xl font-bold">
                    <p>
                        {{ totalSupply }} /
                        {{ maxSupply }}
                    </p>
                    <p>GENTLEMEN MINTED</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useNFTStore } from '@/stores/NFTStore'
import { gentlemenABI } from '@/contract/abi'
import { useReadContract } from 'use-wagmi'
const { mintPrice, getMintPrice, refetchMintPrice } = useMintPrice();
// const { totalSupply, maxSupply, refetchMaxSupply, refetchTotalSupply } =
//     useTotalSupply();
const { data: maxSupply, refetch: refetchMaxSupply } = useReadContract({
    abi: gentlemenABI,
    address: useGetContractAddress(),
    functionName: '_maxSupply'
})

const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    abi: gentlemenABI,
    address: useGetContractAddress(),
    functionName: 'totalSupply',
})
    refetchMaxSupply();
    refetchTotalSupply();
    refetchMintPrice();
</script>

<style></style>