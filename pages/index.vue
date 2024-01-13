<script setup lang="ts">

useHead({
    title: "Home",
    link: [
        {
            rel: "icon",
            type: "image/vnd.microsoft.icon",
            href: "/favicon_home.ico",
        },
    ],
});

const { mintPrice, getMintPrice, refetchMintPrice } = useMintPrice();
const { totalSupply, maxSupply, refetchMaxSupply, refetchTotalSupply } =
    useTotalSupply();

</script>

<template>
    <!-- * SMALL SCREENS -->
    <div class="block md:hidden w-full h-full relative bg-black overflow-clip p-4">
        <div class="text-transparent text-[2.7rem] font-black text-center text-stroke-2 text-stroke-white">
            GENTLEMEN
        </div>

        <div class="relative w-full h-500px">
            <div v-motion-slide-right
                class="w-60% ml-auto h-fit text-white text-2xl font-black break-keep absolute text-right right-0 z-10 bottom-8">
                The Gentlemen NFT collection emerges as an unique opportunity to
                acquire exclusive educational content about finance.
            </div>

            <!-- ? images -->
            <div class="w-full h-500px -translate-x-25 absolute right-20 mr-auto relative" v-motion-slide-left>
                <img class="absolute left-0 h-[500px] object-center object-cover bottom-0 opacity-70"
                    src="/stroke_guy.png" />
                <img class="absolute top-0 left-0 h-[500px] object-center object-cover -top-5 -right-5"
                    src="/HomeMan.png" />
            </div>

            <div class="w-full h-3px bg-white rounded-xl absolute bottom-0 left-0 right-0" />
        </div>

        <div class="text-white text-[5rem] font-black w-fit mx-auto">
            <p v-motion-slide-left class="text-center">WHAT</p>
            <p v-motion-slide-left class="text-center">YOU</p>
            <p v-motion-slide-left class="text-center">GET?</p>
        </div>
        <div class="mx-auto w-fit px-4">
            <ol class="list-disc list-inside font-semibold leading-[1.45] text-2xl">
                <li v-motion-slide-left>
                    Have the opportunity to engage in weekly analyses of the
                    cryptocurrency world
                </li>
                <li v-motion-slide-left>
                    Examine assets in the traditional market
                </li>
                <li v-motion-slide-left>
                    Stay informed about assets with good dividend profitability
                </li>
                <li v-motion-slide-left>
                    Explore market direction possibilities, and more.
                </li>
            </ol>
            <div v-motion-slide-bottom class="w-fit mx-auto text-white/70 text-[20px] font-normal text-center py-2">
                P.S. These resources, including investment strategies, technical
                analysis learning, management maps, ebooks, and much more,
                enable participants to expand their knowledge and enhance their
                financial skills, striving to achieve better results in their
                investment journeys.
            </div>
        </div>

        <div class="text-center text-7xl font-black text-stroke-2 text-stroke-white text-transparent">
            MINT NOW !
        </div>
        <div class="text-center text-white text-3xl font-black">
            ONLY {{ getMintPrice }} USDT
        </div>
        <div class="w-full h-full py-4">
            <div class="w-full h-fit bg-white rounded-2xl">
                <div class="text-black text-2xl font-bold text-center py-2">
                    MINT GENTLEMEN
                </div>
            </div>
        </div>
        <div class="w-full h-full text-center text-white text-opacity-70 text-[23px] font-bold">
            <p>
                {{ totalSupply }} /
                {{ maxSupply }}
            </p>
            <p>GENTLEMEN MINTED</p>
        </div>
        <div class="h-350px w-full">
            <img src="/Frederick Fairchild.jpg" alt="" class="w-full h-500px object-top object-cover" />
        </div>
    </div>

    <!-- * LARGE SCREENS -->
    <div class="hidden md:block w-full h-full bg-black overflow-clip pb-16 max-w-screen-xl mx-auto">
        <!-- section 1 -->
        <Start />

        <!-- stroke -->
        <div class="w-90% mx-auto h-3px bg-white/50 rounded-xl" />

        <!-- section 2 -->

        <Benefits />

        <!-- stroke -->
        <div class="w-90% mx-auto h-3px bg-white/50 rounded-xl" />

        <!-- section 3 -->
        <Mint />
    </div>
</template>

<style>
div {
    user-select: none;
}

.titleStroke {
    color: transparent;
    -webkit-text-stroke: 3px white;
}

.titleStrokeWhite {
    -webkit-text-stroke: 2px white;
    -webkit-text-stroke: 2px white;
}

@keyframes draw {
    to {
        stroke-dashoffset: 0;
    }
}

.drawing-animation {
    stroke-dasharray: 3000;
    /* Set to the total length of your SVG path */
    stroke-dashoffset: 3000;
    /* Set to the total length of your SVG path */
    animation: draw 4s linear forwards;
    /* Adjust the duration as needed */
    transition: stroke-dashoffset 0.5s;
}
</style>
