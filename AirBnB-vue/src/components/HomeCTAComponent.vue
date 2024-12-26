<script setup>
import Button from "primevue/button";
import { useRouter } from "vue-router";

const router = useRouter();

function browseCampingSpots() {
  router.push("/campingspots");
}
</script>

<template>
  <section class="cta-section text-center mt-8">
    <h2 class="text-2xl font-semibold mb-4 text-blue-600">
      Ready to book your next adventure?
    </h2>
    <div class="flex justify-center gap-4">
      <Button
        label="Book Your Spot"
        icon="pi pi-book"
        class="p-button-success"
        @click="browseCampingSpots"
      />
      <Button
        label="Browse All Spots"
        icon="pi pi-search"
        class="p-button-primary"
        @click="browseCampingSpots"
      />
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding-bottom: 2rem;
}
</style>
