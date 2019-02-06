<template lang="pug">
.course 
  CourseCard(:course='course')
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

<style lang="scss"></style>
