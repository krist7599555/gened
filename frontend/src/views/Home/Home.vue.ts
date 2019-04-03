import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import _ from "lodash";

import WeekSelect from "@/components/WeekSelect.vue";
import CourseCard from "@/components/CourseCard.vue";
import MemoiTextArea from "@/components/MemoiTextArea.vue";
import Sidebar from "@/views/Sidebar/Sidebar.vue";
import RegNumber from "@/components/RegNumber.vue";

import Navbar from "@/components/Navbar.vue";

import * as constant from "@/constant/index";

@Component({
  components: {
    WeekSelect,
    CourseCard,
    MemoiTextArea,
    Sidebar,
    RegNumber,
    Navbar
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
  getCourseName(o) {
    const { nameSHORT, nameTHAI, nameENG } = o;
    return o.courseName.nameEN;
  }
  getCourseKind(o) {
    try {
      const { id, nameEN, nameSHORT } = o.gened;
      return `${nameSHORT} (${nameEN})`;
    } catch (e) {
      return "none";
    }
  }
}
