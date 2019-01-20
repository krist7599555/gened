<template lang="pug">
div
  aside.menu.section
    div(align='center')
      h1.title GENED.ML
    br
    b-input(v-model='search.text' placeholder="Search..." type="search" icon="search" rounded)
    br
    p.menu-label ชื่นชอบ
    ul.menu-list
      li(v-for='{name, code} in favorite')
        router-link.is-flex(:to='"/" + code')
          //- b-icon.star(icon='star' pack='fas')
          b-icon.thumbtack(icon='thumbtack' pack='fas')
          span(style="padding-left: 0.5rem; padding-top: 0.1rem;") {{name}} ({{code}})
    p.menu-label หมวด
    ul.menu-list
      li
        a(v-for='i in 5')
          b-checkbox(
            type='is-info'
            v-model='search.kind' 
            :native-value='GENED[i].en' 
          ) {{ GENED[i].sht }} ({{ GENED[i].en.toUpperCase() }})
    p.menu-label ตาราง
    div(style='margin-left: -0.7rem; margin-right: -0.3rem; margin-bottom: 1rem;')  
      WeekSelect
    p.menu-label แสดงผล
      .field: b-switch(type='is-success' :value='getState.showFullCourse' @input='setState({"showFullCourse": $event})') รายวิชาที่เต็มแล้ว
      .field: b-switch(type='is-success' :value='getState.showUnsureGened' @input='setState({"showUnsureGened": $event})') รายวิชาที่ไม่ขึ้นหมายเหตุ GENED
    p.menu-label เกี่ยวกับ
    ul.menu-list
      li
        a ผู้สร้าง
      li
        a รายงานปัญหา
    p.menu-label note
    MemoiTextArea(key='notes')
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import WeekSelect from "../../components/WeekSelect.vue";
import MemoiTextArea from "../../components/MemoiTextArea.vue";
import _ from "lodash";

@Component({
  components: { WeekSelect, MemoiTextArea }
})
// @ts-ignore
export default class SideBar extends Vue {
  GENED = require("../../const.ts").GENED;
  search = { text: "", kind: ["so", "hu", "sci", "in"] };
  favorite = [
    {
      name: "POP/DEV",
      code: "2110215"
    },
    {
      name: "PROG METH",
      code: "2110101"
    }
  ];

  // @ts-ignore
  @Getter("search/search") getState: any;
  // @ts-ignore
  @Mutation("search/edit") setState: any;

  @Watch("search", { deep: true })
  // @ts-ignore
  updateState() {
    this.setState(this.search);
  }
  mounted() {
    this.setState(this.search);
  }
}
</script>

<style lang="scss" scoped>
.star {
  color: #ffc82e;
}
.thumbtack {
  color: #d6310c;
}
.menu-list a {
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  font-size: 0.9rem;
}
.menu-label:not(:last-child) {
  margin-bottom: 0.8em;
}

.menu-label:not(:first-child) {
  margin-top: 0.8em;
}
</style>
