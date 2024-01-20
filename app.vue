<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { useCssVar } from '@vueuse/core'

const { x, y } = useMouse();

// css var to follow mouse position
const xPos = useCssVar('--x');
const yPos = useCssVar('--y');

watchEffect(() => {
    xPos.value = x.value.toString() + 'px';
    yPos.value = y.value.toString() + 'px';
})
</script>
<template>
    <div>
        <NavBar />
        <NuxtPage />
    </div>
</template>
<style>
@import url("@/styles/basic.css");

body::after {
    content: "";
    position: absolute;
    width: 350px;
    height: 300px;
    opacity: 0.08;
    border-radius: 100%;
    top: var(--y);
    z-index: 0;
    left: var(--x);
    background: white;
    transform: translate(-50%, -50%);
    transition: top 0.1s ease, left 0.1s ease; /* Add smooth transition */
    filter: blur(50px);
}
</style>
