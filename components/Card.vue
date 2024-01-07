<script setup lang="ts">
interface Props{
    src: string
}

const props = defineProps<Props>();
</script>

<template>
    <div class="flex flex-col xs:w-full sm:w-[75%] mx-auto items-center h-full xs:space-y-2 sm:space-y-4 shadow-md hover:shadow-2xl hover:shadow-white/30 transition-all">

        <div class="flex flex-col space-y-2 border border-white/40 rounded-lg h-full">
            
            <img :src="src" alt="" class="mx-auto object-cover w-full h-[200px] rounded-t-lg shadow-md shadow-white/20" />

            <div class="h-fit flex flex-col items-center justify-center space-y-4 px-2 xs:py-2 sm:py-4">

                <div class="xs:text-3xl sm:text-4xl font-extrabold uppercase text-center break-words xs:min-h-[40px] sm:min-h-[80px] grid place-items-center">
                    <slot name="title">
                    </slot>
                </div>

                <div class="w-[90%] h-0.5 bg-white/10 rounded-xl"/>

                <div class="text-lg text-md font-normal text-white/80 items-start justify-start flex px-4 ">
                    <slot name="description">
        
                    </slot>
                </div>
            </div>
        </div>

        
    </div>
</template>


<style scoped>

</style>