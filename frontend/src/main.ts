import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import "./registerServiceWorker";
// import "./style/fonts/ThaiSansNeue/ThaiSansNeue-Regular.ttf";
// import "./style/fonts/ThaiSansNeue/ThaiSansNeue-Bold.ttf";
// import "./style/fonts/ThaiSansNeue/ThaiSansNeue-Italic.otf";
// import "./style/fonts/CHULALONGKORN/CHULALONGKORNReg.otf";
// import "./style/fonts/CHULALONGKORN/CHULALONGKORNBold.otf";

import VueScroll from "vue-scrollto";
Vue.use(VueScroll);

// import VueSlideUpDown from "vue-slide-up-down-component";
// Vue.component("vue-slide-up-down", VueSlideUpDown);

Vue.filter("uppercase", function(value: string) {
  return value.toUpperCase();
});
Vue.filter("lowercase", function(value: string) {
  return value.toLowerCase();
});

import {
  library,
  dom,
  findIconDefinition,
  icon,
  IconLookup
} from "@fortawesome/fontawesome-svg-core";

import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCrown,
  faFireAlt,
  faFire,
  faSignOutAlt,
  faStar,
  faThumbtack,
  faAngleLeft,
  faAngleRight,
  faPaperPlane,
  faVenus,
  faMars,
  faCircleNotch,
  faReply,
  faRetweet,
  faHeart,
  faHandPointer,
  faSearch,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { faLine } from "@fortawesome/free-brands-svg-icons";

library.add(
  faChevronCircleRight,
  faChevronCircleLeft,
  faCrown,
  faFireAlt,
  faFire,
  faSignOutAlt,
  faStar,
  faThumbtack,
  faAngleLeft,
  faAngleRight,
  faPaperPlane,
  faVenus,
  faMars,
  faCircleNotch,
  faReply,
  faRetweet,
  faHeart,
  faHandPointer,
  faSearch,
  faEye,
  faLine
);
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// library.add(fas, far, fab);
dom.watch();
dom.i2svg();

import Buefy from "buefy";
Vue.use(Buefy, { defaultIconPack: "fas" });

import "./style/index.scss";

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

(async function() {
  await vm.$store.dispatch("auth/getUserInfo");
})();
