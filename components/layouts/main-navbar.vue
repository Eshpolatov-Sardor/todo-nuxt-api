<script setup lang="ts">

</script>

<template>
  <div class="fixed top-0 left-0 z-10 w-full bg-gradient-to-t from-white to-white text-black dark:bg-black dark:text-gray-200 dark:from-gray-800">
    <div class="flex items-center justify-between md:w-[1280px] w-full mx-auto h-24">
        <div class="flex items-center justify-center gap-4">
            <NuxtImg class="w-10 h-10" src="/image copy 3.png" />
            <h1 class="text-3xl font-bold">Todo Page</h1>
        </div>
        <div class="flex items-center justify-center gap-4">
            <SheadsColorMode></SheadsColorMode>
            <UButton>
                Get it free
            </UButton>
            <UButton >
                <NuxtLink to="/login">Login</NuxtLink>
            </UButton>
        </div>
    </div>
  </div>
</template>

<style scoped>

</style>