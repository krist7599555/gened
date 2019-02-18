import axios from "axios";
import { api } from "@/config/index";
export default {
  namespaced: true,
  state: {},
  actions: {
    submit(store, answer: any) {
      return axios
        .post(`${api}/mbti/submit`, answer)
        .catch(err => {
          if (err.response.status == 408) throw "timeout";
          else throw JSON.stringify(err);
        })
        .then(res => res.data);
    }
  },
  mutation: {},
  getters: {
    question() {
      return Promise.resolve(require("./mbti.json"));
    }
  }
};
