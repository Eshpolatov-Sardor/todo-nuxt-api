<script setup lang="ts">
import { useRouter } from "#imports";
import { reactive, ref } from "vue";
import AuthService from "~/service/public/auth-service";
import httpClient from "~/service/private/http-client";

const imageUrl =
  "https://qvz.uz/wp-content/uploads/2020/10/c5125900b06ebbd499bddcb30a6e4799.jpg";
const loginError = ref<string | null>(null);
const isLoading = ref(false);

useHead({
  title: "Login Page",
});
const router = useRouter();

const form = reactive({
  username: "",
  password: "",
});
const errors = reactive({
  username: "",
  password: "",
});
const isValid = ref(true);

function validateForm() {
  errors.username = form.username ? "" : "Username is required";
  errors.password =
    form.password.length >= 6 ? "" : "Password must be at least 6 characters";

  isValid.value = !(errors.username || errors.password);

  return isValid.value;
}

async function onSubmit() {
  if (validateForm()) {
    isLoading.value = true;
    loginError.value = null;
    const payload = {
      username: form.username,
      password: form.password,
    };
    try {
      const { data } = await AuthService.login(payload);
      const { access_token, refresh_token } = data;
      httpClient.setTokens(access_token, refresh_token);
      router.push("/todo");
    } 
    catch (error: any) {
      console.error("Login error: ", error);
      loginError.value = "Invalid username or password";
    } 
    finally {
      isLoading.value = false;
    }
  }
  console.log("Form submitted");
}
</script>

<template>
  <div
    class="flex items-center justify-center h-screen relative"
    :style="{
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br to-purple-700 opacity-70"
    ></div>
    <UForm
      :state="form"
      @submit.prevent="onSubmit"
      class="relative z-10 w-[90%] max-w-[400px] bg-opacity-90 shadow-2xl rounded-xl px-8 pt-10 pb-8 flex flex-col items-center"
    >
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Welcome Back
      </h2>
      <div class="mb-5 w-full">
        <UFormGroup label="Username" name="username" class="text-gray-800">
          <UInput v-model="form.username" placeholder="Enter your username" />
          <p v-if="errors.username" class="text-red-600 text-sm">
            {{ errors.username }}
          </p>
        </UFormGroup>
      </div>
      <div class="mb-7 w-full">
        <UFormGroup label="Password" name="password">
          <UInput
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
          />
          <p v-if="errors.password" class="text-red-600 text-sm">
            {{ errors.password }}
          </p>
        </UFormGroup>
        <p v-if="loginError" class="text-red-500 text-sm mt-1">
          {{ loginError }}
        </p>
      </div>
      <UButton
        :loading="isLoading"
        type="submit"
        class="w-full text-center pl-36 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
      >
        Login
      </UButton>
      <p class="mt-6 text-gray-700 text-sm">
        Don't have an account?
        <NuxtLink
          to="/register"
          class="text-blue-500 font-medium hover:underline ml-1 transition duration-200"
        >
          Register
        </NuxtLink>
      </p>
    </UForm>
  </div>
</template>
 
<style scoped>
.form-input {
  @apply border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-shadow duration-300 ease-in-out shadow-sm;
}

@media (max-width: 640px) {
  form {
    @apply px-6 pt-8 pb-6;
  }

  h2 {
    @apply text-2xl;
  }

  button {
    @apply py-2 text-sm;
  }
}
</style>