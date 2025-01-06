<script lang="ts" setup>
import { useField } from 'vee-validate';
import { defineProps } from 'vue';
interface Props {
  type?: 'username' | 'first_name' | 'last_name' | 'password'
  value?: string
  name: string
  label: string
  successMessage?: string
  placeholder?: string
}

const { name, value, type } = defineProps<Props>()

// Vee Validate
const { value: inputValue, errorMessage, handleBlur, handleChange, meta } = useField(name, undefined, {
  initialValue: value
})

// Ref Properties
const showPassword = ref(false)


// Computed Properties
const fieldType = computed(() => {
  if (type === 'password' && showPassword.value) {
    return 'text'
  }
  return type
})
useField(name)
</script>
<template>
  <div :class="{ 'error': !!errorMessage, 'success': meta.valid }">
    <label
      :for="name"
      class="text-zinc-600"
    >{{ label }}</label>
    <div class="relative">
      <input
        :id="name"
        :type="fieldType"
        class="h-[45px] block w-full rounded-md duration-300 ease-linear outline-1 outline bg-zinc-100 outline-zinc-100 text-zinc-600  focus:outline-zinc-400 pl-4"
        :placeholder="placeholder"
        :name="name"
        :value="inputValue"
      />
    </div>
    <div class="text-rose-500">
      {{ errorMessage }}
    </div>
  </div>
</template>
<style scoped lang="css">
.error input {
  @apply text-rose-600 outline-rose-100 bg-rose-50;
}

.success input {
  @apply text-green-500 bg-green-100 outline-green-100;
}

input::placeholder {
  @apply text-zinc-300;
}

.success input::placeholder {
  @apply text-green-200;
}

.error input::placeholder {
  @apply text-rose-200;
}
</style>