<script setup>
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { ref, onBeforeMount } from "vue";
import { watch, defineProps } from "vue";

import Rating from "primevue/rating";

const router = useRouter();
//Define props to accept data
const spots = ref([]);
let uneditedSpots = [];
function fetchCampingSpots() {
  fetch("http://localhost:3000/campingspots").then(async (res) => {
    // const text = await res.text();
    // console.log("Response Text:", text);
    const response = await res.json();
    spots.value = response;
    uneditedSpots = response;
  });
}
onBeforeMount(() => {
  fetchCampingSpots();
});

const props = defineProps({
  filter: Object, // Accept the entire filter object
});

console.log(props.filter);

watch(
  () => props.filter, // Watch the entire filter object
  (newFilter) => {
    console.log("received filter change");
    spots.value = uneditedSpots.filter((spot) => {
      return (
        (!newFilter.capacity || spot.capacity >= newFilter.capacity) &&
        (!newFilter.tags.length ||
          newFilter.tags.every((tag) => spot.tags.includes(tag))) &&
        (!newFilter.amenities.length ||
          newFilter.amenities.every((amenity) =>
            spot.amenities.includes(amenity)
          )) &&
        (!newFilter.cities.length ||
          newFilter.cities.includes(spot.location)) &&
        (!newFilter.startDate ||
          new Date(spot.availableFrom) >= new Date(newFilter.startDate)) &&
        (!newFilter.endDate ||
          new Date(spot.availableUntil) <= new Date(newFilter.endDate))
      );
    });

    console.log("Filter applied:", newFilter);
  },
  { deep: true } // Deep watch to detect changes in nested properties
);
</script>

<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Loop through spots -->
      <div
        v-for="spot in spots"
        :key="spot.camping_spot_id"
        class="p-card shadow-lg bg-white rounded-lg overflow-hidden"
      >
        <div class="h-48 bg-gray-200 flex items-center justify-center">
          <!-- Placeholder for Spot Image -->
          <span class="text-gray-500">{{ spot.image_url }}</span>
        </div>

        <!-- Card Body -->
        <div class="p-4 flex flex-col gap-2">
          <!-- Placeholder for Spot Title -->
          <h2 class="text-xl font-semibold text-gray-800">
            {{ spot.camping_spot_name }}
          </h2>

          <!-- Placeholder for Spot Location -->
          <p class="text-gray-600">{{ spot.location }}</p>

          <!-- Rating -->
          <div class="flex items-center mt-4">
            <Rating v-model="spot.average_rating" readonly />
            <span class="ml-2 text-gray-500 text-sm"
              >({{ spot.average_rating }})</span
            >
          </div>

          <!-- Capacity -->
          <div class="flex items-center mt-4">
            <span class="text-gray-600 font-small text-sm">
              Capacity: {{ spot.capacity }} people
            </span>
          </div>

          <!-- Placeholder for Price -->
          <p class="text-lg font-bold text-blue-600">
            {{ spot.price_per_night }}/ night
          </p>

          <!-- Placeholder for Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in spot.tags.split(', ')"
              :key="tag"
              class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Placeholder for Amenities -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="amenity in spot.amenities.split(', ')"
              :key="amenity"
              class="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full"
            >
              {{ amenity }}
            </span>
          </div>

          <!-- <div class="text-white" v-if="spots.length === 0">loading...</div> -->

          <!-- Placeholder for Button -->
          <Button
            v-on:click="router.push({ path: '/spot/' + spot.camping_spot_id })"
            label="View Spot"
            icon="pi pi-sign-in"
            class="w-full p-button-primary"
          />
        </div>
      </div>
    </div>
  </div>
</template>
