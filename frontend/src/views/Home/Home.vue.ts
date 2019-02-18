import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { genedData, genedSection } from "@/views/type";
import _ from "lodash";

import WeekSelect from "@/components/WeekSelect.vue";
import CourseCard from "@/components/CourseCard.vue";
import MemoiTextArea from "@/components/MemoiTextArea.vue";
import Sidebar from "@/views/Sidebar/Sidebar.vue";
import RegNumber from "@/components/RegNumber.vue";

import * as constant from "@/constant/index";

@Component({
  components: {
    WeekSelect,
    CourseCard,
    MemoiTextArea,
    Sidebar,
    RegNumber
  }
})
export default class Home extends Vue {
  GENED = constant.GENED;
  openedDetails: string[] = [];
  loading = true;
  @Getter("search/week/get") weekselect;
  @Action("search/reloadGened") reloadGened: any;
  @Getter("search/GENEDFILTER") GENEDFILTER!: any[];

  toggleDetail(e: any) {
    if (e.course) {
      this.openedDetails = _.xor(this.openedDetails, [e.course]);
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
  getCourseName(cname) {
    const { nameSHORT, nameTHAI, nameENG } = cname;
    return nameSHORT;
  }
  getCourseKind(tags) {
    try {
      const { code, english, name, short } = tags.gened;
      return `${short} (${english})`;
    } catch (e) {
      return "none";
    }
  }
}
