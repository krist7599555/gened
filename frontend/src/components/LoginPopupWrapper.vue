<template lang="pug">
  div
    b-modal(:active.sync='show')
      LoginPopup
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import LoginPopup from "./LoginPopup.vue";

@Component({
  components: { LoginPopup }
})
// @ts-ignore
export default class LoginPopupWrapper extends Vue {
  // @ts-ignore
  @Getter("auth/isLogin") isLogin: boolean;
  // @ts-ignore
  show = false;
  mounted() {
    this.$on("open", () => this.visible(true));
    this.$on("close", () => this.visible(false));
    setInterval(() => {
      console.log("intervasl");
      if (!this.show && !this.isLogin) {
        this.visible(true);
      }
    }, 1000);
  }
  visible(b: boolean) {
    this.show = b;
  }
}
</script>
