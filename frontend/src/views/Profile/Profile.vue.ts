import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { genedData, genedSection } from "@/views/type";
import _ from "lodash";

import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "zrender/lib/svg/svg";

// const theme = require("./EChart-theme.json");
import * as theme from "./EChart-theme.json";
ECharts.registerTheme("ovilia-green", theme);
// import "echarts/lib/chart/bar";
// import "echarts/lib/chart/line";
// import "echarts/lib/chart/pie";
// import "echarts/lib/chart/map";
// import "echarts/lib/chart/radar";
// import "echarts/lib/chart/scatter";
// import "echarts/lib/chart/effectScatter";
// import "echarts/lib/component/tooltip";
// import "echarts/lib/component/polar";
// import "echarts/lib/component/geo";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/dataset";
import "echarts/map/js/world";
import "zrender/lib/svg/svg";

import Sidebar from "@/views/Sidebar/Sidebar.vue";

import * as constant from "@/constant/index";

@Component({
  components: { Sidebar, ECharts }
})
export default class Profile extends Vue {
  focusSubject = [] as any[];
  initOptions = {
    renderer: "svg"
  };

  @Getter("auth/user") user: any;

  timeformat(o) {
    return `${o.year} ${o.semesterth}`;
  }

  formatCR60() {
    console.log("format cr60");
    const cr60 = this.user ? this.user.cr60 : [];
    let group: any[] = [];
    for (const { period, detail, summary } of cr60) {
      for (const { no, title, credit, grade } of detail) {
        group.push({
          no,
          title,
          credit,
          grade,
          time: this.timeformat(period)
        });
      }
    }
    group = _.sortBy(group, ["time", "grade"]);
    const alltime = _.sortedUniq(_.map(group, o => o.time));
    const allgrade = _.sortedUniq(_.map(group, o => o.grade));
    console.log(group);
    const res = _.mapValues(_.groupBy(group, "time"), ar => {
      return _.mapValues(_.groupBy(ar, "grade"), ar2 => {
        return ar2.length;
      });
    });
    console.log(res);
    const echartfm = _.map(res, (v, k) => {
      return {
        name: k,
        type: "bar",
        stack: "--",
        label: {
          normal: {
            show: true,
            position: "insideRight"
          }
        },
        data: _.map(allgrade, g => _.get(v, g, 0))
      };
    });
    console.log(echartfm);
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        data: allgrade
      },
      xAxis: {
        type: "value"
      },
      yAxis: {
        type: "category",
        data: alltime
      },
      series: echartfm
    };
  }

  get gradecourse() {
    if (!this.user) return [];
    this.formatCR60();
    let res = _.flatten(this.user.cr60.map(o => o.detail));
    return res;
  }
  get gradecounter() {
    return _.sortBy(
      _.map(_.groupBy(this.gradecourse, "grade"), (v, k) => [k, v.length]),
      (grade, cnt) => grade
    );
  }
  focus(grade) {
    this.focusSubject = this.gradecourse.filter((o: any) => o.grade == grade);
  }
  get bar() {
    return {
      scales: {
        yAxes: [
          {
            stacked: true
          }
        ],
        xAxes: [
          {
            stacked: true
          }
        ]
      },
      legend: {
        display: true
      },
      responsive: true,
      maintainAspectRatio: false,
      tooltip: {},
      dataset: {
        source: [
          ["_A_", "num1", "num2"],
          ["A", 5, 1],
          ["B+", 4, 3],
          ["B", 2, 1],
          ["C+", 4, 4],
          ["C", 2, 4],
          ["V", 2, 2]
        ]
      },
      xAxis: { type: "category" },
      yAxis: { type: "value" },
      series: [{ type: "bar" }, { type: "bar" }]
    };
  }
}
