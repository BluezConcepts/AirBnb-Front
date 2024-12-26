<script setup>
import { RouterLink, RouterView } from "vue-router";
import Button from "primevue/button";
import { ref } from "vue";
const userData = ref(sessionStorage.getItem("userObject"));
function logout() {
  sessionStorage.removeItem("userObject");
  userData.value = null;
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav
        class="bg-blue-600 text-white py-4 px-6 shadow flex gap-4 items-center justify-between"
      >
        <!-- logo kekw -->
        <div class="text-lg font-bold mr-6">CamperDamper</div>
        <!-- main content nav -->
        <div class="flex gap-6">
          <RouterLink to="/"> <span>Home</span> </RouterLink>
          <RouterLink to="/campingspots"><span>Spots</span></RouterLink>
          <RouterLink to="/contact"> <span>Contact</span> </RouterLink>
        </div>
        <!-- Login dingen -->
        <div class="flex gap-4">
          <RouterLink v-if="!userData" to="/login">
            <span>Login</span>
          </RouterLink>
          <RouterLink v-if="!userData" to="/register">
            <span>Register</span>
          </RouterLink>

          <!-- Show My Bookings for normal users -->
          <RouterLink v-if="userData && !userData.isOwner" to="/my-bookings">
            <span>My Bookings</span>
          </RouterLink>

          <!-- Show Manage Spots for owners -->
          <RouterLink v-if="userData && userData.isOwner" to="/manage-spots">
            <span>Manage Spots</span>
          </RouterLink>

          <RouterLink v-if="userData" to="/account-profile">
            <span>My Account</span>
          </RouterLink>
          <RouterLink v-if="userData" @click="logout" to="/">
            <span>Log-Out</span>
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
