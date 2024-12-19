<script setup>
import CampingSpotsFilter from "../components/CampingSpotsFilter.vue";
import CampingSpotsComponent from "../components/CampingSpotsComponent.vue";
import { ref, onBeforeMount } from "vue";

// // Mock data for spots (replace this with your backend data later)
// const spots = [
//   {
//     id: 1,
//     name: "Forest Retreat",
//     location: "Near Durbuy",
//     rating: 4.5,
//     price: "€30/night",
//     tags: ["Near a forest", "Pet-friendly"],
//     image: "https://via.placeholder.com/300x200",
//   },
//   {
//     id: 2,
//     name: "Beachside Camp",
//     location: "Near Ostend",
//     rating: 4.8,
//     price: "€50/night",
//     tags: ["Near the beach", "Family-friendly"],
//     image: "https://via.placeholder.com/300x200",
//   },
//   {
//     id: 3,
//     name: "Mountain Escape",
//     location: "Near Ghent",
//     rating: 4.2,
//     price: "€40/night",
//     tags: ["Mountain view", "Hiking trails"],
//     image: "https://via.placeholder.com/300x200",
//   },
// ];
</script>

<template>
  <div>
    <!-- Spots Filter -->
    <CampingSpotsFilter />

    <!-- Catalog of Camping Spots -->
    <CampingSpotsComponent />
  </div>
</template>
