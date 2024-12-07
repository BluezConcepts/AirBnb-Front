<script setup>
import { RouterLink, RouterView } from "vue-router";
import Button from "primevue/button";
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
          <RouterLink to="/login"> <span>Login</span> </RouterLink>
          <RouterLink to="/register"> <span>Register</span> </RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
