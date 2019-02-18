import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home/Home.vue";
import Mbti from "@/views/Mbti/Mbti.vue";
import Profile from "@/views/Profile/Profile.vue";
import Course from "@/views/Course.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/course/:course",
      name: "course",
      component: Course
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/mbti",
      name: "mbti",
      component: Mbti
    },
    {
      path: "*",
      name: "notfound",
      component: () => import("@/views/NotFound.vue")
    }
  ]
});
