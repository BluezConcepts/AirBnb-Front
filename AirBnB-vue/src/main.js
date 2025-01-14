import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";

import Aura from "@primevue/themes/aura";

import Rating from "primevue/rating";

// // Import PrimeVue CSS and PrimeIcons
// import "primevue/resources/themes/saga-blue/theme.css"; // Choose your theme
// import "primevue/resources/primevue.min.css";
// import "primeicons/primeicons.css";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: false },
  },
});
app.use(createPinia());
app.use(router);

app.mount("#app");
