// import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
// import HomeView from "../views/LoginView.vue";

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: HomeView,
//     },
//     {
//       path: "/login",
//       name: "login",
//       component: LoginView,
//     },
//   ],
// });

// export default router;

import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import CampingCatalogusView from "../views/CampingCatalogusView.vue";
import CampingSpotDetailView from "../views/CampingSpotDetailView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  {
    path: "/campingspots",
    name: "campingspots",
    component: CampingCatalogusView,
  },
  { path: "/spot/:id", name: "spotDetail", component: CampingSpotDetailView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
