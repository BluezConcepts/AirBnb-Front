<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ProfileFormComponent from "../components/ProfileFormComponent.vue";
const router = useRouter();

//const userData = sessionStorage.getItem("userObject"); // Store user data from sessionStorage
// if (!userData) {
//   router.push("/login");
// }
const userData = JSON.parse(sessionStorage.getItem("userObject"));
// Fetch user data from sessionStorage
onMounted(() => {
  console.log(userData);
  if (!userData) {
    alert("You must be logged in to access the profile page.");
    router.push("/login"); // Redirect to login page if not logged in
    return;
  }
});
</script>

<template>
  <div class="profile-page">
    <header class="text-center py-4 bg-blue-500 text-white shadow-md">
      <h1 class="text-3xl font-bold">My Profile</h1>
    </header>

    <!-- Profile Form -->
    <ProfileFormComponent :user="userData" />
  </div>
</template>
