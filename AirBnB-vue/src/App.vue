<script setup>
import { RouterLink, RouterView } from "vue-router";
import Button from "primevue/button";
</script>

<template>
  <header>
    <div class="wrapper hidden underline">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <Button label="Submit" />
    </div>
  </header>

  <RouterView />
</template>
