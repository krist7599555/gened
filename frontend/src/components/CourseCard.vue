<template lang="pug">
div(style='display: flex; justify-content: center'): .content
  template(v-if='src')
    h3 {{src.course.nameSHORT}} : {{src.course.id}} 
    p
     | {{src.course.nameENG}} #[br]
     | {{src.course.nameTHAI}}
    h5 ตารางสอบ
    p
      table.is-narrow
        tbody
          tr
            td midterm
            td {{src.exam.midterm || "ไม่ระบุ"}}
          tr 
            td final
            td {{src.exam.final || "ไม่ระบุ"}}
    
    h5 ตารางเรียน
    ul
      li(v-for='($row, $sec) in src.schedule.record' :key='$row.id' style='margin: 20px 5px') 
        | sect {{$sec}} (#[RegNumber(:value="$row[0]")]) 
        span.is-size-7 ** {{$row[0].หมายเหตุ}}
        ul
          li(v-for='it in $row')
            p.
              #[b-tooltip(type='is-info' :label='DAYS[it.วันเรียน] && DAYS[it.วันเรียน].th || "---"') {{it.วันเรียน}}] {{it.เวลาเรียน}}  
              @#[b-tooltip(type='is-info' :label='BUILDING[it.อาคาร]') {{it.อาคาร}}]-{{it.ห้อง}} by {{it.ผู้สอน}}
    h5 หน่วยกิต
    p {{src.credit}}
    h5 หมายเหตุ
    p {{src.prerequisite || "-"}}
    h5 หน่วยงาน
    p {{src.faculty}}
    h5 ช่วงระยะเวลา
    p ระบบศึกษา {{src.group}} #[br] {{src.yeartime}} 
    

    p another source
    ul
      li
        a(:href='"http://www.gened.chula.ac.th/course/" + src.courseId') gened.chula.ac.th
      li  
        a(:href='"http://www.google.com/search?q=gened+" + src.courseId') google.com
          
  div(v-show='!src')
    i.fas.fa-circle-notch.fa-spin
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import _ from "lodash";
import axios from "axios";
import RegNumber from "./RegNumber.vue";
@Component({
  name: "detail-card",
  components: { RegNumber }
})
// @ts-ignore
export default class CourseCard extends Vue {
  BUILDING = require("../const.ts").BUILDING;
  DAYS = require("../const.ts").DAYS;
  // @ts-ignore
  @Prop() courseId!: string;

  src: any = null;
  mounted() {
    this.$store.dispatch("search/getCourse", this.courseId).then(res => {
      this.src = res;
      console.log("success", res);
      this.$forceUpdate();
    });
  }
}
</script>

<style lang="scss" scoped>
.content table td {
  border: none;
  padding: 0.2em 0.75em;
}
</style>
