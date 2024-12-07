<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import { useRouter } from "vue-router";

const email = ref("");
const router = useRouter();
const password = ref("");
</script>

<template>
  <div class="p-card p-component w-full max-w-md mx-auto shadow-2">
    <h2 class="p-card-title text-center mb-4">Login</h2>

    <!-- Email Field -->
    <div class="field mb-4">
      <label for="email" class="block text-900 font-medium mb-2 text-black"
        >Email</label
      >
      <InputText
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="w-full"
      />
    </div>

    <!-- Password Field -->
    <div class="field mb-6">
      <label for="password" class="block text-900 font-medium mb-2 text-black"
        >Password</label
      >
      <Password
        id="password"
        v-model="password"
        placeholder="Enter your password"
        :feedback="true"
        toggleMask
        class="w-full"
      />
    </div>

    <!-- Login Button -->
    <Button
      label="Login"
      icon="pi pi-sign-in"
      class="w-full p-button-primary"
    />
    <Button
      v-on:click="router.push({ path: '/register' })"
      label="Sign up"
      icon="pi pi-sign-in"
      class="w-full p-button-primary"
    />
  </div>
</template>
