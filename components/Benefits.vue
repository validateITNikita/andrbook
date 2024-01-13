<script lang="ts" setup>
import { useWindowScroll, useWindowSize } from '@vueuse/core';

const playAnimation = ref(false);
const timePlayed = ref(0);
const { y } = useWindowScroll()
const { height } = useWindowSize()

watch(y, () => {
    if (y.value > height.value * 0.7 && timePlayed.value < 1) {
        playAnimation.value = true
        timePlayed.value += 1;
    } else if (y.value < height.value * 0.7 && timePlayed.value > 1) {
        playAnimation.value = false
    }
})
</script>

<template>
    <div class="w-full h-768px relative mt-20">
        <div
            class="w-90% h-90% mx-auto z-10 rounded-[43px] backdrop-blur-md p-10 space-y-10 flex flex-col items-center justify-center relative ">

            <BenefitsSVG v-motion-roll-bottom class="mt-6"/>

            <div class="mx-auto flex-col w-1/2 px-4 z-10">
                <ol
                    class="list-disc list-inside font-semibold leading-[1.45] text-xl xl:text-2xl grid grid-cols-2 gap-4 text-left">
                    <li v-motion-slide-left>
                        Have the opportunity to engage in weekly analyses of
                        the cryptocurrency world
                    </li>
                    <li v-motion-slide-left>
                        Examine assets in the traditional market
                    </li>
                    <li v-motion-slide-left>
                        Stay informed about assets with good dividend
                        profitability
                    </li>
                    <li v-motion-slide-left>
                        Explore market direction possibilities, and more.
                    </li>
                </ol>
                <div v-motion-slide-bottom
                    class="w-fit mx-auto text-white/70 text-lg xl:text-2xl font-normal text-center py-2 mt-10">
                    P.S. These resources, including investment strategies,
                    technical analysis learning, management maps, ebooks,
                    and much more, enable participants to expand their
                    knowledge and enhance their financial skills, striving
                    to achieve better results in their investment journeys.
                </div>
            </div>


        </div>
        <div v-if="playAnimation" class="absolute inset-0 flex flex-col scale-x-125">
            <svg width="2329" height="928" viewBox="0 0 2329 928" :class="{ 'drawing-animation': playAnimation }"
                class="h-fit absolute -top-30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="strokeGradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stop-color="#FFD700" />
                        <stop offset="100%" stop-color="#343049" />
                    </linearGradient>
                    <filter id="glowEffect" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    d="M1.90332 926.45C7.25005 895.643 24.4078 871.98 44.2887 848.344C74.685 812.206 112.449 785.085 157.761 771.659C207.501 756.921 259.758 761.707 311.13 761.707C419.881 761.707 528.488 767.212 637.239 766.505C683.06 766.208 729.2 764.353 774.259 755.398C822.368 745.837 869.641 729.464 916.432 714.968C1009.53 686.125 1098.87 647.799 1185.14 602.473C1288.1 548.375 1375.47 470.401 1456.69 387.97C1539.51 303.917 1619.02 217.381 1705.94 137.389C1752.64 94.4068 1802.96 51.9561 1860.11 23.3844C1898.55 4.16169 1941.02 0.579539 1983.35 2.14728C2001.77 2.82941 2018.28 9.39654 2035.33 16.0092C2065.03 27.5255 2093.38 41.3919 2120.99 57.2394C2152.77 75.4745 2181.87 99.9622 2216.6 112.509C2249 124.213 2298.37 130.977 2327.5 109.133"
                    stroke="url(#strokeGradient)" stroke-width="5" stroke-linecap="round" filter="url(#glowEffect)" />
            </svg>

            <svg :class="{ 'drawing-animation': playAnimation }" class="h-fit absolute top-10 bottom-0" width="2014"
                height="766" viewBox="0 0 2014 766" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="glowEffect" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                        <feFlood flood-color="white" result="glowColor" />
                        <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    d="M2 764C6.62114 738.611 21.4505 719.11 38.6334 699.632C64.9048 669.85 97.544 647.499 136.707 636.435C179.697 624.289 224.863 628.233 269.263 628.233C363.256 628.233 457.124 632.769 551.117 632.187C590.72 631.942 630.598 630.414 669.542 623.034C711.123 615.154 751.981 601.661 792.422 589.715C872.884 565.945 950.102 534.36 1024.66 497.006C1113.66 452.423 1189.16 388.164 1259.36 320.231C1330.95 250.962 1399.66 179.647 1474.79 113.725C1515.15 78.3022 1558.65 43.3181 1608.03 19.7717C1641.26 3.93006 1677.97 0.977965 1714.55 2.26996C1730.47 2.83212 1744.75 8.24417 1759.48 13.6937C1785.15 23.1845 1809.65 34.612 1833.52 47.6721C1860.98 62.6999 1886.14 82.8805 1916.15 93.2206C1944.16 102.866 1986.83 108.441 2012 90.4379"
                    stroke="red" stroke-width="3" stroke-linecap="round" filter="url(#glowEffect)" />
            </svg>

            <svg width="1927" height="558" viewBox="0 0 1927 558" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2 556C6.42112 537.542 20.6086 523.364 37.0478 509.202C62.1821 487.55 93.4085 471.3 130.876 463.256C172.006 454.425 215.216 457.293 257.695 457.293C347.62 457.293 437.425 460.591 527.35 460.168C565.238 459.99 603.39 458.878 640.649 453.513C680.429 447.784 719.519 437.974 758.21 429.289C835.189 412.007 909.064 389.044 980.399 361.887C1065.54 329.473 1137.78 282.754 1204.94 233.365C1273.42 183.004 1339.17 131.155 1411.04 83.2277C1449.66 57.4743 1491.27 32.0396 1538.52 14.9207C1570.31 3.40322 1605.43 1.25695 1640.43 2.19627C1655.66 2.60498 1669.31 6.53972 1683.41 10.5017C1707.97 17.4019 1731.41 25.71 1754.24 35.2051C1780.52 46.1309 1804.58 60.8029 1833.3 68.3205C1860.09 75.3331 1900.92 79.3859 1925 66.2974"
                    stroke-width="10" stroke-linecap="round" />
            </svg>

            <svg :class="{ 'drawing-animation': playAnimation }" class="h-fit absolute bottom-4" width="1927" height="558"
                viewBox="0 0 1927 558" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="glowEffect" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    d="M2 556C6.42112 537.542 20.6086 523.364 37.0478 509.202C62.1821 487.55 93.4085 471.3 130.876 463.256C172.006 454.425 215.216 457.293 257.695 457.293C347.62 457.293 437.425 460.591 527.35 460.168C565.238 459.99 603.39 458.878 640.649 453.513C680.429 447.784 719.519 437.974 758.21 429.289C835.189 412.007 909.064 389.044 980.399 361.887C1065.54 329.473 1137.78 282.754 1204.94 233.365C1273.42 183.004 1339.17 131.155 1411.04 83.2277C1449.66 57.4743 1491.27 32.0396 1538.52 14.9207C1570.31 3.40322 1605.43 1.25695 1640.43 2.19627C1655.66 2.60498 1669.31 6.53972 1683.41 10.5017C1707.97 17.4019 1731.41 25.71 1754.24 35.2051C1780.52 46.1309 1804.58 60.8029 1833.3 68.3205C1860.09 75.3331 1900.92 79.3859 1925 66.2974"
                    stroke="white" stroke-width="3" stroke-linecap="round" filter="url(#glowEffect)" />
                <path
                    d="M2 556C6.42112 537.542 20.6086 523.364 37.0478 509.202C62.1821 487.55 93.4085 471.3 130.876 463.256C172.006 454.425 215.216 457.293 257.695 457.293C347.62 457.293 437.425 460.591 527.35 460.168C565.238 459.99 603.39 458.878 640.649 453.513C680.429 447.784 719.519 437.974 758.21 429.289C835.189 412.007 909.064 389.044 980.399 361.887C1065.54 329.473 1137.78 282.754 1204.94 233.365C1273.42 183.004
    1339.17 131.155 1411.04 83.2277C1449.66 57.4743 1491.27 32.0396 1538.52 14.9207C1570.31 3.40322 1605.43 1.25695 1640.43 2.19627C1655.66 2.60498 1669.31 6.53972 1683.41 10.5017C1707.97 17.4019 1731.41 25.71 1754.24 35.2051C1780.52 46.1309 1804.58 60.8029 1833.3 68.3205C1860.09 75.3331 1900.92 79.3859 1925 66.2974"
                    stroke="lightgreen" stroke-width="3" stroke-linecap="round" filter="url(#glowEffect)" />
            </svg>

        </div>
    </div>
</template>

<style></style>