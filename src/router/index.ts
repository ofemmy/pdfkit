import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
//import Home from "../views/Home.vue";
import Merge from "../views/Merge.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Merge,
  },
  {
    path: "/split",
    name: "Split",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "split" */ "../views/Split.vue"),
  },
  {
    path: "/merge",
    name: "Merge",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "merge" */ "../views/Merge.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
