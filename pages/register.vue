<script setup lang="ts">
import { useRouter } from "#imports";
import { reactive, ref } from "vue";
import AuthService from "@/service/public/auth-service";

const imageUrl =
  "https://qvz.uz/wp-content/uploads/2020/10/c5125900b06ebbd499bddcb30a6e4799.jpg";

useHead({
  title: "Register Page",
});
const router = useRouter();

const form = reactive({
  username: "",
  first_name: "",
  last_name: "",
  password: "",
});
const errors = reactive({
  username: "",
  first_name: "",
  last_name: "",
  password: "",
});
const isValid = ref(true);

function validateForm() {
  errors.username = form.username ? "" : "Username is required";
  errors.first_name = form.first_name ? "" : "First Name is required";
  errors.last_name = form.last_name ? "" : "Last Name is required";
  errors.password =form.password.length >= 6 ? "" : "Password must be at least 6 characters";

  isValid.value = !(errors.username || errors.first_name || errors.last_name || errors.password
  );

  return isValid.value;
}

async function onSubmit() {
  if (validateForm()) {
    try {
      const payload = {
        username: form.username,
        first_name: form.first_name,
        last_name: form.last_name,
        password: form.password,
      };
      await AuthService.register(payload);
      router.push("/todo");
    } 
    catch (error) {
      console.error("Registration error:", error);
    }
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center h-screen relative overflow-hidden"
    :style="{
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <UForm
      :state="form"
      @submit.prevent="onSubmit"
      class="relative z-10 w-[90%] max-w-[450px] text-gray-800 bg-opacity-40 shadow-2xl rounded-2xl px-10 pt-10 pb-8 flex flex-col"
    >
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Create Your Account
      </h2>
      <div class="mb-5">
        <UFormGroup label="User Name" name="username" class="text-gray-800">
          <UInput v-model="form.username" placeholder="User Name" />
          <p v-if="errors.username" class="text-red-600 text-sm">
            {{ errors.username }}
          </p>
        </UFormGroup>
      </div>
      <div class="mb-5">
        <UFormGroup label="First Name" name="first_name">
          <UInput v-model="form.first_name" placeholder="First Name" />
          <p v-if="errors.first_name" class="text-red-600 text-sm">
            {{ errors.first_name }}
          </p>
        </UFormGroup>
      </div>
      <div class="mb-5">
        <UFormGroup label="Last Name" name="last_name">
          <UInput v-model="form.last_name" placeholder="Last Name" />
          <p v-if="errors.last_name" class="text-red-600 text-sm">
            {{ errors.last_name }}
          </p>
        </UFormGroup>
      </div>
      <div class="mb-7">
        <UFormGroup label="Password" name="password">
          <UInput
            v-model="form.password"
            type="password"
            placeholder="Enter your Password"
          />
          <p v-if="errors.password" class="text-red-600 text-sm">
            {{ errors.password }}
          </p>
        </UFormGroup>
      </div>
      <UButton
        type="submit"
        class="w-full pl-40 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
      >
        Register
      </UButton>
      <p class="mt-6 text-gray-700 text-sm text-center">
        Already have an account?
        <NuxtLink
          to="/login"
          class="text-blue-500 hover:underline transition duration-200"
        >
          Login
        </NuxtLink>
      </p>
    </UForm>
  </div>
</template>

<style scoped>
.form-input {
  @apply rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-shadow duration-300 ease-in-out shadow-sm;
}

/* Responsive styling for small screens */
@media (max-width: 640px) {
  form {
    @apply px-6 pt-8 pb-6;
  }

  h2 {
    @apply text-2xl mb-6;
  }

  .form-input {
    @apply px-3 py-2;
  }

  button {
    @apply py-2;
  }
}
</style>