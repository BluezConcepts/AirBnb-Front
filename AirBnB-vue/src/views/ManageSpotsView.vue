<script setup>
import ManageSpotsComponent from "../components/ManageSpotsComponent.vue";
import { useRouter } from "vue-router";

const userData = JSON.parse(sessionStorage.getItem("userObject"));
const router = useRouter();

// Redirect non-owners to login or another page
if (!userData || !userData.isOwner) {
  router.push("/login");
}
</script>

<template>
  <div class="manage-spots-page">
    <header class="text-center py-4 bg-blue-500 text-white shadow-md">
      <h1 class="text-3xl font-bold">Manage Spots</h1>
    </header>
    <main class="container mx-auto">
      <ManageSpotsComponent :userId="userData.userId" />
    </main>
  </div>
</template>
