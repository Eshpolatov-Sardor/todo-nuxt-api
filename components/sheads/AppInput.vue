<template>
  <input
    class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
    :class="{ 'border-red-500': $attrs.invalid }"
    v-bind="$attrs"
  />
</template>

<style scoped>
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #6366f1;
}
</style>