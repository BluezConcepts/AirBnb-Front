<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
import Button from "primevue/button";
import Rating from "primevue/rating";

const router = useRouter();
const route = useRoute();
const spotId = route.params.id;

const spot = ref({}); // Initialize as an object

// Fetch camping spot details
function fetchCampingSpotDetail() {
  fetch("http://localhost:3000/campingspots/" + spotId)
    .then(async (res) => {
      const data = await res.json();
      spot.value = data;
    })
    .catch((err) => {
      console.error("Failed to fetch camping spot details:", err);
    });
}

// Fetch data on component mount
onBeforeMount(() => {
  fetchCampingSpotDetail();
});

// Navigate to booking page
function goToBookingSpot() {
  router.push(`/booking/${spotId}`);
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Image -->
    <img
      :src="spot.image_url"
      alt="Spot Image"
      class="w-full h-64 object-cover rounded-lg shadow-md"
    />

    <!-- Details Section -->
    <div class="mt-4 bg-white p-6 shadow rounded-lg">
      <!-- Title -->
      <h1 class="text-3xl font-bold text-gray-800">
        {{ spot.camping_spot_name }}
      </h1>
      <p class="text-gray-600 mt-2 text-lg">📍 {{ spot.location }}</p>

      <!-- Price -->
      <p class="text-blue-600 font-semibold mt-2 text-xl">
        €{{ spot.price_per_night }} / night
      </p>

      <!-- Rating -->
      <div class="flex items-center mt-4">
        <Rating
          :value="spot.average_rating"
          readonly
          stars="5"
          cancel="false"
        />
        <span class="ml-2 text-gray-500 text-sm"
          >({{ spot.average_rating }})</span
        >
      </div>

      <!-- Description -->
      <p v-if="spot.description" class="text-gray-700 mt-4">
        {{ spot.description }}
      </p>

      <!-- Tags -->
      <div v-if="spot.tags" class="mt-4">
        <h3 class="font-semibold text-gray-800">Tags:</h3>
        <div class="flex flex-wrap gap-2 mt-2">
          <span
            v-for="tag in spot.tags.split(', ')"
            :key="tag"
            class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Amenities -->
      <div v-if="spot.amenities" class="mt-6">
        <h3 class="font-semibold text-gray-800">Amenities:</h3>
        <div class="flex flex-wrap gap-2 mt-2">
          <span
            v-for="amenity in spot.amenities.split(', ')"
            :key="amenity"
            class="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full"
          >
            {{ amenity }}
          </span>
        </div>
      </div>

      <!-- Booking Button -->
      <Button
        label="Book Your Spot"
        icon="pi pi-book"
        class="p-button-success mt-6"
        @click="goToBookingSpot"
      />
    </div>
  </div>
</template>
