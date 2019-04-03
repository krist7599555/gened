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
      dataset: {
        dimensions: ["product", "2015", "2016", "2017"],
        source: [
          { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
          { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
          { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
          {
            product: "Walnut Brownie",
            "2015": 72.4,
            "2016": 53.9,
            "2017": 39.1
          }
        ]
      },
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
        type: "category"
        // data: ["A", "B+", "B", "C+", "C", "D"]
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
          type: "bar",
          stack: "stack_name_1",
          itemStyle: {
            normal: {
              label: {
                show: true
                // position: "insideCenter"
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
                // position: "insideCenter"
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
                // position: "insideRight"
              }
            }
          }
        }
      ],

      color: [
        "#61a0a8",
        "#91c7ae",
        "#749f83",
        "#2f4554",
        "#D2E8E1",
        "#7FCABD",
        "#CDF0F0",
        "#63A386",
        "#85DBE3"

        // "#d48265",
        // "#91c7ae",
        // "#749f83",
        // "#ca8622",
        // "#bda29a",
        // "#6e7074",
        // "#546570",
        // "#c4ccd3"
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
