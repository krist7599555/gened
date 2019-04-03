/* eslint-disable */

import { register, unregister } from "register-service-worker";
import store from "./store/store";

export { unregister };

if (process.env.NODE_ENV === "production") {
  console.log("Register service worker");
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updated() {
      console.log("New content is available; please refresh.");
      store.commit("cache/setUpdated", true);
    },
    offline() {
      console.log("No internet connection found. App is running in offline mode.");
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
