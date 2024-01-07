<script setup lang="ts">
import useWagmi from '@/composables/useWagmi';

const {config} = useWagmi();
onMounted(() => {
    console.log(config)
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
</style>
