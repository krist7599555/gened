import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import auth from "./module/auth";
import search from "./module/search";
import mbti from "./module/mbti_";
import social from "./module/social";
import cache from "./module/cache";

const store = new Vuex.Store({
  strict: process.env.NODE_ENV != "production",
  modules: {
    mbti,
    auth,
    cache,
    search,
    social
  }
});

export default store;
