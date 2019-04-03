import { Vue, Component, Watch } from "vue-property-decorator";
import LoginPopupWrapper from "@/components/LoginPopupWrapper.vue";
import * as _ from "lodash";

@Component({
  components: { LoginPopupWrapper }
})
export default class MBTI extends Vue {
  async mounted() {
    let { head, question } = await this.$store.getters["mbti/question"];
    this.head = await head;
    this.question = await question;
    this.loading = false;
  }
  loading = true;
  lang: "th" | "en" = "th";
  answer =
    process.env.NODE_ENV == "production"
      ? {}
      : {
          2: 1,
          3: 0,
          4: 3,
          5: 0,
          6: 2,
          7: 0,
          8: 2,
          9: 2,
          10: 1,
          11: 2,
          12: 1,
          13: 2,
          14: 1,
          15: 3,
          16: 2,
          17: 1,
          18: 1,
          19: 1,
          20: 3,
          21: 3,
          22: 3,
          23: 2,
          24: 3,
          25: 1,
          26: 0,
          27: 0,
          28: 3,
          29: 2,
          30: 0,
          31: 0,
          32: 2,
          33: 1,
          34: 0,
          35: 2,
          36: 1,
          37: 2,
          38: 0,
          39: 2,
          40: 2,
          41: 0,
          42: 0,
          43: 0,
          44: 0,
          45: 1,
          46: 3,
          47: 0,
          48: 3,
          49: 2,
          50: 0,
          51: 2,
          52: 1,
          53: 2,
          54: 0,
          55: 3,
          56: 1,
          57: 3,
          58: 2,
          59: 1,
          60: 1
        };
  head = null;
  question: any[] = [];
  chunk = 0;
  radioOpt = [
    { val: -3, cls: "is-big is-positive" },
    { val: -2, cls: "is-med is-positive" },
    { val: -1, cls: "is-small is-positive" },
    { val: 0, cls: "is-small" },
    { val: 1, cls: "is-small is-negative" },
    { val: 2, cls: "is-med is-negative" },
    { val: 3, cls: "is-big is-negative" }
  ];
  async submit() {
    this.loading = true;
    this.$toast.open({
      type: "is-info",
      duration: 7000,
      message: {
        th: "ส่งคำตอบแล้ว ใช้เวลาประมวณผลไม่เกิน 20 วินาที",
        en: "form have been send. please wait around 20 sec."
      }[this.lang]
    });
    try {
      const res = await this.$store.dispatch("mbti/submit", this.answer);
      window.location = res.link[this.lang];
    } catch (e) {
      this.$toast.open({
        type: "is-danger",
        message: e,
        duration: 5000
      });
    }
    this.loading = false;
  }
  get answered() {
    return _.keys(this.answer);
  }
  go(dir: -1 | 1) {
    const newchunk = this.chunk + dir;
    if (0 <= newchunk && newchunk < this.chunkquestion.length) {
      this.chunk = newchunk;
      // @ts-ignore
      document.activeElement.blur();
      this.$scrollTo("#mbti-progress", 500, { offset: 0 });
    }
  }
  get chunkquestion() {
    return _.chunk(this.question, 10);
  }
  get currchunkquestion() {
    try {
      return this.chunkquestion[this.chunk];
    } catch (e) {
      return [];
    }
  }

  get focusQuestion() {
    for (const { num } of this.question) {
      if (!(num in this.answer)) {
        return num;
      }
    }
    return null;
  }
  get txt_agree() {
    return { th: "เห็นด้วย", en: "AGREE" }[this.lang];
  }
  get txt_disagree() {
    return { th: "ไม่เห็นด้วย", en: "DISAGREE" }[this.lang];
  }
}
