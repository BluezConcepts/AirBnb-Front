<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import DatePicker from "primevue/datepicker";

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
// Selected date
//const date = ref(null);
const unavailableDates = ref([]);
const disabledDates = ref([]);

// // Fetch unavailable dates from API
// onMounted(async () => {
//   try {
//     const response = await fetch(
//       "http://localhost:3000/unavailable-dates?campingSpotId=1" // Replace with actual campingSpotId
//     );
//     if (!response.ok) throw new Error("Failed to fetch unavailable dates");
//     // const data = await response.json();
//     // console.log("Fetched unavailable dates (raw):", data);

//     // // Map and convert dates
//     // unavailableDates.value = data.map(({ start_date, end_date, reason }) => {
//     //   const start = new Date(start_date);
//     //   const end = new Date(end_date);

//     //   console.log("Mapping dates:", { start, end, reason }); // Debug log for each mapped date

//     //   return {
//     //     start,
//     //     end,
//     //     reason, // Include the reason if needed
//     //   };
//     // });

//     // console.log("Processed unavailable dates:", unavailableDates.value); // Final processed data
//     const data = await response.json();
//     console.log("Fetched unavailable dates (raw):", data);

//     // Map and format dates to 'YYYY-MM-DD'
//     unavailableDates.value = data.map(({ start_date, end_date, reason }) => ({
//       start: start_date.split("T")[0], // Extract 'YYYY-MM-DD'
//       end: end_date.split("T")[0], // Extract 'YYYY-MM-DD'
//       reason,
//     }));

//     console.log("Processed unavailable dates:", unavailableDates.value);
//   } catch (error) {
//     console.error("Error fetching unavailable dates:", error);
//   }
// });

// // Helper function to check if a date is unavailable
// function isUnavailable(dateString) {
//   return unavailableDates.value.some((range) => {
//     return dateString >= range.start && dateString <= range.end;
//   });
// }
// // Helper function to format date as 'YYYY-MM-DD'
// function formatDate(date) {
//   if (!date || !(date instanceof Date)) return null; // Validate date
//   return date.toISOString().split("T")[0]; // Convert to 'YYYY-MM-DD'
// }
// // // Fetch camping spots owned by the owner
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
// Fetch unavailable dates and populate disabledDates array

onMounted(async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/unavailable-dates?campingSpotId=1" // Replace with your campingSpotId
    );
    if (!response.ok) throw new Error("Failed to fetch unavailable dates");

    const data = await response.json();
    console.log("Fetched unavailable dates (raw):", data);

    // Map unavailable dates to Date objects for disabledDates
    unavailableDates.value = data.map(({ start_date, end_date }) => ({
      start: new Date(start_date),
      end: new Date(end_date),
    }));

    // Generate a flat array of all disabled dates
    disabledDates.value = generateDisabledDates(unavailableDates.value);

    console.log("Disabled dates:", disabledDates.value);

    // Log disabled dates in 'YYYY-MM-DD' format
    const isoDisabledDates = disabledDates.value.map(
      (date) => date.toISOString().split("T")[0]
    );
    console.log("Disabled dates (YYYY-MM-DD):", isoDisabledDates);
  } catch (error) {
    console.error("Error fetching unavailable dates:", error);
  }
});

// Helper function to generate an array of all disabled dates
function generateDisabledDates(dateRanges) {
  const dates = [];
  dateRanges.forEach(({ start, end }) => {
    let current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
      // Normalize to midnight (to avoid time zone issues)
      const normalizedDate = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate()
      );

      dates.push(normalizedDate);
      current.setDate(current.getDate() + 1); // Increment day by 1
    }
  });
  return dates;
}

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

  const formattedStartDate = startDate.value.toISOString().split("T")[0];
  const formattedEndDate = endDate.value.toISOString().split("T")[0];

  const bookingData = {
    campingSpotId: spotId,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
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

    <!-- Start Date Picker -->
    <div class="mb-4">
      <label for="startDate" class="block text-gray-700 font-medium mb-2">
        Start Date
      </label>
      <DatePicker
        v-model="startDate"
        :disabled-dates="disabledDates"
        :min-date="new Date()"
        class="w-full"
      />
    </div>

    <!-- End Date Picker -->
    <div class="mb-4">
      <label for="endDate" class="block text-gray-700 font-medium mb-2">
        End Date
      </label>
      <DatePicker
        v-model="endDate"
        :disabled-dates="disabledDates"
        :min-date="startDate"
        class="w-full"
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
