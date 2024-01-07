<script setup lang="ts">
import { useAccount, useConnect, useDisconnect, useBalance } from "use-wagmi";
import { MetaMaskConnector } from "use-wagmi/connectors/metaMask";

import { toast } from "vue3-toastify";

import { STATUS } from "@/types/User";
import { addBSC } from "@/helpers/AddChain";

import { readMintPriceConfig } from "@/contract";
import { utils } from "ethers";

const { User } = useUser();

const { address, isConnected } = useAccount();

const { data: userBalance, refetch: refetchBalance } = useBalance({
    address: address,
    enabled: isConnected,
});

const { connect } = useConnect({
    connector: new MetaMaskConnector(),
    async onError(error: any) {
        toast.error(error?.message);
        User.value.status = STATUS.DISCONNECTED;
        await addBSC();
        connect();
    },
    onSuccess() {
        toast.success("Connected");
        User.value.status = STATUS.CONNECTED;
        refetchMintPrice();
    },
});

const { disconnect } = useDisconnect({
    onSuccess() {
        toast.success("Disconnected");
        User.value.status = STATUS.DISCONNECTED;
    },
});

</script>

<template>
    <div
        class="bg-black w-full h-full flex items-center justify-center md:justify-evenly px-5 py-2 mt-4 md:mb-2 xs:text-xs sm:text-base lg:text-lg xs:flex-col sm:flex-row xs:gap-2"
    >
        <div
            class="uppercase space-x-0 md:space-x-4 space-y-2 md:space-y-0 flex xs:flex-row items-center justify-center xs:space-y-0 xs:space-x-2"
        >
            <NavBarItem text="Home" toRoute="/" />
            <NavBarItem text="Inventory" toRoute="/inventory" />
        </div>

        <div
            class="flex xs:flex-row space-x-2 items-center text-center whitespace-nowrap"
        >
            <div class="xs:mx-0 mx-8" v-if="isConnected">
                {{ userBalance?.formatted }} tBNB
            </div>

            <div
                class="bg-white px-4 py-1.5 text-[#2e2e2e] font-semibold cursor-pointer z-10 rounded-lg"
                @click="
                    User.status === STATUS.CONNECTED ? disconnect() : connect()
                "
            >
                {{
                    User.status === STATUS.CONNECTED ? "Disconnect" : "Connect"
                }}
            </div>
        </div>
    </div>
</template>

<style scoped></style>
