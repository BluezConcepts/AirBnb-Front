<script setup>
import { useRoute } from "vue-router";
import CampingSpotDetail from "../components/CampingSpotDetail.vue";

// Fetch the route parameter
const route = useRoute();
const spotId = route.params.id;

// // Mock data for a single spot (replace with backend data later)
// const spot = {
//   id: spotId,
//   name: "Forest Retreat",
//   location: "Near Durbuy",
//   price: "€30/night",
//   rating: 4.5,
//   tags: ["Near a forest", "Pet-friendly"],
//   description:
//     "A beautiful retreat near the forest with stunning views and cozy accommodation.",
//   image: "https://via.placeholder.com/600x400",
// };
</script>

<template>
  <div>
    <CampingSpotDetail />
  </div>
</template>
