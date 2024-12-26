<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import { useRouter } from "vue-router";

const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const isOwner = ref(false); // Radio button to select between USER or OWNER
const router = useRouter();

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username.value,
        email: email.value,
        password: password.value,
        isOwner: isOwner.value,
      }),
    });

    if (response.status === 409) {
      alert("Email already in use. Try logging in or resetting your password.");
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Registration failed.");
      return;
    }

    alert("Registration successful! You can now log in.");
    router.push({ path: "/login" }); // Redirect to login page
  } catch (err) {
    console.error("Error during registration:", err);
    alert("An error occurred. Please try again later.");
  }
}
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
    <div class="field mb-4">
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

    <!-- User/Owner Selection -->
    <div class="field mb-6">
      <label class="block text-900 font-medium mb-2">Register As</label>
      <div class="flex align-items-center mb-2">
        <RadioButton
          v-model="isOwner"
          :value="false"
          inputId="user"
          class="mr-2"
        />
        <label for="user" class="text-black">User</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton
          v-model="isOwner"
          :value="true"
          inputId="owner"
          class="mr-2"
        />
        <label for="owner" class="text-black">Owner</label>
      </div>
    </div>

    <!-- Register Button -->
    <Button
      type="button"
      label="Register"
      icon="pi pi-user-plus"
      class="w-full p-button-primary"
      @click="handleRegister"
    />
  </div>
</template>
