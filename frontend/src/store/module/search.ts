/* eslint-disable */
import axios from "axios";
import week from "./week";
import _ from "lodash";
import { api } from "@/config/index";

import { GENED as genedConvert } from "@/constant/index";

export default {
  namespaced: true,
  modules: {
    week
  },
  state: {
    GENED: null,
    search: {
      text: "",
      kind: [], // ["so", "hu", "sci", "in"]
      week: null,
      showFullCourse: true,
      showUnsureGened: true
    }
  },
  getters: {
    search(state) {
      return state.search;
    },
    GENED(state) {
      return state.GENED;
    },
    GENEDFILTER(state, getters) {
      return (
        state.GENED &&
        _.chain(state.GENED)
          .filter(o => {
            // console.log(state.search.kind);
            return _.includes(state.search.kind, o.gened.nameEN);
          })
          .filter(o => {
            const data = JSON.stringify(o).toLowerCase();
            const search = state.search.text.toLowerCase();
            return _.every(_.split(search), tok => data.includes(tok));
          })
          .reduce((res: any[], obj) => {
            const validsection = _.reduce(
              _.entries(obj.schedule.record),
              (obj: any, [section, rooms]: any) => {
                if (getters.filterByWeekSection(rooms)) {
                  obj[section] = rooms;
                  if (!state.search.showUnsureGened) {
                    obj[section] = obj[section].filter(getters.filterSureGened);
                  }
                  if (!state.search.showFullCourse) {
                    // eslint-disable-next-line
                    obj[section] = obj[section].filter(getters.filterAvailSeatSection);
                  }
                  if (_.isEmpty(obj[section])) {
                    delete obj[section];
                  }
                }
                return obj;
              },
              {}
            );

            if (!_.isEmpty(validsection)) {
              let afterfilter = { ...obj };
              afterfilter.schedule = validsection;
              res.push(afterfilter);
            }
            return res;
          }, [])
          .value()
      );
    },
    filterSureGened: (state, getters) => (section: any) => {
      return section.หมายเหตุ.indexOf("GENED") != -1;
    },
    filterAvailSeatSection: (state, getters) => (section: any) => {
      return Number(section.ลงทะเบียน) < Number(section.ที่นั้งทั้งหมด);
    },
    filterByWeekSection: (state, getters) => (section: any[]) => {
      const timeformat = /^.+:.+$/;
      return _.chain(section)
        .map(({ วันเรียน: d, เวลาเริ่ม: s, เวลาจบ: t }) => {
          if (timeformat.test(s) && timeformat.test(t)) {
            let [ns, nt] = [s, t].map(_ => Number(_.replace(":", ".")));
            ns = Math.ceil(ns);
            nt = Math.floor(nt);
            return _.chain(_.range(ns, nt))
              .map(tm => getters["week/get"](d, tm))
              .every()
              .value();
          } else {
            return true;
          }
        })
        .every()
        .value();
    }
  },
  mutations: {
    setGened(state, newVal) {
      state.GENED = newVal;
    },
    edit(state, value) {
      state.search = _.assign(state.search, value);
    }
  },
  actions: {
    async reloadGened(store, force) {
      return (
        axios
          .get(`${api}/scape/gened/all${force ? "&force=true" : ""}`)
          .then(res => res.data)
          // .then(res => res.list)
          .then(gened => {
            store.commit("setGened", gened);
            return gened;
          })
      );
    },
    async getCourse(_, code) {
      const url = `${api}/scape/course/${code}`;
      const res = await axios.get(url).then(res => res.data);
      return res != null ? res : await axios.get(url + "?force=true").then(res => res.data);
    }
  }
};
