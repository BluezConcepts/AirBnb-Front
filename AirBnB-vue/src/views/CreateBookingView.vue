<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import CreateBookingComponent from "../components/CreateBookingComponent.vue";

// Reactive state for user data
const userData = ref(null);
const isLoading = ref(true);
const router = useRouter();

onBeforeMount(() => {
  const storedUserData = JSON.parse(sessionStorage.getItem("userObject"));

  if (!storedUserData) {
    router.push("/login"); // Redirect to login if not logged in
  } else {
    userData.value = storedUserData; // Set userData
  }

  isLoading.value = false; // Stop loading after the check
});
</script>

<template>
  <div class="profile-page">
    <header class="text-center py-4 bg-blue-500 text-white shadow-md">
      <h1 class="text-3xl font-bold">Book</h1>
    </header>

    <!-- Show spinner or loader while checking login -->
    <div v-if="isLoading" class="text-center py-4">
      <p>Loading...</p>
    </div>

    <!-- Render booking component only if userData exists -->
    <div v-else-if="userData">
      <CreateBookingComponent :userId="userData.userId" />
    </div>
  </div>
</template>
