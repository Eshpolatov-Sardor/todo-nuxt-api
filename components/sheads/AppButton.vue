<template>
  <button class="px-4 py-2 text-center rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
    <slot />
  </button>
</template>

<style scoped>
button:hover {
  background-color: #6a98f5;
}
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #6a98f5;
}
</style>
