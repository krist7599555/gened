<template lang="pug">
.section.hero.is-fullheight.is-info
  .hero-body
    .container
      h1.title 
        | Redirect to 
        i.fas.fa-circle-notch.fa-spin
      p.subtitle {{name}}
      br
      a(:href='url')
        button.button.is-large.is-rounded
          label Click Here to go
          b-icon(icon='angle-right')
      br
      br
      a(href='http://www.prm.chula.ac.th/building.html' style='opacity: 0.7; text-decoration: underline') link ฐานข้อมูลเพิ่มเติมจากสำนักบริหารระบบกายภาพ
      br
      br
  //- iframe(:src='url' target="_parent")
  //- a(:href='url')
  //-   div {{name}}
</template>

<script lang="ts">
import Vue from "vue";
import * as qs from "querystring";
// @ts-ignore
import { BUILDING } from "@/constant/index";

export default Vue.extend({
  mounted() {
    setTimeout(() => {
      window.open(this.url, "_blank");
    }, 1300);
  },
  computed: {
    code() {
      // @ts-ignore
      return this.$route.params.code;
    },
    name() {
      // @ts-ignore
      return BUILDING[this.code];
    },
    url() {
      console.log(this.name);
      const encode = qs.stringify({ q: this.name });
      console.log(encode);
      return `https://www.google.com/maps?${encode}`;
    }
  }
});
</script>

<style lang="scss" scoped>
.section.hero.is-info {
  background-blend-mode: overlay;
  background-size: cover;
  background-attachment: fixed;
  background-image: url(https://www.chula.ac.th/wp-content/uploads/2018/03/faculty-hero-1440x900.jpg);
  background-color: #0d1215;
}
</style>
