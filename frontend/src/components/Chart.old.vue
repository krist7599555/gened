<template>
  <div class="echarts">
    <IEcharts
      :option="bar"
      :loading="loading"
      @ready="onReady"
      @click="onClick"
      :resizable="true"
      :initOpts="initOpts"
    />
    <button @click="doRandom">Random</button>
  </div>
</template>

<script type="text/babel">
// https://ecomfe.github.io/echarts-doc/public/en/index.html
// https://www.npmjs.com/package/vue-echarts-v3
import IEcharts from "vue-echarts-v3/src/full.js";
export default {
  name: "view",
  components: {
    IEcharts
  },
  props: {},
  data: () => ({
    loading: false,
    initOpts: { renderer: "canvas" },
    bar: {
      legend: {
        show: true
      },
      title: {
        text: "grade"
      },
      calculable: true,
      toolbox: {
        show: true,
        feature: {
          // mark: { show: true },
          // dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["stack", "tiled"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        data: ["A", "B+", "B", "C+", "C", "D"]
      },
      yAxis: [
        {
          type: "value",
          name: "水量",
          axisLabel: {
            formatter: "{value} หน่วยกิต"
          }
        }
      ],
      series: [
        {
          name: "เทอม 1",
          type: "bar",
          stack: "stack1",
          itemStyle: {
            normal: { label: { show: true, position: "insideRight" } }
          },
          data: [5, 20, 36, 10, 10, 20]
        },
        {
          name: "เทอม 2",
          type: "bar",
          stack: "stack1",
          itemStyle: {
            normal: { label: { show: true, position: "insideRight" } }
          },
          data: [5, 20, 36, 10, 10, 20]
        }
      ],
      color: [
        "#61a0a8",
        "#c23531",
        "#2f4554",
        "#d48265",
        "#91c7ae",
        "#749f83",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3"
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
      console.log(instance, ECharts);
    },
    onClick(event, instance, ECharts) {
      console.log(arguments);
    }
  }
};
</script>

<style scoped>
.echarts {
  width: 50vw;
  height: 400px;
}
</style>
