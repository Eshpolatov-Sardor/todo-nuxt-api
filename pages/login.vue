<script setup lang="ts">
import { useRouter } from "#imports";
import * as yup from "yup";
import { useForm, Field, Form, ErrorMessage } from "vee-validate";
import AuthService from "~/service/public/auth-service";
import httpClient from "~/service/private/http-client";

const validateForm = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password must be at least 6 characters")
    .min(6),
});
const imageUrl =
  "https://qvz.uz/wp-content/uploads/2020/10/c5125900b06ebbd499bddcb30a6e4799.jpg";

useForm({
  validationSchema: validateForm,
});
useHead({
  title: "Login Page",
});

const router = useRouter();

async function onSubmit(values: Record<string, any>) {
  const payload = {
    username: values.username,
    password: values.password,
  };
  try {
    const { data } = await AuthService.login(payload);
    const { access_token, refresh_token } = data;
    httpClient.setTokens(access_token, refresh_token);
    router.push("/todo");
  } catch (error: any) {
    console.error("Login error: ", error);
  } finally {
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
    <Form
      v-slot="{ handleSubmit }"
      :validation-schema="validateForm"
      class="relative z-10 w-[90%] max-w-[400px] bg-opacity-90 shadow-2xl rounded-xl px-8 pt-10 pb-8"
    >
      <form @submit.prevent="handleSubmit($event, onSubmit)">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
          Welcome Back
        </h2>
        <div class="mb-5 w-full">
          <div class="text-gray-800 flex flex-col">
            <label for="username" class="mb-2">Username</label>
            <Field
              name="username"
              placeholder="Enter your username"
              class="form-input"
            />
            <ErrorMessage name="username" class="text-red-500 text-sm" />
          </div>
        </div>
        <div class="mb-7 w-full">
          <div class="text-gray-800 flex flex-col">
            <label for="password" class="mb-2">Password</label>
            <Field
              name="password"
              type="password"
              placeholder="Enter your password"
              class="form-input"
            />
            <ErrorMessage name="password" class="text-red-500 text-sm" />
          </div>
        </div>
        <UButton
          type="submit"
          class="w-full text-center pl-36 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out"
        >
          Login
        </UButton>
        <p class="mt-6 text-gray-700 text-sm text-center">
          Don't have an account?
          <NuxtLink
            to="/register"
            class="text-blue-500 font-medium hover:underline ml-1 transition duration-200"
          >
            Register
          </NuxtLink>
        </p>
      </form>
    </Form>
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
