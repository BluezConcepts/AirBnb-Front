<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import MultiSelect from "primevue/multiselect";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
//import { useRoute } from "vue-router";
import Calendar from "primevue/calendar";

// Form state
const name = ref("");
const capacity = ref(1);
const pricePerNight = ref(0);
const location = ref("");
const description = ref("");
const selectedTags = ref([]);
const selectedAmenities = ref([]);
//const uploadedImages = ref([]);

const isEditing = ref(false);
const editId = ref(0);
const unavailableDates = ref([]); // Holds the selected unavailable dates
const selectedUnavailableDates = ref([]); // Holds new dates to mark as unavailable
const userData = ref(JSON.parse(sessionStorage.getItem("userObject")));

// Function to check the URL and fetch data
onMounted(() => {
  // Use regex to match the pattern '/edit-spot/{id}'

  if (window.location.href.includes("edit-spot")) {
    isEditing.value = true;
  }

  if (isEditing.value) {
    // Extract the ID from the match
    const route = useRoute(); // Access the current route
    editId.value = route.params.id; // Reactive ID from route param

    console.log(`ID found: ${editId.value}`);

    // Fetch data using the ID
    fetchCampingSpotDetail(editId.value);
    fetchUnavailableDates(editId.value);
  } else {
    console.log("URL does not match /edit-spot/{id} pattern");
  }
});

function fetchCampingSpotDetail(spotId) {
  fetch("http://localhost:3000/campingspots/" + spotId)
    .then(async (res) => {
      const data = await res.json();
      name.value = data.camping_spot_name;
      capacity.value = data.capacity;
      pricePerNight.value = data.price_per_night;
      location.value = data.location;
      description.value = data.description;
      selectedTags.value = data.tags ? data.tags.split(", ") : [];
      selectedAmenities.value = data.amenities
        ? data.amenities.split(", ")
        : [];
    })
    .catch((err) => {
      console.error("Failed to fetch camping spot details:", err);
    });
}

// Tags and amenities options
const campingTags = [
  { id: "1", name: "Near a city" },
  { id: "2", name: "Near a forest" },
  { id: "3", name: "Near a lake" },
  { id: "4", name: "Near the beach" },
  { id: "5", name: "Mountain view" },
  { id: "6", name: "Countryside" },
  { id: "7", name: "Isolated" },
  { id: "8", name: "Family-friendly" },
  { id: "9", name: "Pet-friendly" },
  { id: "10", name: "Close to hiking trails" },
];

const campingAmenities = [
  { id: "1", name: "WiFi" },
  { id: "2", name: "Sauna" },
  { id: "3", name: "Air conditioning" },
  { id: "4", name: "Electricity" },
  { id: "5", name: "BBQ area" },
  { id: "6", name: "Swimming pool" },
  { id: "7", name: "Hot tub" },
  { id: "8", name: "Shared kitchen" },
  { id: "9", name: "Private bathroom" },
  { id: "10", name: "Laundry facilities" },
  { id: "11", name: "Playground" },
  { id: "12", name: "Campfire allowed" },
  { id: "13", name: "Parking" },
  { id: "14", name: "Wheelchair accessible" },
  { id: "15", name: "Pet-friendly" },
];

// Router for navigation
const router = useRouter();

