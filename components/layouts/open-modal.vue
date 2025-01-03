<script setup lang="ts">
import { defineEmits, reactive } from 'vue';
import TodosService from '@/service/private/todos-service';

const emits = defineEmits<{
  (event: 'onSubmit'): void;
  (event: "close"): void;
  (event: "isModalOpen"): void;
}>();

const form = reactive({
  title: '',
  description: '',
  done: false,
});

function closeModal() {
  emits('close');
}

async function onSubmit() {
    const payload = {
        title: form.title,
        description: form.description,
        done: form.done, 
    };
    if(payload.title.trim() && payload.description.trim()) {
      {
        try {
         await TodosService.createTodo(payload);
        location.reload();
        emits('onSubmit');
    } catch (error) {
        console.error("Error creating todo:", error);
    }
      }
    }
    else {
      alert("title and description are required")
    }
}
</script>

<template>
  <div class="relative z-10">
    <Transition name="fade">
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-8 w-1/2">
          <UForm @submit.prevent="onSubmit" :state="form">
            <UFormGroup label="Title" name="title">
              <UInput v-model="form.title" placeholder="Title" class="mb-4" />
            </UFormGroup>
            <UFormGroup label="Description" name="description">
              <UInput
                v-model="form.description"
                type="textarea"
                placeholder="Description"
              />
            </UFormGroup>
            <UFormGroup label="Done" name="done">
              <UCheckbox v-model="form.done" />
            </UFormGroup>
            <div class="flex justify-end mt-4">
              <UButton @click="closeModal">Close</UButton>
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