<template lang="pug">
div(style='display: flex; justify-content: center'): .content
  template(v-if='src')
    h3
      router-link(:to="'/course/' + src.courseName.id")
        | {{src.courseName.nameSHORT}} :  {{src.courseName.id}}
    p {{src.courseName.nameTHAI}} #[br] {{src.courseName.nameENG}}
    p
     | {{src.course.nameENG}} #[br]
     | {{src.course.nameTHAI}}
    
    h5 ตารางสอบ
    p
      table.is-narrow.is-mobile
        tbody
          tr
            td: strong midterm
            td {{src.exam.midterm || "ไม่ระบุ"}}
          tr 
            td: strong final
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
              @#[b-tooltip(type='is-info' :label='BUILDING[it.อาคาร]') #[a(:href='"/building/" + it.อาคาร') {{it.อาคาร}}]]-{{it.ห้อง}} by #[a(:href='"/teacher/" + it.ผู้สอน') {{it.ผู้สอน}}]
    h5 หน่วยกิต
    p {{src.credit}}
    h5 หมายเหตุ
    p {{src.prerequisite || "-"}}
    h5 หน่วยงาน
    p {{src.faculty}}
    h5 ช่วงระยะเวลา
    p ระบบศึกษา {{src.group}} #[br] {{src.yeartime}} 
    

    h5 แหล่งข้อมูลอื่น
    ul
      li
        a(:href='"http://www.gened.chula.ac.th/course/" + src.course') gened.chula.ac.th
      li  
        a(:href='"http://www.google.com/search?q=gened+" + src.course') google.com
    br
    h3 comments/reviews
    hr
    Chat
      Chat

  div(v-show='!src')
    i.fas.fa-circle-notch.fa-spin
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import _ from "lodash";
import axios from "axios";
import RegNumber from "./RegNumber.vue";
import Chat from "./Chat.vue";

import * as constant from "../constant/index";

@Component({
  name: "detail-card",
  components: { RegNumber, Chat }
})
// @ts-ignore
export default class CourseCard extends Vue {
  BUILDING = constant.BUILDING;
  DAYS = constant.DAYS;
  // @ts-ignore
  @Prop()
  course!: string;

  src: any = null;
  mounted() {
    this.$store.dispatch("search/getCourse", this.course).then(res => {
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
.is-clearfix tr {
  margin-bottom: 0.3rem !important;
  td {
    display: flex !important;
    // text-align: left;
  }
}
</style>
