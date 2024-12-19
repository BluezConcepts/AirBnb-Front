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

<!-- container that contains->  Datum / Locatie? / Capacity hoeveelheid mensen / filteren op tag. -->
<template>
  <div
    class="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:grid md:grid-cols-2 lg:grid-cols-3"
  >
    <!-- Start Date -->
    <div class="flex flex-col w-full">
      <FloatLabel>
        <DatePicker
          v-model="selectedStartDateFilter"
          inputId="start_date"
          showIcon
          iconDisplay="input"
          class="w-full"
        />
        <label for="start_date">Start Date</label>
      </FloatLabel>
    </div>

    <!-- End Date -->
    <div class="flex flex-col w-full">
      <FloatLabel>
        <DatePicker
          v-model="selectedEndDateFilter"
          inputId="end_date"
          showIcon
          iconDisplay="input"
          class="w-full"
        />
        <label for="end_date">End Date</label>
      </FloatLabel>
    </div>

    <!-- Cities Dropdown -->
    <div class="flex flex-col">
      <MultiSelect
        v-model="selectedCities"
        :options="cities"
        optionLabel="name"
        optionValue="id"
        filter
        placeholder="Select Cities"
        :maxSelectedLabels="3"
        class="w-full"
      />
    </div>

    <!-- People Capacity -->
    <div class="flex flex-col">
      <FloatLabel>
        <InputNumber
          v-model="selectedPeopleCapacity"
          inputId="minmax-buttons"
          mode="decimal"
          showButtons
          :min="1"
          :max="100"
          fluid
        />
      </FloatLabel>
    </div>

    <!-- Tags Filter -->
    <div class="flex flex-col">
      <MultiSelect
        v-model="selectedTags"
        :options="campingTags"
        optionLabel="name"
        optionValue="id"
        filter
        placeholder="Select Tags"
        :maxSelectedLabels="3"
        class="w-full"
      />
    </div>

    <!-- Amenities Filter -->
    <div class="flex flex-col">
      <MultiSelect
        v-model="selectedAmeneties"
        :options="campingAmenities"
        optionLabel="name"
        optionValue="id"
        filter
        placeholder="Select Amenities"
        :maxSelectedLabels="3"
        class="w-full"
      />
    </div>
  </div>
</template>
