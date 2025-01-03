<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import type { Todo } from "@/models/todo"
import todosService from "@/service/private/todos-service"

const props = defineProps<{
    todo: Todo
  }>()
  const emits = defineEmits<{
    (event: "submit"): void
    (event: "close"): void
  }>()

const title = ref('');
const description = ref('');

function close(){
  emits('close');
}
const todos = ref<Todo[]>([])
    const todoData = ref<Todo>({
    id: props.todo.id,
    title: props.todo.title,
    description: props.todo.description,
    done: props.todo.done,
  })

  async function updateTodo(values: Record<string, any>) {
    const payload: Todo = {
      ...todoData.value,
      ...values,
    }
    try {
      const { data } = await todosService.updateTodo(payload.id, payload)
      const index = todos.value.findIndex((todo: Todo) => todo.id === payload.id)
      if (index !== -1) {
        todos.value[index] = data
      }
    location.reload()
    emits("submit")
  } catch (error) {
    console.error("Error updating todo:", error)
  }
}
</script>
<template>
  <div class="relative z-10">
    <Transition name="fade">
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-8 w-1/2">
          <UForm @submit.prevent="updateTodo" :state="todoData">
            <UFormGroup label="Title" name="title">
              <UInput v-model="todoData.title" placeholder="Title" class="mb-4" />
            </UFormGroup>
            <UFormGroup label="Description" name="description">
              <UInput
                v-model="todoData.description"
                type="textarea"
                placeholder="Description"
              />
            </UFormGroup>
            <UFormGroup label="Done" name="done">
              <UCheckbox v-model="todoData.done" />
            </UFormGroup>
            <div class="flex justify-end mt-4">
              <UButton @click="close">Close</UButton>
              <UButton type="submit" class="ml-4">Submit</UButton>
            </div>
          </UForm>
        </div>
      </div>
    </Transition>
  </div>
</template>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>