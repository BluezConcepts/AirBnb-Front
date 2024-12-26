<script setup>
import FeaturedCarousel from "../components/HomeCarouselComponent.vue";
import CallToAction from "../components/HomeCTAComponent.vue";
import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

//Getting the user login data
const userData = sessionStorage.getItem("userObject");
// if (!userData) {
//   router.push("/login");
// }
// Reactive variable for camping spots
const campingSpots = ref([]);

// Fetch camping spots on mount
onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3000/featured-campingspots");
    if (!response.ok) {
      throw new Error("Failed to fetch camping spots");
    }
    campingSpots.value = await response.json();
  } catch (error) {
    console.error("Error fetching camping spots:", error);
  }
});
</script>

<template>
  <div class="camper-dashboard">
    <!-- Header -->
    <header class="text-center py-4 bg-blue-500 text-white shadow-md">
      <h1 class="text-3xl font-bold">Welcome to the Camper Dashboard</h1>
      <p class="text-lg mt-2">Find and book your perfect camping spot!</p>
    </header>

    <!-- Carousel -->
    <FeaturedCarousel :spots="campingSpots" />

    <!-- Call to Action -->
    <CallToAction />
  </div>
</template>
