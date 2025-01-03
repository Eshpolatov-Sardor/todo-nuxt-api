<script setup lang="ts">
import { tabs } from "~/constant/index";

useHead({
    title: "One Page",
})
</script>

<template>
  <div>
    <LayoutsMainNavbar />
    <main class="pb-24">
      <section class="flex items-center justify-between h-[100vh] gap-4 bg-gradient-to-t from-white dark:bg-black to-blue-500 dark:from-blue-800">
        <div class="pl-24 flex flex-col space-y-3">
          <h1 class="text-5xl font-bold mb-4">If you want to create a page for the document.</h1>
          <p class="mb-4 text-xl">You can create a new page in the pages directory.</p>
          <UButton class="w-32">Get it free</UButton>
        </div>
        <NuxtImg src="/hero.webp" /> 
      </section> 
 
      <section class="relative">
        <h1 class="text-4xl font-bold z-10 -mt-12">All from a single source of truth</h1>
        <UTabs :items="tabs" :ui="{ list: { width: 'w-fit' } }">
          <template #item="{ item }">
            <div class="flex items-center justify-between gap-6 mt-8">
              <div class="w-[40%]"> 
                <h1 class="text-4xl font-bold">{{ item.label }}</h1>
                <p class="text-xl mt-6">{{ item.description }}</p>
                <div class="py-4 mt-12 rounded-r-full flex flex-col space-y-2 bg-gradient-to-r from-white dark:from-black to-blue-500 dark:to-blue-800">
                  <Icon name="gridicons:quote" class="text-7xl" />
                  <p class="text-lg pl-2">{{ item.credentials.text }}</p>
                  <div class="pl-2 opacity-75"> 
                    <p class="text-lg">{{ item.credentials.username }}</p>
                    <p class="text-sm">{{ item.credentials.company }}</p>
                  </div>
                </div>
              </div>
              <NuxtImg :src="item.image" class="w-[60%]" />
            </div>
          </template>
        </UTabs>
      </section>

      <section class="p-10 flex flex-col items-center">
        <h1 class="text-4xl font-bold mb-8 text-center">How it works for you</h1> 
        <div class="flex items-center justify-center">
            <div class="rounded-full p-6 flex items-center justify-center bg-blue-600 ">
                <Icon name="i-heroicons-document-plus" class="text-white text-4xl" />
            </div>
          <div class="h-[8px] w-[600px] bg-gray-600 bg-gradient-to-l from-gray-600 to-blue-800"></div>
          <div class="rounded-full p-6 flex items-center justify-center bg-gray-600 ml-auto">
            <Icon name="i-heroicons-share" class="text-white text-4xl" />
          </div>
        </div>
        <div class="flex items-center justify-between mt-8 gap-10">
            <div class="bg-blue-700 mt-8 w-full p-6 rounded-md">
                <h2 class="text-white text-xl font-semibold mb-2">Templates give you a head start</h2>
                <p class="text-gray-300 mb-6">Get started with ready-made templates.</p>
                <div class="space-y-2">
                    <div class="bg-blue-800 p-4 rounded-md flex items-center">
                    <Icon name="i-heroicons-arrow-path" class="text-green-400 mr-4 text-3xl" />
                    <p class="text-white">Template 1</p>
                    </div>
                    <div class="bg-blue-800 p-4 rounded-md flex items-center">
                    <Icon name="i-heroicons-window" class="text-white mr-4 text-3xl" />
                    <p class="text-white">Template 2</p>
                    </div>
                    <div class="bg-blue-800 p-4 rounded-md flex items-center">
                    <Icon name="i-heroicons-bug-ant" class="text-red-500 mr-4 text-3xl" />
                    <p class="text-white">Template 3</p>
                    </div>
                    <div class="bg-blue-800 p-4 rounded-md flex items-center">
                    <Icon name="i-heroicons-bug-ant" class="text-blue-400 mr-4 text-3xl" />
                    <p class="text-white">Template 4</p>
                    </div>
                </div>
            </div>
            <div>
                <NuxtImg src="/product.webp" />
            </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
</style>
