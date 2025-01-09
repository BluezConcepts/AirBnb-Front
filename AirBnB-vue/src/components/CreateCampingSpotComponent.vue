<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import MultiSelect from "primevue/multiselect";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";

// Form state
const name = ref("");
const capacity = ref(1);
const pricePerNight = ref(0);
const location = ref("");
const description = ref("");
const selectedTags = ref([]);
const selectedAmenities = ref([]);
const uploadedImages = ref([]);

// Tags and amenities options
const campingTags = [
  { id: "near_city", name: "Near a city" },
  { id: "near_forest", name: "Near a forest" },
  { id: "near_lake", name: "Near a lake" },
  { id: "near_beach", name: "Near the beach" },
  { id: "mountain_view", name: "Mountain view" },
  { id: "countryside", name: "Countryside" },
  { id: "isolated", name: "Isolated" },
  { id: "family_friendly", name: "Family-friendly" },
  { id: "pet_friendly", name: "Pet-friendly" },
  { id: "hiking_trails", name: "Close to hiking trails" },
];

const campingAmenities = [
  { id: "wifi", name: "WiFi" },
  { id: "sauna", name: "Sauna" },
  { id: "air_conditioning", name: "Air conditioning" },
  { id: "electricity", name: "Electricity" },
  { id: "bbq_area", name: "BBQ area" },
  { id: "swimming_pool", name: "Swimming pool" },
  { id: "hot_tub", name: "Hot tub" },
  { id: "shared_kitchen", name: "Shared kitchen" },
  { id: "private_bathroom", name: "Private bathroom" },
  { id: "laundry_facilities", name: "Laundry facilities" },
  { id: "playground", name: "Playground" },
  { id: "campfire_allowed", name: "Campfire allowed" },
  { id: "parking", name: "Parking" },
  { id: "wheelchair_accessible", name: "Wheelchair accessible" },
  { id: "pet_friendly", name: "Pet-friendly" },
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

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("capacity", capacity.value);
  formData.append("price_per_night", pricePerNight.value);
  formData.append("location", location.value);
  formData.append("description", description.value);
  formData.append("tags", selectedTags.value.join(","));
  formData.append("amenities", selectedAmenities.value.join(","));

  for (const file of uploadedImages.value) {
    formData.append("images", file);
  }

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
</script>

<template>
  <div class="p-6 max-w-lg mx-auto">
    <h2 class="text-2xl font-bold text-blue-600 mb-4">Create Camping Spot</h2>

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
    <div class="flex flex-col mb-4">
      <FileUpload
        mode="basic"
        name="images"
        customUpload
        :multiple="true"
        :auto="false"
        accept="image/*"
        v-model:files="uploadedImages"
      />
    </div>

    <!-- Submit Button -->
    <Button
      label="Create Camping Spot"
      icon="pi pi-plus"
      class="p-button-success w-full"
      @click="createCampingSpot"
    />
  </div>
</template>
