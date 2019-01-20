<template lang="pug">
.course 
  CourseCard(:courseId='courseId')
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
  get courseId() {
    return this.$route.params.courseId;
  }
}
</script>

<style lang="scss"></style>
