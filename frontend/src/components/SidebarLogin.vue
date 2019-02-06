<template lang="pug">
  .field
    form(@submit.prevent='submit')
      b-field(ref='username')
        b-input(placeholder="รหัสนิสิต" v-model='username' required type='tel' maxlength="10" autofocus)
      b-field(v-show='showpassword')
        b-input(placeholder="รหัสผ่าน" v-model='password' required type='password' password-reveal ref='password')
      b-field(v-show='showpassword && password' ref='submit')
        .control.is-clearfix.is-flex
          button.button.is-link(:class="inprocess ? 'is-loading' : ''") login
          .label(style='margin: 0rem 0.5rem')
            small.help.is-link {{responseMessage}}
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { error } from "util";

// @ts-ignore
@Component()
// @ts-ignore
export default class SidebarLogin extends Vue {
  username = process.env.NODE_ENV != "production" ? "6031301721" : "";
  password = process.env.NODE_ENV != "production" ? "krist7599555" : "";
  inprocess = false;
  showpassword = false;
  responseMessage = "";

  // @ts-ignore
  @Action("auth/login") login: any;

  mounted() {
    this.focus("username");
    this.isValidUsername();
    this.$nextTick(() => this.isValidUsername());
  }

  showVisableMaxlength(show) {
    try {
      const field = (this.$refs.username as Vue).$el;
      const help = field.getElementsByClassName("help")[0];
      help.setAttribute("style", show ? "" : "display: none");
      return true;
    } catch (e) {
      return false;
    }
  }
  focus(rf) {
    console.log(rf);
    if (this.$refs && rf in this.$refs) {
      console.log(">>>");
      let input = null as HTMLInputElement | HTMLButtonElement | null;
      for (let tag of ["input", "button"]) {
        if (!input) {
          input = ((this.$refs[rf] as Vue).$el.getElementsByTagName(tag)[0] ||
            null) as any;
        }
      }
      if (input) input.focus();
      this.$nextTick(() => input && input.focus());
    }
  }

  @Watch("username")
  // @ts-ignore
  isValidUsername() {
    if (/^\d{10}$/.test(this.username)) {
      this.showVisableMaxlength(false);
      this.focus("password");
      this.showpassword = true;
      return true;
    } else {
      this.showVisableMaxlength(true);
      return false;
    }
  }
  submit() {
    if (!this.inprocess && this.username && this.password) {
      this.inprocess = true;
      this.focus("submit");

      this.login({
        username: this.username,
        password: this.password
      })
        .then(res => {
          this.inprocess = false;
          this.focus("username");
          this.responseMessage = "";
        })
        .catch((err: string) => {
          this.responseMessage = err;
        })
        .finally(() => (this.inprocess = false));
      console.log(this.username, this.password);
    }
  }
}
</script>
