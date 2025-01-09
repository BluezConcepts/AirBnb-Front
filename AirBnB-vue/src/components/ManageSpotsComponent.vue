<script setup>
import { ref, onMounted } from "vue";
import DataView from "primevue/dataview";
import Button from "primevue/button";
import router from "@/router";

// Props for userId
const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});

const spots = ref([]); // Holds camping spot data

// Fetch camping spots data
onMounted(async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/owner-spots?ownerId=${props.userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch camping spots");
    }
    spots.value = await response.json();
  } catch (error) {
    console.error("Error fetching camping spots:", error);
    alert("Failed to load your camping spots.");
  }
});

// Function to navigate to edit camping spot page
function editSpot(campingSpotId) {
  router.push(`/edit-spot/${campingSpotId}`);
}

// Function to delete a camping spot
async function deleteSpot(campingSpotId) {
  if (confirm("Are you sure you want to delete this camping spot?")) {
    try {
      const response = await fetch(
        `http://localhost:3000/campingspots/${campingSpotId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        spots.value = spots.value.filter(
          (spot) => spot.camping_spot_id !== campingSpotId
        );
        alert("Camping spot deleted successfully.");
      } else {
        throw new Error("Failed to delete camping spot.");
      }
    } catch (error) {
      console.error("Error deleting camping spot:", error);
      alert("Failed to delete camping spot.");
    }
  }
}
</script>

<template>
  <div class="card">
    <div v-if="spots.length === 0" class="text-center text-gray-500">
      <p>You have no camping spots at the moment.</p>
    </div>

    <DataView :value="spots">
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div
              class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
              :class="{
                'border-t border-surface-200 dark:border-surface-700':
                  index !== 0,
              }"
            >
              <!-- Thumbnail Section -->
              <div class="md:w-40">
                <img
                  :src="item.image_url || 'https://via.placeholder.com/150'"
                  alt="Camping Spot Thumbnail"
                  class="rounded w-full h-24 object-cover"
                />
              </div>

              <!-- Info Section -->
              <div
                class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
              >
                <div class="flex flex-col">
                  <span class="font-medium text-lg">{{ item.name }}</span>
                  <span class="text-gray-600"
                    >Location: {{ item.location }}</span
                  >
                  <span class="text-gray-600">
                    Price: €{{ item.price_per_night }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="flex gap-4">
                  <Button
                    label="Edit"
                    icon="pi pi-pencil"
                    class="p-button-primary"
                    @click="editSpot(item.camping_spot_id)"
                  />
                  <Button
                    label="Delete"
                    icon="pi pi-trash"
                    class="p-button-danger"
                    @click="deleteSpot(item.camping_spot_id)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
