<script setup>
import { ref } from "vue";
import FloatLabel from "primevue/floatlabel";
import DatePicker from "primevue/datepicker";
import InputNumber from "primevue/inputnumber";
import MultiSelect from "primevue/multiselect";
const selectedPeopleCapacity = ref(1);
const selectedCities = ref([]);
const selectedStartDateFilter = ref();
const selectedEndDateFilter = ref();
const selectedTags = ref([]);
const selectedAmeneties = ref([]);

const cities = ref([
  { name: "Durbuy" },
  { name: "Ostend" },
  { name: "Ghent" },
  { name: "Antwerp" },
  { name: "Lier" },
  { name: "Mechelen" },
  { name: "Kortrijk" },
]);

const campingTags = ref([
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
]);

const campingAmenities = ref([
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
]);
</script>
<template>
  <!-- container that contains->  Datum / Locatie? / Capacity hoeveelheid mensen / filteren op tag. -->

  <div>
    <!-- start date -->
    <FloatLabel variant="on">
      <DatePicker
        v-model="selectedStartDateFilter"
        inputId="on_label"
        showIcon
        iconDisplay="input"
      />
      <label for="on_label">Start Date</label>
    </FloatLabel>

    <!-- end date -->
    <FloatLabel variant="on">
      <DatePicker
        v-model="selectedEndDateFilter"
        inputId="on_label"
        showIcon
        iconDisplay="input"
      />
      <label for="on_label">End Date</label>
    </FloatLabel>

    <!-- locatie dropdown -->
    <MultiSelect
      v-model="selectedCities"
      :options="cities"
      optionLabel="name"
      filter
      placeholder="Select Cities"
      :maxSelectedLabels="3"
      class="w-full md:w-80"
    />

    <!-- aantal mensen -->
    <InputNumber
      v-model="selectedPeopleCapacity"
      inputId="minmax-buttons"
      mode="decimal"
      showButtons
      :min="1"
      :max="100"
      fluid
    />

    <!-- filter op tags -->
    <MultiSelect
      v-model="selectedCampingTags"
      :options="campingTags"
      optionLabel="name"
      filter
      placeholder="Tags"
      :maxSelectedLabels="3"
      class="w-full md:w-80"
    />
    <!-- filter op ammeneties -->
    <MultiSelect
      v-model="selectedCampingAmenities"
      :options="campingAmenities"
      optionLabel="name"
      filter
      placeholder="Ameneties"
      :maxSelectedLabels="3"
      class="w-full md:w-80"
    />
  </div>
</template>
