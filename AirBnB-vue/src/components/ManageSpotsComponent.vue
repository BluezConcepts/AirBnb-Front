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
const bookings = ref({}); // Initialize as an empty object

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
        `http://localhost:3000/delete-campingspot/${campingSpotId}`,
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

// Fetch bookings for a specific camping spot
async function fetchBookings(campingSpotId) {
  if (bookings.value[campingSpotId]) {
    // Bookings already loaded for this spot
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/camping-spot-bookings?campingSpotId=${campingSpotId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch bookings for this camping spot.");
    }
    bookings.value[campingSpotId] = await response.json();
  } catch (error) {
    console.error(
      `Error fetching bookings for camping spot ${campingSpotId}:`,
      error
    );
    bookings.value[campingSpotId] = []; // Ensure a fallback empty array
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
            <!-- Bookings Dropdown -->
            <details class="mt-4" @toggle="fetchBookings(item.camping_spot_id)">
              <summary class="cursor-pointer text-blue-500 hover:underline">
                View Bookings
              </summary>
              <ul v-if="bookings[item.camping_spot_id]" class="mt-2">
                <li
                  v-for="(booking, index) in bookings[item.camping_spot_id]"
                  :key="index"
                  class="flex justify-between p-2 border-b border-gray-200"
                >
                  <div>
                    <p><strong>Name:</strong> {{ booking.user_name }}</p>
                    <p><strong>Email:</strong> {{ booking.user_email }}</p>
                    <p><strong>Start Date:</strong> {{ booking.start_date }}</p>
                    <p><strong>End Date:</strong> {{ booking.end_date }}</p>
                    <p>
                      <strong>Total Price:</strong> €{{ booking.total_price }}
                    </p>
                  </div>
                </li>
              </ul>
              <p v-else class="text-gray-500">No bookings found.</p>
            </details>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
