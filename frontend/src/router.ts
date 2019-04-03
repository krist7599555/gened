/* eslint-disable */
import Vue from "vue";
import { AsyncComponent } from "vue/types";
import { AsyncComponentFactory, AsyncComponentPromise } from "vue/types/options";
import Router from "vue-router";

// import Mbti from "@/views/Mbti/Mbti.vue";
// import Profile from "@/views/Profile/Profile.vue";
// import Course from "@/views/Course/Course.vue";
// import NotFound from "@/views/NotFound/NotFound.vue";

// const Loading: AsyncComponent = () => import(/* */ "@/views/Loading/Loading.vue");

const Home = () => import(/* webpackChunkName: "home" */ "./views/Home/Home.vue");
const Mbti = () => import(/* webpackChunkName: "mbti" */ "./views/Mbti/Mbti.vue");
// const Profile = () => import(/* webpackChunkName: "profile" */ "@/views/Profile/Profile.vue");
// const Building = () => import(/* webpackChunkName: "building" */ "@/views/Building/Building.vue");
// const Course = () => import(/* webpackChunkName: "course" */ "@/views/Course/Course.vue");
// const NotFound = () => import(/* webpackChunkName: "notfound" */ "@/views/NotFound/NotFound.vue");

import Loading from "@/views/Loading/Loading.vue";
import c2 from "./views/Test/C2.vue";
import c3 from "./views/Test/C3.vue";

function resolveAfter(val, ms) {
  return new Promise((res, rej) => {
    console.log("resolve after", new Date().getTime());
    setTimeout(() => res(val), ms);
  });
}

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      // component: Loading
      // component: (() => ({
      // component: Home() as any,

      component: (() => {
        console.log("start");
        const horm_pr = Home();
        const horm_pr2 = new Promise<any>((res, rej) => {
          setTimeout(() => {
            console.log("3sec");
            res(horm_pr);
          }, 3000);
        });
        return {
          timeout: 5000,
          error: Loading,
          loading: Loading,
          component: horm_pr2
        };
      }) as any

      // loading: Loading
      //   error: Mbti,
      //   delay: 1000,
      //   timeout: 1000
      // })) as AsyncComponentFactory
    },
    // {
    //   path: "/course/:course",
    //   name: "course",
    //   component: Course //view("Course")
    // },
    // {
    //   path: "/profile",
    //   name: "profile",
    //   component: Profile,
    //   meta: {
    //     auth: true,
    //     authline: true
    //   }
    // },
    // {
    //   path: "/mbti",
    //   name: "mbti",
    //   component: Mbti,
    //   meta: {
    //     auth: true
    //   }
    // },
    {
      path: "/test",
      name: "test",
      component: () => ({
        loading: c2,
        error: c3,
        component: resolveAfter(import("./views/Test/C1.vue"), 1000),
        delay: 8,
        timeout: 10000
      })
    }
    // {
    //   path: "/building/:code",
    //   name: "building",
    //   component: Building
    // },
    // // {
    // //   path: "/test",
    // //   name: "test",
    // //   component: () => import("./components/Chart.vue")
    // // },
    // {
    //   path: "*",
    //   name: "notfound",
    //   component: NotFound
    // }
  ]
});
