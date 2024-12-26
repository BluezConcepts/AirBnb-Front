<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

async function handleLogin() {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (response.status === 404) {
      alert("Invalid credentials. Please check your email and password.");
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Login failed.");
      return;
    }

    const data = await response.json();
    alert("Login successful!");
    window.location.replace("/");
    // Save user data locally (e.g., sessionStorage, Vuex, etc.)
    console.log("User data:", data);
    sessionStorage.setItem("userObject", JSON.stringify(data.user));

    // Redirect based on role
    if (data.user.isOwner) {
      router.push({ path: "/owner-dashboard" }); // Owners' specific dashboard
    } else {
      router.push({ path: "/camper-dashboard" }); // Campers' specific dashboard
    }
  } catch (err) {
    console.error("Error during login:", err);
    alert("An error occurred. Please try again later.");
  }
}
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
        :feedback="false"
        toggleMask
        class="w-full"
      />
    </div>

    <!-- Login Button -->
    <Button
      label="Login"
      icon="pi pi-sign-in"
      class="w-full p-button-primary"
      @click="handleLogin"
    />

    <!-- Register Button -->
    <Button
      v-on:click="router.push({ path: '/register' })"
      label="Sign up"
      icon="pi pi-user-plus"
      class="w-full p-button-secondary mt-2"
    />
  </div>
</template>
