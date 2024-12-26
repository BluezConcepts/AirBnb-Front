<script setup>
  import Carousel from "primevue/carousel";

  // Props to pass featured camping spots
  const props = defineProps({
    spots: {
      type: Array,
      required: true,
    },
  });
</script>

<template>
  <section class="carousel-section my-6">
    <h2 class="text-center text-2xl font-semibold mb-4 text-blue-600">
      Featured Camping Spots
    </h2>
    <Carousel
      :value="spots"
      :numVisible="3"
      :numScroll="1"
      class="custom-carousel"
      circular
      autoplayInterval="3000"
    >
      <template #item="slotProps">
        <div class="p-3 text-center">
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.name"
            class="w-full h-40 object-cover mb-3 rounded-md shadow"
          />
          <h3 class="text-xl font-bold text-gray-800">
            {{ slotProps.data.name }}
          </h3>
          <p class="text-gray-500">{{ slotProps.data.location }}</p>
        </div>
      </template>
    </Carousel>
  </section>
</template>

<style scoped>
  .carousel-section {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
