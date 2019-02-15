<template lang="pug">
  ul.menu-list
    li(v-if='user')
      router-link(to="profile")
        h1 {{user.displayname}} ({{user.คณะย่อ}} # {{user.ชั้นปี}})
    li(v-if='user')
      router-link.is-flex(to="mbti")
        label(style='margin-top: 0') MBTI test
        span(style='margin-left: 0.3rem')
          b-icon(pack="fas" icon="fire" type='is-danger')
    li
      a
        button.button.is-link(@click='logout') logout
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
  @Action("auth/logout") logout: any;
  // @ts-ignore
  @Getter("auth/user") user: any;
}
</script>
