import WeekSelect from "@/components/WeekSelect.vue";
import SidebarLogin from "@/components/SidebarLogin.vue";
import MemoiTextArea from "@/components/MemoiTextArea.vue";
import SidebarProfile from "@/components/SidebarProfile.vue";
import * as constant from "@/constant";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";

@Component({
  components: { WeekSelect, MemoiTextArea, SidebarLogin, SidebarProfile }
})
export default class Sidebar extends Vue {
  GENED = constant.GENED;
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

  @Getter("auth/isLogin") isLogin;
  @Getter("search/search") getState;
  @Mutation("search/edit") setState;

  @Watch("search", { deep: true })
  updateState() {
    this.setState(this.search);
  }
  mounted() {
    this.setState(this.search);
  }
}
