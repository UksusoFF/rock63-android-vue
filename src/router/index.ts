import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

import ConfigPage from "@/views/ConfigPage.vue";

import EventPage from "../views/EventPage.vue";
import StartPage from "../views/StartPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Start",
    component: StartPage,
  },
  {
    path: "/config",
    name: "Config",
    component: ConfigPage,
  },
  {
    path: "/event/:id",
    name: "Event",
    component: EventPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
