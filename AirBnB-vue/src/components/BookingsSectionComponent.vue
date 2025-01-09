<script setup>
import { ref, onMounted } from "vue";
import DataView from "primevue/dataview";
import Button from "primevue/button";
import Badge from "primevue/badge";
import router from "@/router";
import { useRouter } from "vue-router";
import Rating from "primevue/rating";

const showReviewDialog = ref(false);
const currentBooking = ref;

// Props for userId
const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});

const bookings = ref([]);

// Utility function to format ISO date strings
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Fetch bookings data on mount
onMounted(async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/my-bookings?userId=${props.userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
    bookings.value = await response.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    alert("Failed to load bookings.");
  }
});

// Function to navigate to the specific camping spot page
function goToCampingSpot(campingSpotId) {
  console.log("blablaa");
  router.push(`/spot/${campingSpotId}`);
}

// Severity Mapping for Badge
function getSeverity(status) {
  switch (status) {
    case "Completed":
      return "success";
    case "Pending":
      return "warning";
    case "Cancelled":
      return "danger";
    default:
      return null;
  }
}
</script>

<template>
  <div class="card">
    <!-- <h2 class="text-3xl font-semibold mb-6 text-center text-blue-600">
      My Bookings
    </h2> -->

    <div v-if="bookings.length === 0" class="text-center text-gray-500">
      <p>You have no bookings at the moment.</p>
    </div>

    <DataView :value="bookings">
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
                  :src="item.thumbnail || 'https://via.placeholder.com/150'"
                  alt="Camping Spot Thumbnail"
                  class="rounded w-full h-24 object-cover"
                />
              </div>

              <!-- Booking Info Section -->
              <div
                class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
              >
                <div
                  class="flex flex-row md:flex-col justify-between items-start gap-2"
                >
                  <div>
                    <span
                      class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                      >{{ item.location }}</span
                    >
                    <div class="text-lg font-medium mt-2">
                      {{ item.camping_spot_name }}
                    </div>
                  </div>
                  <div class="bg-surface-100 p-1" style="border-radius: 30px">
                    <div
                      class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                      style="
                        border-radius: 30px;
                        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                          0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                      "
                    >
                      <span class="text-surface-900 font-medium text-sm"
                        >Total Price: €{{ item.total_price }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-8">
                  <Badge
                    :value="item.status"
                    :severity="getSeverity(item.status)"
                  ></Badge>
                  <span
                    ><strong>Date:</strong> {{ formatDate(item.start_date) }} -
                    {{ formatDate(item.end_date) }}</span
                  >
                  <Button
                    label="View Camping Spot TEST"
                    icon="pi pi-map-marker"
                    class="p-button-primary"
                    @click="goToCampingSpot(item.camping_spot_id)"
                  />
                </div>
                <div v-if="new Date() > new Date(item.end_date)">
                  <Button
                    label="Review"
                    class="p-button-primary"
                    @click="openReviewDialog(item)"
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
