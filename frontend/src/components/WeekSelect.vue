<template lang="pug">
div
    table#week.monospace.table.is-mobile.is-striped.is-bordered.is-hoverable
      thead
        tr
          td.clickable.top.is-size-7(style='border: none; text-align: center') #[i.fas.fa-hand-pointer.fa-spin]
          td.clickable.top.is-size-7(v-for='t in TIMES' @click='update(null, t)') {{t}}
      tbody
        tr(v-for='d in DAYS')
          td.clickable.left.button.is-fullwidth(@click='update(d, null)')
            div(style='display:flex; align-self: center; justify-content: center; vertical-alignment: middle;')
              strong.is-size-7 {{ d }} #[i.fas.fa-angle-right]
          td(
            v-for='t in TIMES'
            :class='td_class(d, t)'
            @click='update(d, t)'
          )
</template>

<script lang="ts">
// tslint:disable:no-var-requires
import { Component, Vue } from "vue-property-decorator";
import { Getter, namespace, Mutation } from "vuex-class";
import _ from "lodash";
import { contains as _includes } from "lodash/fp";
import ls from "local-storage";

// @ts-ignore
Set.prototype.toggle = function(val) {
  if (this.has(val)) this.delete(val);
  else this.add(val);
};
// @ts-ignore
Array.prototype.has = function(val) {
  return this.indexOf(val) != -1;
};
// @ts-ignore
Array.prototype.toggle = function(val) {
  const idx = this.indexOf(val);
  if (idx != -1) this.splice(idx, 1);
  else this.push(val);
};

const week = namespace("search/week");

@Component({
  name: "week-select",
  components: {}
})
// @ts-ignore
export default class WeekSelect extends Vue {
  // @ts-ignore
  @week.Getter("DAYS")
  DAYS;
  // @ts-ignore
  @week.Getter("TIMES")
  TIMES;
  // @ts-ignore
  @week.Getter("TABLE")
  TABLE;
  // @ts-ignore
  @week.Getter("get")
  get: (d: string, t: number) => any;

  // @ts-ignore
  @Mutation("search/edit")
  setState: (any) => any;
  // @ts-ignore
  @Mutation("search/week/update")
  toggleTable: (any) => any;

  mounted() {
    this.setState({ week: this.TABLE });
  }
  td_class(d: string, t: number) {
    return this.get(d, t) ? "is-active" : "";
  }
  update(d: string, t: number) {
    this.toggleTable({ d, t });
    this.setState({ week: this.TABLE });
    this.$forceUpdate();
  }
}
</script>

<style lang="scss" scoped>
table {
  height: 200px !important;
  width: 100%;
  @media screen and (max-width: 500px) {
    width: 101vw;
    position: relative;
    margin-left: -29px;
  }
}
thead > tr td {
  font-weight: bold;
  margin: 0 auto;
  padding: 6px 0px;
}
td + td {
  text-align: center;
  max-width: 12px !important;
  &.is-active {
    background-color: darkseagreen;
  }
}
.clickable {
  cursor: pointer;
  &.left {
    padding: 0.3em 0.5em;
  }
  &.top {
    padding: 0.5em 0em;
  }
}
.itemToBeSelected {
  color: red;
  background-color: blue;
}
.item {
  display: inline-flex;
  min-width: 80px;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #ddd;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 10px;
}
.item.active {
  background-color: rgb(0, 162, 255);
  color: #fff;
}
</style>
