import axios from "axios";
import { api } from "@/config/index";
import cookie from "cookiejs";
import * as _ from "lodash";
import { unregister } from "@/registerServiceWorker";

import router from "@/router";

export default {
  namespaced: true,
  state: {
    updated: false
  },
  mutations: {
    setUpdated(state, updated: boolean) {
      state.updated = updated;
    }
  },
  getters: {
    isUpdated: state => state.updated
  },
  actions: {
    async reload(store) {
      const svwk = await navigator.serviceWorker.getRegistration();
      if (svwk) {
        const res = await svwk.unregister();
        console.log("unregister", res ? "SUCCESS" : "FAIL");
        window.location.reload(true);
      }
    }
  }
};
