<template lang="pug">
#home.columns(style='overflow: hidden')
  .column.is-1(style='min-width: 340px')
    div#sidebar
      SideBar
  .column.section.hero.is-fullheight
    //- b-table(:data='[]')
    //-     template(slot-scope='props')
    //-       b-table-column(field='row3', label='ชื่อ' width='200') 1
    //-       b-table-column(field='row2', label='หมวด') 2
           
    .tile.is-ancestor
      .tile.is-vertical
        .tile.is-parent
          .tile.is-child 
            .monospace#topOfTable(style='display: flex; justify-content: center;'): .box

              b-table(
                :loading="loading"
                :data="GENEDFILTER || []"
                detailed
                paginated
                per-page="40"
                detail-key="courseId"
                icon-pack='fas'
                :striped='true'
                :opened-detailed="openedDetails"
                @details-open="(row, idx) => $toast.open(row.courseId + ' ' + row.courseName)"
                @page-change="$scrollTo('#topOfTable', 500, { offset: -90 })"
                @click='toggleDetail'
              )
      
                template(slot-scope='props')
                  b-table-column(field='row3', label='ชื่อ' width='200') {{ props.row.courseName }}
                  b-table-column(field='row2', label='หมวด') {{ GENED[props.row.cluster].en }}
           
                  b-table-column(field='row3', label='รหัส') {{ props.row.courseId }}
                  b-table-column(field='row3', label='เวลา') 

                    table.table.inner-table.is-mobile.is-narrow.is-hoverable(:mobile-cards='false'): tbody.has-text-right
                      template(v-for='($room, $idx2) in props.row.detail.schedule' style='font-family: monospace') 
                        tr(v-for='$info in $room' v-show='$info.วันเรียน != "IA"')
                          td.has-text-right(style='min-width: 36px; width: 36px') {{$room[0].ตอนเรียน}}
                          td.has-text-right.is-inversed(style='min-width: 75px; width: 75px'): RegNumber(:value='$info')
                          //- td.has-text-right(style='min-width: 75px; width: 75px') {{$info.จำนวนนิสิต}} 
                          td.has-text-right(style='min-width: 38px; width: 38px') {{$info.วันเรียน}} 
                          td.has-text-right(style='min-width: 60px; width: 60px') {{$info.เวลาเริ่ม}}
                          td.has-text-right(style='min-width: 60px; width: 60px') {{$info.เวลาจบ}}
                          td.has-text-right(style='min-width: 75px; width: 75px; font-size: 0.6rem') **{{$info.หมายเหตุ}}
   
                template(slot='detail', slot-scope='props')
                  .container(style='max-width: 600px; justify-content: center; display: flex; padding-bottom: 50px; padding-top: 30px;')
                    CourseCard(:info='props.row' :courseId='props.row.courseId')
                    
    //-     figure.image.box(style='width: 60px; margin: 0; padding: 4px 15px; margin-left: 20px; margin-bottom: -25px;')
    //-       //- img(:src="'https://www.reliablecounter.com/count.php?page=gened.ml&digit=style/plain/10/&reloads=1' + '&t=' + new Date().getTime()", alt='', border='0')
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { genedData, genedSection } from "./type";
import _ from "lodash";

import WeekSelect from "../components/WeekSelect.vue";
import CourseCard from "../components/CourseCard.vue";
import MemoiTextArea from "../components/MemoiTextArea.vue";
import SideBar from "./setting/Sidebar.vue";
import RegNumber from "../components/RegNumber.vue";
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
export default class Home extends Vue {
  GENED = require("../const.ts").GENED;
  openedDetails: string[] = [];
  loading = true;
  // @ts-ignore
  @Getter("search/week/get") weekselect;
  // @ts-ignore
  @Action("search/reloadGened") reloadGened: any;
  // @ts-ignore
  @Getter("search/GENEDFILTER") GENEDFILTER: any;

  toggleDetail(e: any) {
    if (e.courseId) {
      this.openedDetails = _.xor(this.openedDetails, [e.courseId]);
    }
  }

  async mounted() {
    await this.reloadGened();
    this.$forceUpdate();
    this.loading = false;
  }
  courseClass(info: any) {
    const avail = Number(info.ที่นั้งทั้งหมด) - Number(info.ลงทะเบียน);
    if (avail <= 0) return "has-text-danger";
    if (avail <= 5) return "has-text-warning";
    if (info.ลงทะเบียน == 0) return "has-text-success";
    return "has-text-success";
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
.monospace {
  font-family: monospace;
}

.b-table .table {
  max-width: 600px !important;
}

.table .table.inner-table {
  // max-width: 500px;
  tr:not(.detail):not(.is-empty):not(.table-footer) {
    margin-bottom: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    td {
      &::before {
        padding-right: 0;
      }
      font-size: 0.8rem;
      min-width: 40px;
      padding: 0.1em 0.75em 0.2em;
      @media screen and (max-width: 768px) {
        display: inline-block !important;
        padding-right: 0;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        text-align: left;
        border-bottom: 1px solid whitesmoke;
      }
      &.empty {
        max-width: 7px;
        min-width: 7px;
        padding-right: 11px;
      }
    }
  }
}

#sidebar {
  overflow: scroll;
  @media screen and (min-width: 769px) {
    height: 100vh;
    position: fixed;
  }
}
</style>

// <style lang="scss"></style>
