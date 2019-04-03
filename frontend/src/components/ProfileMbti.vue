<template lang="pug">
div
  img(src='https://storage.googleapis.com/neris/public/images/logo.svg' width='200')
  div(v-if='!value')
    br
    p MBTI (Myers-Briggs Type Indicator) เป็นแบบวัดบุคลิกภาพที่ได้รับความนิยมอย่างแพร่หลายโดยใช้ในการวัดความชอบในอาชีพ ความสนใจ แม้กระทั่งการเลือกคู่ครอง โดยเกณฑ์ของแบบวัดนี้จะแบ่งบุคคลออกเป็น 4 มิติ ด้วยอักษรทั้งหมด 4 ตัว ซึ่งไม่เพียงแต่จะทำให้เราได้เจองานที่ใช่ แต่ก็ยังทำให้เรารู้จักตัวเองมากขึ้นด้วย
  div(v-else)
    h1.is-size-3: strong {{value.type5 | uppercase}}
    div(style='height: 430px')
      p {{value.desc.th}}
        a.is-size-7(:href='value.link.th')  อ่านเพิ่มเติม
      p {{value.desc.en}}
        a.is-size-7(:href='value.link.en')  read more
      IEcharts(
        :option="initOpts"
        :loading="false"
        @ready=""
        @click=""
        :resizable="true"
        :initOpts="initOpts"
      )
  br
  br
  router-link(to='mbti')
    button.button.is-large.is-warning(style='border: solid #c5a325; border-width: 0px 0px 4px 0px')
      span {{value ? "Retake a survey" : "Take a short survey"}}
      b-icon(icon='chevron-right')
</template>

<script type="text/babel">
import * as _ from "lodash";
import IEcharts from "vue-echarts-v3/src/full.js";

export default {
  props: ["value"],
  components: { IEcharts },
  data() {
    return {};
  },
  computed: {
    initOpts() {
      const addconstant = 0;
      const d = this.value.detail;
      const m = _.mapValues(
        _.assign.apply(_, _.values(d)),
        s => addconstant + Number(_.trim(s, "%"))
      );
      const indicator = _.map(m, (v, k) => ({
        text: k,
        max: 90 + addconstant
      }));
      const mbtidata = _.values(m);
      return {
        title: {
          text: "" && `Your MBTI (${this.value.type5.toUpperCase()})`,
          subtext: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "bottom"
          // data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"]
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        polar: [
          {
            indicator: indicator
          }
        ],
        calculable: true,
        series: [
          {
            name: "",
            type: "radar",
            data: [
              {
                value: mbtidata,
                name: ""
              }
              // {
              //   value: [5000, 14000, 28000, 31000, 42000, 21000],
              //   name: "实际开销（Actual Spending）"
              // }
            ]
          }
        ]
      };
    }
  }
};
</script>

<style scoped></style>
