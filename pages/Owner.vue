<script setup lang="ts">
import { registerRuntimeHelpers } from "@vue/compiler-core";
import { ethers } from "ethers";
import { storeToRefs } from "pinia";
import { useBlockchainStore } from "~~/stores/BlockchainStore";
import { useNFTStore } from "~~/stores/NFTStore";
import { useUserStore } from "~~/stores/UserStore";

useHead({
    title: "Owner",
});

interface IUsersData {
    owner: string;
    amount: number;
}

let data = ref<IUsersData[]>([]);
let amountOfHolders = ref<number>(0);
let loadingData = ref<boolean>(false);

async function LoadData() {
    data.value = [];
    if (loadingData.value) return;

    loadingData.value = true;
    const provider = new ethers.providers.JsonRpcProvider(
        "https://rpceu.cicscan.com"
    );

    const contract = new ethers.Contract(
        useNFTStore().NFT.CONTRACT,
        useNFTStore().ABI,
        provider
    );

    amountOfHolders.value = Number(await contract.totalSupply());

    for (let index = 0; index < amountOfHolders.value; index++) {
        const owner = <string>await contract.ownerOf(index);
        if (data.value.find((element) => element.owner == owner)) {
            let id = data.value.findIndex((el) => el.owner == owner);
            data.value[id].amount += 1;
        } else {
            data.value.push({
                owner: owner,
                amount: 1,
            });
        }
    }
    loadingData.value = false;
}
let mintPrice = ref<number>(0);
let newOwner = ref<string>("");

async function changeMintPriceTo() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        useNFTStore().NFT.CONTRACT,
        useNFTStore().ABI,
        signer
    );

    if (useUserStore().isUserOwner) {
        let result = confirm(
            "ARE YOU SURE YOU WANT TO CHANGE MINT PRICE TO " +
                mintPrice.value +
                " ? ?!!!"
        );

        if (result) {
            try {
                const tx = await contract.changeMintPrice(
                    mintPrice.value.toString() + "000000000000000000"
                );
                await tx.wait(1);

                await useUserStore().setupUser();
                await useNFTStore().initNFT();
            } catch (error) {
                console.log(error);
            }
        } else return;
    }
}
async function transferOwnerTo() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        useNFTStore().NFT.CONTRACT,
        useNFTStore().ABI,
        signer
    );

    if (useUserStore().isUserOwner) {
        let result = confirm(
            "ARE YOU SURE YOU WANT TO TRANFER OWNERSHIP TO " +
                newOwner.value +
                " ? ?!!!"
        );

        if (result) {
            try {
                const tx = await contract.transferOwnership(newOwner.value);
                await tx.wait(1);

                await useUserStore().setupUser();
                await useNFTStore().initNFT();
            } catch (error) {
                console.log(error);
            }
        } else return;
    }
}
</script>

<template>
    <div v-if="useUserStore().isUserOwner">
        <div
            class="mx-auto min-w-[200px] w-fit border-2 border-white/30 my-5 h-fit max-h-[500px] p-4 rounded-lg overflow-y-auto space-y-4"
        >
            <div class="mx-auto flex">
                {{ loadingData ? "Loading..." : "Done!" }}
            </div>
            <button
                @click="LoadData"
                class="mx-auto border-2 bg-white rounded flex font-bold"
            >
                LOAD DATA
            </button>

            <div class="flex justify-end items-center text-xl">
                <b>Total Supply:</b>
                &MediumSpace;
                {{ amountOfHolders }}
            </div>

            <div class="">
                <table class="table-auto">
                    <thead>
                        <tr>
                            <th class="px-2">Owner</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="({ amount, owner }, index) in data"
                            :key="index"
                        >
                            <td>
                                {{ owner }}
                            </td>
                            <td>
                                {{ amount }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div
            class="mx-auto min-w-[200px] w-fit border-2 border-white/30 my-5 h-fit max-h-[500px] p-4 rounded-lg overflow-y-auto space-y-4"
        >
            <div class="flex items-center space-x-2">
                <div class="text-red-500">Change Mint Price To:</div>
                <input
                    type="number"
                    class="text-white px-2 py-0.5"
                    v-model="mintPrice"
                    placeholder="Write your NFT price in CIC"
                />
                <div
                    class="border-2 border-white/30 bg-white hover:bg-white/40 text-black rounded flex w-fit duration-100 cursor-pointer select-none px-2"
                    @click="changeMintPriceTo"
                >
                    CHANGE
                </div>
            </div>
        </div>
        <div
            class="mx-auto min-w-[200px] w-fit border-2 border-white/30 my-5 h-fit max-h-[500px] p-4 rounded-lg overflow-y-auto space-y-4"
        >
            <div class="flex items-center space-x-2">
                <div class="text-red-500">Give Owner To:</div>
                <input
                    type="text"
                    class="text-white px-2 py-0.5"
                    v-model="newOwner"
                    placeholder="Write the address of new owner"
                />
                <div
                    class="border-2 border-white/30 bg-white hover:bg-white/40 text-black rounded flex w-fit duration-100 cursor-pointer select-none px-2"
                    @click="transferOwnerTo"
                >
                    GIVE OWNER
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
thead {
    font-weight: 700;
    text-transform: uppercase;
}
td {
    border-bottom: 2px;
    border-color: rgba(255, 255, 255, 10%);
    border-style: solid;
    padding: 5px 5px 5px 5px;
}
</style>
