<template lang="pug">
  ul.menu-list
    li(v-if='user')
      router-link(to="profile")
        .field.is-grouped
          .control
            b-icon(icon='crown' pack='fas' type='is-warning')
          .control  
            span.label {{user.displayname}} ({{user.faculty}} # {{user.year}})
    li(v-if='user')
      router-link(to="mbti")
        .field.is-grouped
          .control
            //- span(style='margin-left: 0.3rem')
            b-icon(pack="fas" icon="fire" type='is-danger')
          .control
            span.label.is-inline(style='margin-top: 0') MBTI test
    li
      a
        button.button.is-link(@click='logout') 
          span logout
          b-icon(icon='sign-out-alt' pack='fas')
    li
      a
        button.button.is-success(@click='lineLogin') 
          span connect with line
          b-icon(icon='line' pack='fab')
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import cookie from "cookiejs";

// @ts-ignore
@Component()
// @ts-ignore
export default class SidebarLogin extends Vue {
  // @ts-ignore
  @Action("auth/logout")
  logout: any;
  // @ts-ignore
  @Getter("auth/user")
  user: any;
  // @ts-ignore
  @Action("auth/lineLogin")
  lineLogin: any;
}
</script>
