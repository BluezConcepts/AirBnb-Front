<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";

const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
</script>

<template>
  <div class="p-card p-component w-full max-w-md mx-auto shadow-2">
    <h2 class="p-card-title text-center mb-4">Register</h2>

    <!-- Username Field -->
    <div class="field mb-4">
      <label for="username" class="block text-900 font-medium mb-2"
        >Username</label
      >
      <InputText
        id="username"
        v-model="username"
        placeholder="Enter your username"
        class="w-full"
      />
    </div>

    <!-- Email Field -->
    <div class="field mb-4">
      <label for="email" class="block text-900 font-medium mb-2">Email</label>
      <InputText
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="w-full"
      />
    </div>

    <!-- Password Field -->
    <div class="field mb-4">
      <label for="password" class="block text-900 font-medium mb-2"
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

    <!-- Confirm Password Field -->
    <div class="field mb-6">
      <label for="confirmPassword" class="block text-900 font-medium mb-2"
        >Confirm Password</label
      >
      <Password
        id="confirmPassword"
        v-model="confirmPassword"
        placeholder="Confirm your password"
        :feedback="true"
        toggleMask
        class="w-full"
      />
    </div>

    <!-- Register Button -->
    <Button
      type="submit"
      label="Register"
      icon="pi pi-user-plus"
      class="w-full p-button-primary"
    />
  </div>
</template>
