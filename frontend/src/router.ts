import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Course from "./views/Course.vue";

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
      path: "/course/:courseId",
      name: "course",
      component: Course
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/mbti",
      name: "mbti",
      component: () => import("./views/Mbti.vue")
    },
    {
      path: "*",
      name: "notfound",
      component: () => import("./views/Notfound.vue")
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
