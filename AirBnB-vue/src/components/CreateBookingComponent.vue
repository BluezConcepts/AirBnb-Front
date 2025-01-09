<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

const router = useRouter();

const route = useRoute();
const spotId = route.params.id;

// Props to identify the owner
const props = defineProps({
  userId: {
    type: Number,
    required: true, // Add this if the prop is mandatory
  },
});

const campingSpots = ref([]);
const selectedCampingSpot = ref(null);
const startDate = ref(null);
const endDate = ref(null);
const guestCount = ref(1);
const totalPrice = ref(0);

// // Fetch camping spots owned by the owner
// async function fetchOwnerCampingSpots() {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/owner-spots?ownerId=${props.ownerId}`
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch camping spots");
//     }
//     campingSpots.value = await response.json();
//   } catch (error) {
//     console.error("Error fetching camping spots:", error);
//     alert("Failed to load your camping spots.");
//   }
// }

// Calculate the total price when a camping spot or dates change
function calculateTotalPrice() {
  if (selectedCampingSpot.value && startDate.value && endDate.value) {
    const nights =
      (new Date(endDate.value) - new Date(startDate.value)) /
      (1000 * 60 * 60 * 24);
    totalPrice.value = nights * selectedCampingSpot.value.price_per_night;
  } else {
    totalPrice.value = 0;
  }
}

async function createBooking() {
  if (!startDate.value || !endDate.value || guestCount.value < 1) {
    alert("Please fill in all fields before creating a booking.");
    return;
  }

  console.log("elabaaaaa");
  console.log("userId", props.userId);

  const bookingData = {
    campingSpotId: spotId,
    startDate: startDate.value,
    endDate: endDate.value,
    guestCount: guestCount.value,
    userId: props.userId,
    test: "dikketest",
  };

  try {
    const response = await fetch("http://localhost:3000/create-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    alert("Booking created successfully!");
    //router.push("/owner-bookings");
  } catch (error) {
    console.error("Error creating booking:", error);
    alert("Failed to create booking.");
  }
}
</script>

<template>
  <div class="p-6 max-w-lg mx-auto">
    <h2 class="text-2xl font-bold text-blue-600 mb-4">Create Booking</h2>

    <!-- Select Camping Spot -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2">{{ spotId }}</label>
    </div>

    <!-- Select Start Date -->
    <div class="mb-4">
      <label for="startDate" class="block text-gray-700 font-medium mb-2"
        >Start Date</label
      >
      <Calendar
        id="startDate"
        v-model="startDate"
        class="w-full"
        :min-date="new Date()"
        @change="calculateTotalPrice"
      />
    </div>

    <!-- Select End Date -->
    <div class="mb-4">
      <label for="endDate" class="block text-gray-700 font-medium mb-2"
        >End Date</label
      >
      <Calendar
        id="endDate"
        v-model="endDate"
        class="w-full"
        :min-date="startDate"
        @change="calculateTotalPrice"
      />
    </div>

    <!-- Guest Count -->
    <div class="flex flex-col">
      <FloatLabel>
        <InputNumber
          v-model="guestCount"
          inputId="guest_count"
          mode="decimal"
          showButtons
          :min="1"
          class="w-full"
        />
        <label for="guest_count">Guest Count</label>
      </FloatLabel>
    </div>

    <!-- Total Price -->
    <div class="mb-4">
      <p class="text-gray-800 font-medium">
        Total Price: <span class="text-blue-600">€{{ totalPrice }}</span>
      </p>
    </div>

    <!-- Submit Button -->
    <Button
      label="Create Booking"
      icon="pi pi-check"
      class="p-button-success w-full"
      @click="createBooking"
    />
  </div>
</template>
