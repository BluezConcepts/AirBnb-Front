<script setup>
import { useRouter } from "vue-router";
import CreateCampingSpotComponent from "../components/CreateCampingSpotComponent.vue";

const userData = JSON.parse(sessionStorage.getItem("userObject"));
const router = useRouter();

// Redirect non-owners to login or another page
if (!userData || !userData.isOwner) {
  router.push("/login");
}
</script>

<template>
  <div class="create-camping-spot-page">
    <header class="text-center py-4 bg-blue-500 text-white shadow-md">
      <h1 class="text-3xl font-bold">Create a New Camping Spot</h1>
    </header>
    <main class="container mx-auto p-6">
      <CreateCampingSpotComponent />
    </main>
  </div>
</template>
