<script setup>
import CampingSpotsFilter from "../components/CampingSpotsFilter.vue";
import CampingSpotsComponent from "../components/CampingSpotsComponent.vue";
import { ref, onBeforeMount } from "vue";
import { watch } from "vue";

const capacity = ref(1);

watch(capacity, (newValue) => {
  console.log("CAPACHITY CHANGED");
  console.log(capacity);
});
</script>

<template>
  <div>
    <!-- Spots Filter -->
    <CampingSpotsFilter
      :capacity="capacity"
      @update-capacity="(cap) => (capacity = cap)"
    />

    <!-- Catalog of Camping Spots -->
    <CampingSpotsComponent :capacity="capacity" />
  </div>
</template>
