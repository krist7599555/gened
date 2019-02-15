import axios from "axios";
import { api } from "@/config/index";
import cookie from "cookiejs";
import * as _ from "lodash";

export default {
  namespaced: true,
  state: {
    isLogin: !!cookie.get("token"),
    user: null as any
  },
  mutations: {
    updateLogin(state) {
      state.isLogin = !!cookie.get("token");
    },
    setUser(state, user) {
      state.user = _.cloneDeep(user);
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    user: state => state.user
  },
  actions: {
    logout(store) {
      // @ts-ignore
      cookie.clear();
      // cookie.empty();
      store.commit("updateLogin");
    },
    login(store, { username, password }) {
      return axios({
        method: "POST",
        url: `${api}/auth/sso/login`,
        // withCredentials: true,
        data: {
          username,
          password
        }
      })
        .then(res => res.data)
        .then(res => {
          const rescookie = {
            ouid: res.ouid,
            token: res._id,
            ticket: res.ticket
          };
          _.map(rescookie, (v, k) =>
            cookie.set(k, v, {
              expires: 2
            })
          );
          store.commit("setUser", res);
          store.commit("updateLogin");
          return res;
        })
        .catch(res => {
          console.error(res);
          const msg = res.response.data;
          throw typeof msg == "string" ? msg : `unknow error`;
        });
    },
    async getUserInfo(store) {
      const ticket = cookie.get("ticket");
      if (ticket) {
        const user = await axios
          .get(`${api}/auth/sso/getUserInfo`, {
            withCredentials: true
          })
          .then(res => res.data);
        store.commit("setUser", user);
        return user;
      } else {
        return null;
      }
    }
  }
};
