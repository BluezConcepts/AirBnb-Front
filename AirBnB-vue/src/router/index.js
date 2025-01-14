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
import CamperDashBoardView from "../views/CamperDashBoardView.vue";
import ProfilePageView from "../views/ProfilePageView.vue";
import BookingsSectionView from "../views/BookingsSectionView.vue";
import CreateBookingView from "../views/CreateBookingView.vue";
import ManageSpotsView from "../views/ManageSpotsView.vue";
import CreateCampingSpotView from "../views/CreateCampingSpotView.vue";

const routes = [
  { path: "/", name: "home", component: CamperDashBoardView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  {
    path: "/account-profile",
    name: "accountprofile",
    component: ProfilePageView,
  },
  {
    path: "/campingspots",
    name: "campingspots",
    component: CampingCatalogusView,
  },
  { path: "/spot/:id", name: "spotDetail", component: CampingSpotDetailView },
  { path: "/my-bookings", name: "myBookings", component: BookingsSectionView },
  { path: "/booking/:id", name: "createBooking", component: CreateBookingView },
  { path: "/manage-spots", name: "manageSpots", component: ManageSpotsView },
  {
    path: "/create-campingspot",
    name: "createCampingSpot",
    component: CreateCampingSpotView,
  },
  {
    path: "/edit-spot/:id",
    name: "editSpot",
    component: CreateCampingSpotView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
