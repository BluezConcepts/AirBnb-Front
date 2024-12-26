<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BookingsSectionComponent from "../components/BookingsSectionComponent.vue";

const userData = JSON.parse(sessionStorage.getItem("userObject"));
const router = useRouter();

if (!userData) {
  router.push("/login"); // Redirect to login if not logged in
}
</script>

<template>
  <div class="my-bookings-page">
    <header class="text-center py-4 bg-blue-500 text-white shadow-md">
      <h1 class="text-3xl font-bold">My Bookings</h1>
    </header>
    <main class="container mx-auto">
      <BookingsSectionComponent :userId="userData.userId" />
    </main>
  </div>
</template>
