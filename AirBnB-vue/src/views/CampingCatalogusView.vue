<script setup>
import CampingSpotsFilter from "../components/CampingSpotsFilter.vue";
import CampingSpotsComponent from "../components/CampingSpotsComponent.vue";
import { ref, watch } from "vue";

// Create a single filter object
const filter = ref({
  capacity: 1,
  tags: [],
  amenities: [],
  cities: [],
  startDate: null,
  endDate: null,
});

// Watch for changes in the filter object
watch(
  filter,
  (newFilter) => {
    console.log("Filter changed:", newFilter);
  },
  { deep: true } // Deep watch ensures nested properties are tracked
);
</script>

<template>
  <div>
    <!-- Spots Filter -->
    <CampingSpotsFilter :filter="filter" />

    <!-- Catalog of Camping Spots -->
    <CampingSpotsComponent :filter="filter" />
  </div>
</template>
