<script setup>
import { ref } from "vue";
import FloatLabel from "primevue/floatlabel";
import DatePicker from "primevue/datepicker";
import InputNumber from "primevue/inputnumber";
import MultiSelect from "primevue/multiselect";

const props = defineProps({
  filter: Object,
});

//  constants for cities, tags, and amenities
const cities = [
  { id: "durbuy", name: "Durbuy, Belgium" },
  { id: "ostend", name: "Ostend, Belgium" },
  { id: "ghent", name: "Ghent, Belgium" },
  { id: "antwerp", name: "Antwerp, Belgium" },
  { id: "lier", name: "Lier, Belgium" },
  { id: "mechelen", name: "Mechelen, Belgium" },
  { id: "kortrijk", name: "Kortrijk, Belgium" },
];

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
</script>

<template>
  <div
    class="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:grid md:grid-cols-2 lg:grid-cols-3"
  >
    <!-- Start Date -->
    <div class="flex flex-col w-full">
      <FloatLabel>
        <DatePicker
          v-model="filter.startDate"
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
          v-model="filter.endDate"
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
        v-model="filter.cities"
        :options="cities"
        optionLabel="name"
        optionValue="name"
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
          v-model="filter.capacity"
          inputId="capacity"
          mode="decimal"
          showButtons
          :min="1"
          :max="100"
          fluid
        />
        <label for="capacity">Capacity</label>
      </FloatLabel>
    </div>

    <!-- Tags -->
    <div class="flex flex-col">
      <MultiSelect
        v-model="filter.tags"
        :options="campingTags"
        optionLabel="name"
        optionValue="name"
        filter
        placeholder="Select Tags"
        :maxSelectedLabels="3"
        class="w-full"
      />
    </div>

    <!-- Amenities -->
    <div class="flex flex-col">
      <MultiSelect
        v-model="filter.amenities"
        :options="campingAmenities"
        optionLabel="name"
        optionValue="name"
        filter
        placeholder="Select Amenities"
        :maxSelectedLabels="3"
        class="w-full"
      />
    </div>
  </div>
</template>
