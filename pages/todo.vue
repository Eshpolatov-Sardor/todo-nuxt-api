<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Todo } from "@/models/todo";
import todosService from "@/service/private/todos-service";
import AddOpenModal from "~/layouts/AddOpenModal.vue";
import ButtonEditModal from "~/layouts/ButtonEditModal.vue";

const isModalOpen = ref(false);
const isModaledit = ref(false);
const selectedTodo = ref<Todo | null>(null);
const todos = ref<Todo[]>([]);

function openModal() {
  isModalOpen.value = true;
}

function editModal(todo: Todo) {
  selectedTodo.value = todo;
  isModaledit.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  isModaledit.value = false;
  selectedTodo.value = null;
}

function submit() {
  isModalOpen.value = false;
}

async function getTodos() {
  try {
    const { data } = await todosService.getTodos();
    todos.value = data;
  } 
  catch (error: any) {
    console.error("Xatolik:", error);
  }
}

async function onDelete(id: string) {
  try {
    await todosService.deleteTodo(id);
    todos.value = todos.value.filter((todo: Todo) => todo.id !== id);
  } 
  catch (error) {
    console.error("Xatolik", error);
  }
}

onMounted(getTodos);

</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-indigo-700">Todo List</h1>
      <UButton @click="openModal">Add Todo</UButton>
    </div>
    <div class="overflow-x-auto shadow-md rounded-lg">
      <table class="min-w-full leading-normal">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:bg-gray-800 dark:text-gray-300"
            >
              N
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:bg-gray-800 dark:text-gray-300"
            >
              Title
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:bg-gray-800 dark:text-gray-300"
            >
              Description
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:bg-gray-800 dark:text-gray-300"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in todos" :key="item.id">
          <tr class="hover:bg-gray-50 dark:hover:bg-gray-600 dark:bg-gray-800">
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-700 dark:text-white"
            >
              {{ index + 1 }}
            </td>
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-700 dark:text-white"
            >
              {{ item.title }}
            </td>
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-700 dark:text-white"
            >
              {{ item.description }}
            </td>
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-700 dark:text-white"
            >
              <div class="flex space-x-2">
                <UButton @click="editModal(item)">Edit</UButton>
                <UButton color="red" @click="onDelete(item.id)">Delete</UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddOpenModal v-if="isModalOpen" @submit="submit" @close="closeModal" />
    <ButtonEditModal
      v-if="isModaledit"
      :todo="selectedTodo"
      @close="closeModal"
    />
  </div>
</template>