<template lang="pug">
#home.columns.is-clipped
  .column.is-1(style='min-width: 340px')
    div#sidebar
      SideBar
  .column.section.hero.is-fullheight(align='center')
    .box(align='center' style='max-width: 650px')
      div
        div.is-flex(align='center' style='margin: 0 auto; justify-content: center;')
          div
            figure.image.is-128x128
              img.is-rounded(src="https://image.flaticon.com/icons/svg/145/145867.svg")
          div.is-flex(style='align-items: center;')
            div
              h1 {{user.displayname}}
              p {{user.faculty}} # {{user.ชั้นปี}}
        div
          div
            // .is-flex(style='align-items: center;' align='center')
            figure
              ECharts(
                :options='bar'
                :init-options='initOptions'
                @click='focus($event.name)'
                ref="bar"
                theme="ovilia-green"
                autoresize
              )

          div.is-flex(style='align-items: center; justify-content: center;' align='center')
            table.table
              tbody
                tr(v-for='{no, title, grade} in focusSubject')
                  td {{grade}}
                  td {{no}}
                  td {{title}}
      hr
      div
        //- h1 {{gradecounter}}
        h4(style='word-wrap: pre') {{formatObject(user)}}

</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { genedData, genedSection } from "./type";
import _ from "lodash";

import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "zrender/lib/svg/svg";

import SideBar from "./Sidebar.vue";

import * as constant from "../constant/index";

@Component({
  components: { SideBar, ECharts }
})
// @ts-ignore
export default class Profile extends Vue {
  focusSubject = [] as any[];
  initOptions = {
    renderer: "svg"
  };
  // @ts-ignore
  @Getter("auth/user") user: any;

  // @ts-ignore
  @Watch("user")
  // @ts-ignore
  formatObject(o) {
    console.log(JSON.stringify(o, null, 2));
    return JSON.stringify(o, null, 2);
  }

  get gradecourse() {
    if (!this.user) return [];
    let res = _.flatten(this.user.cr60.map(o => o.detail));
    console.log(res);
    return res;
  }
  get gradecounter() {
    return _.sortBy(
      _.map(_.groupBy(this.gradecourse, "grade"), (v, k) => [k, v.length]),
      (grade, cnt) => grade
    );
  }
  focus(grade) {
    console.log("F", grade);
    this.focusSubject = this.gradecourse.filter((o: any) => o.grade == grade);
  }
  get bar() {
    return {
      legend: {},
      tooltip: {},
      // width: _.max([250, window.innerWidth / 3.3]),
      dataset: {
        source: this.gradecounter
        // [
        //   ["Matcha Latte", 5],
        //   ["Milk Tea", 7],
        //   ["Cheese Cocoa", 9],
        //   ["Walnut Brownie", 8]
        // ]
      },
      // Declare X axis, which is a category axis, mapping
      // to the first column by default.
      xAxis: { type: "category" },
      // Declare Y axis, which is a value axis.
      yAxis: {},
      // Declare several series, each of them mapped to a
      // column of the dataset by default.
      series: [{ type: "bar" }]
    };
  }
}
</script>

<style lang="scss" scoped>
.section {
  background: linear-gradient(0.7turn, #3f87a6, #ebf8e1, #f69d3c);
  @media screen and (max-width: 500px) {
    padding: 3rem 0.3rem !important;
  }
}
</style>

// <style lang="scss"></style>
