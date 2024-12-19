<script setup>
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { ref, onBeforeMount } from "vue";

const router = useRouter();
//Define props to accept data
const spots = ref([]);
function fetchCampingSpots() {
  fetch("http://localhost:3000/campingspots").then(async (res) => {
    // console.log(res.json());
    spots.value = await res.json();
  });
}
onBeforeMount(() => {
  fetchCampingSpots();
});
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

          <!-- Placeholder for Rating -->
          <div class="flex items-center">
            <span class="text-yellow-400">⭐⭐⭐⭐⭐</span>
            <span class="ml-2 text-gray-500">{{ spot.average_rating }}</span>
          </div>

          <!-- Placeholder for Price -->
          <p class="text-lg font-bold text-blue-600">
            {{ spot.price_per_night }}
          </p>

          <!-- Placeholder for Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
            >
              {{ spot.tags }}
            </span>
          </div>

          <div className="text-white" v-if="spots.length === 0">loading...</div>

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
