const DAYS = ["MO", "TU", "WE", "TH", "FR"];
const TIMES = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
import ls from "local-storage";
import _ from "lodash";
import { contains as _includes } from "lodash/fp";

export default {
  namespaced: true,
  state: {
    TABLE: ls.get("weekSelect") || _.zipObject(DAYS, _.map(DAYS, () => Array.from(TIMES)))
  },
  getters: {
    DAYS: () => DAYS,
    TIMES: () => TIMES,
    TABLE: state => state.TABLE,
    get: (state: any) => (d: string, t: number) => {
      d = d.toUpperCase();
      return t < 8 || t > 17 || !(d in state.TABLE) || _includes(t)(state.TABLE[d]);
    }
  },
  mutations: {
    update(state, { d, t }) {
      if (d && t) {
        // @ts-ignore
        state.TABLE[d].toggle(t);
      } else if (d) {
        if (!_.isEmpty(state.TABLE[d])) state.TABLE[d] = [];
        else state.TABLE[d] = Array.from(TIMES);
      } else if (t) {
        const isRemove = _.some(_.map(state.TABLE, _includes(t)));
        for (let day in state.TABLE) {
          state.TABLE[day] = isRemove
            ? _.filter(state.TABLE[day], vl => vl != t)
            : _.union(state.TABLE[day], [t]);
        }
      }
      ls.set("weekSelect", state.TABLE);
    }
  }
};
