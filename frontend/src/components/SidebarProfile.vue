<template lang="pug">
  ul.menu-list
    li(v-if='user')
      a
        h1 {{user.displayname}} ({{user.คณะย่อ}} # {{user.ชั้นปี}})
    li
      a
        button.button.is-link(@click='logout') logout
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import cookie from "cookiejs";
import { setInterval } from "timers";

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
