// นางร้ายปลายแถว
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

import * as _ from "lodash";
import * as fp from "lodash/fp";
import Sidebar from "@/views/Sidebar/Sidebar.vue";
import ProfileChart from "@/components/ProfileChart.vue";
import ProfileMbti from "@/components/ProfileMbti.vue";
import * as constant from "@/constant/index";

// interface CourseList {
//   no: string;
//   title: string;
//   credit: number;
//   grade: string;
//   time: string;
// }

@Component({
  components: { Sidebar, ProfileChart, ProfileMbti }
})
export default class Profile extends Vue {
  @Getter("auth/user") user: any;

  courseList = [] as any[];
  focusSubject = [] as any[];
  initOptions = {
    renderer: "svg"
  };

  // @Watch("user", { deep: true })
  // userIsUpdated(v) {
  //   this.courseList = this.formatCR60();
  // }

  get formatCR60() {
    const cr60 = this.user ? this.user.cr60 : [];
    let group: any[] = [];
    const set_year = _.sortedUniq(_.map(cr60, fp.get("period.year")));
    const timeformat = ({ year, semester, semesterth }) =>
      `ปี${set_year.indexOf(year) + 1} เทอม${semester}`;
    for (const { period, detail, summary } of cr60) {
      for (const { no, title, credit, grade } of detail) {
        group.push({
          no,
          title,
          credit: Number(credit),
          grade,
          time: timeformat(period)
        });
      }
    }
    group = _.sortBy(group, ["time", "grade"]);
    return group;
  }

  // focus(grade) {
  //   this.focusSubject = this.gradecourse.filter((o: any) => o.grade == grade);
  // }
}
