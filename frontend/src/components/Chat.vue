<template lang="pug">
article.media
  figure.media-left(style='margin-left: 0; margin-right: 1em')
    p.image.is-32x32
      img(src='https://bulma.io/images/placeholders/128x128.png')
  .media-content
    .content
      p
        strong John Smith
        small @johnsmith
        small 31m
        br
        | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
    nav.level.is-mobile
      .level-left
        a.level-item
          span.icon.is-small
            i.fas.fa-reply
        a.level-item
          span.icon.is-small
            i.fas.fa-retweet
        a.level-item
          span.icon.is-small
            i.fas.fa-heart
    slot
  //- .media-right
    //- button.delete
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
// @ts-ignore
export default class CourseCard extends Vue {}
</script>

<style lang="scss" scoped></style>
