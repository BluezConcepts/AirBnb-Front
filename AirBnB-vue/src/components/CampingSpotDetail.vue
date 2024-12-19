<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";

const router = useRouter();

const route = useRoute();
const spotId = route.params.id;
//Define props to accept data

const spot = ref([]);
function fetchCampingSpotDetail() {
  fetch("http://localhost:3000/campingspots/" + spotId).then(async (res) => {
    // console.log(res.json());
    spot.value = await res.json();
    //console.log(spot.value);
  });
}
onBeforeMount(() => {
  fetchCampingSpotDetail();
});
</script>

<template>
  <div>
    <div class="p-6 max-w-4xl mx-auto">
      <!-- Image -->
      <img
        :src="spot.image_url"
        alt="Spot Image"
        class="w-full h-64 object-cover rounded-lg shadow-md"
      />

      <!-- Details Section -->
      <div class="mt-4 bg-white p-6 shadow rounded-lg">
        <h1 class="text-3xl font-bold text-gray-800">
          {{ spot.camping_spot_name }}
        </h1>
        <p class="text-gray-600 mt-2">Location: {{ spot.location }}</p>
        <p class="text-blue-600 font-semibold mt-2">
          {{ spot.price_per_night }}
        </p>
        <div class="flex items-center mt-2">
          <span class="text-yellow-400">⭐⭐⭐⭐⭐</span>
          <span class="ml-2 text-gray-500"
            >{{ spot.average_rating }} Rating</span
          >
        </div>
        <p class="text-gray-700 mt-4">{{ spot.description }}</p>

        <!-- Tags -->
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            {{ spot.tags }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
