<script setup lang="ts">
const props = defineProps<{
    text: string,
    toRoute: string
}>();
</script>
<template>
    <NuxtLink
        :to="toRoute"
        class="text-white/80 hover:text-white duration-100 bg-black/10 rounded-lg px-4 py-1.5 font-base border border-solid border-white/30 visited:text-inherit z-10"
    >
        {{ text }}
    </NuxtLink>
</template>

<style lang="scss" scoped></style>
