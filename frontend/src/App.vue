<template lang="pug">
  #app(style='min-height: 100vh; min-width: 100vw')
    div(style='position: fixed; z-index: 10000')
      transition(name='slide-fade')
        LoginSlideUp#dynamicComponent(v-if='active' @close='active = false') 
    router-view

</template>
<script>
import Vue from "vue";
import LoginSlideUp from "./components/LoginSlideUp.vue";
import { setTimeout } from "timers";

export default {
  components: { LoginSlideUp },
  mounted() {
    const meta = this.$route.meta;
    if (meta.auth && !this.isLogin) {
      this.active = true;
    }
  },
  data() {
    return {
      dynamicComponent: "",
      active: false
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    isUpdated() {
      return this.$store.getters["cache/isUpdated"];
    }
  },
  watch: {
    isUpdated(nw) {
      if (nw) {
        this.$snackbar.open({
          message: "new version is available",
          type: "is-warning",
          position: "is-bottom",
          actionText: "Reload",
          indefinite: true,
          onAction: () => {
            this.$store.dispatch("cache/reload");
            this.$toast.open({
              type: "is-info",
              message: "reloading..."
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.5s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.5s ease-out;
  // transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(120vh);
  opacity: 1;
}
#dynamicComponent {
  // position: fixed;
  width: 100vw;
  min-height: 102vh;
  z-index: 10000;
  // transition-property: transform;
  // transition-duration: 5s;
  // transition-delay: 5s;
  // transform: translateY(100vh);
}
// #dynamicComponent.is-active {
//   transition-delay: 5s;
//   transform: translateY(0);
// }
</style>
