<template lang="pug">
#home.columns(style='overflow: hidden')
  .column.section.hero.is-fullheight
    .box
      .content
        h1 GENED.ML
        h2 NOT FOUND :(
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { genedData, genedSection } from "./type";
import _ from "lodash";

import WeekSelect from "../components/WeekSelect.vue";
import CourseCard from "../components/CourseCard.vue";
import MemoiTextArea from "../components/MemoiTextArea.vue";
import SideBar from "./Sidebar.vue";
import RegNumber from "../components/RegNumber.vue";

import * as constant from "../constant/index";

@Component({
  components: {
    WeekSelect,
    CourseCard,
    MemoiTextArea,
    SideBar,
    RegNumber
  }
})
// @ts-ignore
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.section {
  background: linear-gradient(0.7turn, #3f87a6, #ebf8e1, #f69d3c);
  @media screen and (max-width: 500px) {
    padding: 3rem 0.3rem !important;
  }
}
.monospace {
  font-family: monospace;
}
</style>

// <style lang="scss"></style>
