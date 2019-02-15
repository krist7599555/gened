import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import mbti from "./module/mbti";
import auth from "./module/auth";
import search from "./module/search";
import social from "./module/social";

const store = new Vuex.Store({
  // strict: process.env != "production",
  modules: {
    mbti,
    auth,
    search,
    social
  }
});

export default store;
