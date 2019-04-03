<template lang="pug">
div#navbar
  div.page(:class='pageClass')
    slot
  div#abs-navbar
    .burger(@click='clickBurger')
      .line
      .line
      .line
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
// @ts-ignore
export default class Navbar extends Vue {
  active = false;
  clickBurger() {
    this.active = !this.active;
    this.$toast.open({
      type: "is-warning",
      message: "in developing"
    });
  }
  get pageClass() {
    return {} && { "is-active": this.active };
  }
}
</script>

<style lang="scss" scoped>
#navbar {
  background-color: burlywood;
}
.page {
  background-color: white;
  transition-duration: 1s;
  transform-origin: 0% 0%;
  &.is-active {
    // transform: rotate(-30deg);
    // transform: rotateY(30deg);
  }
}
#abs-navbar {
  position: fixed;
  top: 35px;
  left: 5px;
  .burger {
    padding: 5px 5px;
    background-color: orange;
    border-radius: 0px 8px 8px 0px;
    margin-left: -10px;
    padding-left: 14px;
    .line {
      color: white;
      // box-shadow: 1px 1px 1px 1px #444e;
      margin: 4px;
      padding: 1.5px 10px;
      background-color: white;
      z-index: 100000;
    }
  }
}
</style>
