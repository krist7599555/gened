<template lang="pug">
  .section
    .content
      h1 MBTI test ({{focusQuestion}}) {{answer}} 
    div(align='center')
      div.question-wrapper(align='left')
        progress.progress.is-info(:value='Object.keys(answer).length' :max='question.length') 15%
      template(v-for='q in question')
        div.question-wrapper(:class='focusQuestion == q.number ? "popup-dropshadow" : ""')
          label.label.is-size-6 {{q.statement}}
          div.mbti-scale(align='center')
            span.is-hidden-mobile เห็นด้วย
            template(v-for='opt in radioOpt')
              label.mbti-scale__label(:class='isSelect(q.number, opt.val) ? "is-active " + opt.cls : opt.cls')
                b-radio(v-model='answer[q.number]' :native-value='opt.val')
            span.is-hidden-mobile ไม่เห็นด้วย
          div.is-flex.is-hidden-tablet(style='justify-content: space-between; padding: 8px 2vw')
            span.label AGREE
            span.label DISAGREE

</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  async mounted() {
    console.log(this.$store.getters);
    console.log(this.$store.getters["mbti/question"]);
    let { head, question } = await this.$store.getters["mbti/question"];
    console.log("head");
    this.head = await head;
    this.question = await question;
  },
  data() {
    return {
      answer: {},
      head: {},
      question: [] as any[],
      radioOpt: [
        {
          val: -3,
          cls: "is-big is-positive"
        },
        {
          val: -2,
          cls: "is-med is-positive"
        },
        {
          val: -1,
          cls: "is-small is-positive"
        },
        {
          val: 0,
          cls: "is-small"
        },
        {
          val: 1,
          cls: "is-small is-negative"
        },
        {
          val: 2,
          cls: "is-med is-negative"
        },
        {
          val: 3,
          cls: "is-big is-negative"
        }
      ]
    };
  },
  methods: {
    isSelect(q, c) {
      return q in this.answer && this.answer[q] == c;
    }
  },
  computed: {
    focusQuestion(): number | null {
      for (let q of this.question) {
        if (!(q.number in this.answer)) {
          return q.number;
        }
      }
      return null;
    }
  }
});
</script>

<style lang="scss" scoped>
$negcolor: #94657e;
$poscolor: #4c9070;

.popup-dropshadow {
  transform: scale(1.05);
  background-color: white;
  box-shadow: 0px 5px 20px 5px #999a;
}

.question-wrapper {
  display: block;
  border-left: none;
  border-right: none;
  border: 1px solid #f5f5f5;
  margin-top: -1px;
  max-width: 600px;
  padding: 30px 30px;
  @media screen and (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
    border-left-width: 0;
    border-right-width: 0;
  }
}

.mbti-scale {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  vertical-align: middle;
  align-items: center;
  position: relative;
  .mbti-scale__label {
    width: 34px;
    height: 34px;
    &.is-small {
      width: 28px;
      height: 28px;
    }
    &.is-med {
      width: 34px;
      height: 34px;
    }
    &.is-big {
      width: 40px;
      height: 40px;
    }
    background-color: #fff;
    border: 4px solid #ececeb;
    &.is-active {
      background-color: #ececeb;
    }
    &.is-negative {
      border: 4px solid $negcolor;
      &.is-active {
        background-color: $negcolor;
      }
    }
    &.is-positive {
      border: 4px solid $poscolor;
      &.is-active {
        background-color: $poscolor;
      }
    }
    border-radius: 150px;
    padding: 0;
    cursor: pointer;
    box-shadow: none;
    transition: none;
    display: inline-block;
    vertical-align: middle;
    .b-radio {
      display: none !important;
    }
  }
}
</style>
