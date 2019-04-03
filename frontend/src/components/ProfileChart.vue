<template>
  <div>
    <!-- <pre>{{ value }}</pre> -->
    <!-- <code>{{ echartopt }}</code> -->
    <!-- {{ focusItem }} -->
    <div class="echarts">
      <IEcharts
        :option="bar2"
        :loading="loading"
        @ready="onReady"
        @click="onClick"
        :resizable="true"
        :initOpts="initOpts"
      />
    </div>
    <template v-if="focusItem">
      <!-- {{ focusList }} -->
      <br />
      <h1 class="is-size-4">
        {{ focusItem.name }} เมื่อ {{ focusItem.seriesName }}
      </h1>
      <br />
      <table class="table">
        <thead>
          <tr>
            <td>Course</td>
            <td>Name</td>
            <td>Credit</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in focusList" :key="course.id">
            <td>
              <router-link :to="'/course/' + course.no">
                {{ course.no }}
              </router-link>
            </td>
            <td>{{ course.title }}</td>
            <td>{{ course.credit }}</td>
            <!-- <td>{{ course.time }}</td> -->
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script type="text/babel">
// https://ecomfe.github.io/echarts-doc/public/en/index.html
// https://www.npmjs.com/package/vue-echarts-v3
import IEcharts from "vue-echarts-v3/src/full.js";
import * as _ from "lodash";
import * as fp from "lodash/fp";

export default {
  name: "profilechart",
  components: {
    IEcharts
  },
  props: {
    value: Array
  },
  computed: {
    echartopt() {
      const value = this.value;
      const uniqtime = _.uniq(_.map(value, "time"));
      const source = _.map(_.groupBy(value, "grade"), (ar, grade) =>
        _.assign(
          { grade },
          _.mapValues(_.groupBy(ar, "time"), a => _.sum(_.map(a, "credit")))
        )
      );
      console.log(source);
      return {
        dimensions: ["grade"].concat(uniqtime),
        source: _.orderBy(source, ["grade.0", "grade.1"]),
        series: _.times(uniqtime.length, () => ({
          type: "bar",
          stack: "stack_name_1",
          itemStyle: { normal: { label: { show: true } } }
        }))
      };
    },
    bar2() {
      let bar = this.bar;
      bar.dataset.dimensions = this.echartopt.dimensions;
      bar.dataset.source = this.echartopt.source;
      bar.series = this.echartopt.series;
      return bar;
    },
    focusList() {
      const fi = this.focusItem;
      if (fi == null) return [];
      return this.value.filter(
        o => o.time == fi.seriesName && o.grade == fi.name
      );
    }
  },
  data: () => ({
    focusItem: null,
    loading: false,
    // initOpts: { renderer: "canvas" },
    initOpts: {
      renderer: "canvas"
    },
    bar: {
      grid: {
        y: 110,
        y2: 30
        // x2: 10
      },
      dataset: {
        dimensions: ["", "ปี1 เทอม1", "2016", "2017"],
        source: [
          { grade: "A", "ปี1 เทอม1": 43.3, "2016": 85.8, "2017": 93.7 },
          { grade: "B+", "ปี1 เทอม1": 83.1, "2016": 73.4 },
          { grade: "B", "ปี1 เทอม1": 86.4, "2016": 65.2, "2017": 82.5 },
          { grade: "C+", "2016": 53.9, "2017": 39.1 }
        ]
      },
      legend: {
        show: true
      },
      title: {
        text: ""
      },
      calculable: true,
      toolbox: {
        show: true,
        feature: {
          magicType: {
            show: false,
            type: ["stack", "tiled"],
            title: {
              line: "stack title",
              bar: "bar"
            }
          },
          // restore: { show: true },
          // saveAsImage: { show: true },
          lang: "turn off"
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        type: "category",
        name: "" // grade
      },
      yAxis: [
        {
          type: "value",
          name: "", // credit
          axisLabel: {
            formatter: "{value}"
          }
        }
      ],
      series: [
        {
          type: "bar",
          stack: "stack_name_1",
          itemStyle: {
            normal: {
              label: {
                show: true
              }
            }
          }
        },
        {
          type: "bar",
          stack: "stack_name_1",
          itemStyle: {
            normal: {
              label: {
                show: true
              }
            }
          }
        },
        {
          type: "bar",
          stack: "stack_name_1",
          itemStyle: {
            normal: {
              label: {
                show: true
              }
            }
          }
        }
      ],
      color: [
        "#3e5a6d",
        "#4e6f8c",
        "#749f83",
        "#91c7ae",
        "#7FCABD",
        "#85cad1",
        "#61a0a8",
        "#63A386",
        "#4e8c71"
      ]
    }
  }),
  methods: {
    doRandom() {
      const that = this;
      let data = [];
      for (let i = 0, min = 5, max = 99; i < 6; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min));
      }
      that.loading = !that.loading;
      that.bar.series[0].data = data;
    },
    onReady(instance, ECharts) {
      // console.log(instance, ECharts);
    },
    onClick(event, instance, ECharts) {
      // console.log(arguments);
      const { name, seriesName } = event;
      this.focusItem = { name, seriesName };
    }
  }
};
</script>

<style scoped>
.echarts {
  /* width: 50vw; */
  height: 400px;
  min-height: 400px;
}
.sth {
  color: "#85DBE3";
}
</style>