// Submit function
async function createCampingSpot() {
  if (
    !name.value ||
    !capacity.value ||
    !pricePerNight.value ||
    !location.value ||
    !description.value
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  let realTagIds = [];
  if (selectedTags.value[0] !== "No tags available") {
    // realTags = selectedTags.value.split(",");
    selectedTags.value.forEach((realTag) => {
      realTagIds.push(
        campingTags.find((campingTag) => campingTag.name === realTag).id
      );
    });
  }

  let realAmenityIds = [];
  if (selectedAmenities.value[0] !== "No amenities available") {
    selectedAmenities.value.forEach((realAmenity) => {
      realAmenityIds.push(
        campingAmenities.find((amenity) => amenity.name === realAmenity).id
      );
    });
  }

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("capacity", capacity.value);
  formData.append("price_per_night", pricePerNight.value);
  formData.append("location", location.value);
  formData.append("description", description.value);
  formData.append("tags", realTagIds);
  formData.append("amenities", realAmenityIds);
  formData.append("owner_id", userData.value.userId);
  //formData.append("unavailable_dates", JSON.stringify(unavailableDates.value));

  // for (const file of uploadedImages.value) {
  //   formData.append("images", file);
  // }

  if (isEditing.value) {
    try {
      const response = await fetch(
        "http://localhost:3000/update-campingspot/" + editId.value,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Camping spot updated successfully!");
        router.push("/manage-spots");
      } else {
        throw new Error("Failed to updating camping spot");
      }
    } catch (error) {
      console.error("Error updating camping spot:", error);
      alert("An error occurred while updating the camping spot.");
    }
  } else {
    try {
      const response = await fetch("http://localhost:3000/create-campingspot", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Camping spot created successfully!");
        router.push("/manage-spots");
      } else {
        throw new Error("Failed to create camping spot");
      }
    } catch (error) {
      console.error("Error creating camping spot:", error);
      alert("An error occurred while creating the camping spot.");
    }
  }
}
//dates
// Submit unavailable dates to the backend
async function submitUnavailableDates(campingSpotId) {
  console.log("Selected Unavailable Dates:", selectedUnavailableDates.value);

  // Validate that we have both a start and end date
  if (
    !selectedUnavailableDates.value ||
    selectedUnavailableDates.value.length !== 2 ||
    !selectedUnavailableDates.value[0] ||
    !selectedUnavailableDates.value[1]
  ) {
    alert("Please select a valid date range.");
    return;
  }

  const formattedDates = [
    {
      start_date: selectedUnavailableDates.value[0].toISOString().split("T")[0],
      end_date: selectedUnavailableDates.value[1].toISOString().split("T")[0],
      reason: "Owner Unavailability",
    },
  ];

  console.log("Formatted Dates to Submit:", formattedDates);
  console.log("Submitting Unavailable Dates for Spot ID:", campingSpotId); // Debug log

  try {
    const response = await fetch(
      `http://localhost:3000/update-unavailable-dates/${campingSpotId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dates: formattedDates }),
      }
    );

    if (response.ok) {
      alert("Unavailable dates updated successfully!");
      fetchUnavailableDates(campingSpotId); // Refresh unavailable dates
    } else {
      throw new Error("Failed to update unavailable dates");
    }
  } catch (error) {
    console.error("Error updating unavailable dates:", error);
    alert("An error occurred while updating unavailable dates.");
  }
}

// Fetch unavailable dates from the backend
async function fetchUnavailableDates(campingSpotId) {
  try {
    const response = await fetch(
      `http://localhost:3000/unavailable-dates?campingSpotId=${campingSpotId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch unavailable dates");
    }
    const data = await response.json();
    unavailableDates.value = data.map((entry) => ({
      startDate: new Date(entry.start_date),
      endDate: new Date(entry.end_date),
      reason: entry.reason,
    }));
  } catch (error) {
    console.error("Error fetching unavailable dates:", error);
  }
}

// Call fetchUnavailableDates when editing
if (isEditing.value) {
  fetchUnavailableDates(editId.value);
}
</script>

<template>
  <div class="p-6 max-w-lg mx-auto">
    <h2 class="text-2xl font-bold text-blue-600 mb-4">
      {{ !isEditing ? "Create Camping Spot" : "Edit Camping Spot" }}
    </h2>

    <!-- Name -->
    <div class="flex flex-col mb-4">
      <FloatLabel>
        <InputText v-model="name" id="name" class="w-full" />
        <label for="name">Camping Spot Name</label>
      </FloatLabel>
    </div>

    <!-- Capacity -->
    <div class="flex flex-col mb-4">
      <FloatLabel>
        <InputNumber
          v-model="capacity"
          inputId="capacity"
          showButtons
          :min="1"
          class="w-full"
        />
        <label for="capacity">Capacity</label>
      </FloatLabel>
    </div>

    <!-- Price Per Night -->
    <div class="flex flex-col mb-4">
      <FloatLabel>
        <InputNumber
          v-model="pricePerNight"
          inputId="price_per_night"
          mode="currency"
          currency="EUR"
          locale="en-US"
          class="w-full"
        />
        <label for="price_per_night">Price Per Night (€)</label>
      </FloatLabel>
    </div>

    <!-- Location -->
    <div class="flex flex-col mb-4">
      <FloatLabel>
        <InputText v-model="location" id="location" class="w-full" />
        <label for="location">Location</label>
      </FloatLabel>
    </div>

    <!-- Tags -->
    <div class="flex flex-col mb-4">
      <MultiSelect
        v-model="selectedTags"
        :options="campingTags"
        optionLabel="name"
        optionValue="name"
        filter
        placeholder="Select Tags"
        class="w-full"
      />
    </div>

    <!-- Amenities -->
    <div class="flex flex-col mb-4">
      <MultiSelect
        v-model="selectedAmenities"
        :options="campingAmenities"
        optionLabel="name"
        optionValue="name"
        filter
        placeholder="Select Amenities"
        class="w-full"
      />
    </div>

    <!-- Description -->
    <div class="flex flex-col mb-4">
      <FloatLabel>
        <InputText
          v-model="description"
          id="description"
          class="w-full"
          type="textarea"
        />
        <label for="description">Description</label>
      </FloatLabel>
    </div>

    <!-- Image Upload -->
    <!-- <div class="flex flex-col mb-4">
      <FileUpload
        mode="basic"
        name="images"
        customUpload
        :multiple="true"
        :auto="false"
        accept="image/*"
        v-model:files="uploadedImages"
      />
    </div> -->
    <!-- Select New Unavailable Dates -->
    <div v-if="isEditing" class="flex flex-col mb-4">
      <label for="new-unavailable-dates" class="font-semibold mb-2">
        Select Unavailable Dates
      </label>
      <Calendar
        v-model="selectedUnavailableDates"
        id="new-unavailable-dates"
        :selectionMode="'range'"
        :inline="true"
        placeholder="Select a date range"
      />
    </div>

    <Button
      v-if="isEditing"
      label="Save Unavailable Dates"
      icon="pi pi-save"
      class="p-button-primary w-full mb-4"
      @click="submitUnavailableDates(editId.value)"
    />
    <!-- Submit Button -->
    <Button
      :label="!isEditing ? 'Create Camping Spot' : 'Update Camping Spot'"
      icon="pi pi-plus"
      class="p-button-success w-full"
      @click="createCampingSpot"
    />
  </div>
</template>
