<template lang="pug">
.course
  .container.is-clipped
    .band
      .mac-btn__wrapper
        router-link.mac-btn.red(to='/')
        .mac-btn.yellow
        .mac-btn.green
    .padding-40
      CourseCard(:course='course')
    //- .band
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import CourseCard from "../components/CourseCard.vue";
import _ from "lodash";

@Component({
  components: {
    CourseCard
  }
})
// @ts-ignore
export default class Home extends Vue {
  get course() {
    return this.$route.params.course;
  }
}
</script>

<style lang="scss">
.mac-btn__wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  .mac-btn {
    width: 14px;
    height: 14px;
    &.red {
      background-color: #ff605c;
    }
    &.yellow {
      background-color: #ffbd44;
    }
    &.green {
      background-color: #00ca4e;
    }
    border-radius: 100px;
    margin: 4px;
    &:first-child {
      margin-left: 13px;
    }
    &:hover {
      -webkit-filter: brightness(75%);
    }
  }
}
.band {
  height: 50px;
  background-color: #808b90;
  background-image: linear-gradient(#747f84, #808b90);
  width: 100%;
}
.course {
  background-color: aliceblue;
  @media screen and (min-width: 700px) {
    padding: 2rem;
    .container {
      border-radius: 10px;
    }
  }
  .container {
    box-shadow: 0px 0px 100px #3335;
    max-width: 600px;
    background-color: white;
  }
}
.padding-40 {
  padding: 60px 40px;
}
</style>
