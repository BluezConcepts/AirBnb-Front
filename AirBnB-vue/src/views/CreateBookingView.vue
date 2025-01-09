<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CreateBookingComponent from "../components/CreateBookingComponent.vue";

const userData = JSON.parse(sessionStorage.getItem("userObject"));
const router = useRouter();

if (!userData) {
  router.push("/login"); // Redirect to login if not logged in
}
</script>

<template>
  <div class="profile-page">
    <header class="text-center py-4 bg-blue-500 text-white shadow-md">
      <h1 class="text-3xl font-bold">Book</h1>
    </header>

    <!-- Profile Form -->
    <CreateBookingComponent :userId="userData.userId" />
  </div>
</template>
