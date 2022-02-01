/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import Country from "@/Pages/Country/index.vue";
import City from "@/Pages/City/index.vue";
import Login from "@/Pages/Login/index.vue";

Vue.use(VueRouter);

const routes = [
  { path:"/login", name:"login", component:Login},
  { path: "/", name: 'home', redirect: "/countries" },
  { path: "/countries", name: "country", component: Country },
  { path: "/cities/:id", name: "country-cities", component: City , props: true },
  { path: "/cities", name: "city", component: City },
];

const router = new VueRouter({
  routes,
  mode: "history",
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const hasToken = localStorage.getItem("token");
  if (to.name !== "login" && !hasToken) next({ name: "login" });
  else if (to.name === 'login' && hasToken) next({ name: 'country' })
  else next();
});

export default router;
