<template lang="pug">
  form(@submit.prevent='submit')
    .modal-card(style='width: auto')
      header.modal-card-head
        p.modal-card-title Login
      section.modal-card-body
        b-field(label='username')
          b-input(type='tel', v-model='username', placeholder='Your username', required)
        b-field(label='Password')
          b-input(type='password', v-model='password', password-reveal='', placeholder='Your password', required)
      footer.modal-card-foot
        button.button(type='button', @click='$parent.close()') Close
        button.button.is-primary Login
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
// @ts-ignore
@Component()
// @ts-ignore
export default class LoginPopup extends Vue {
  username = "";
  password = "";

  // @ts-ignore
  @Action("auth/login") login: (payload: any) => Promise;

  async submit() {
    try {
      await this.login({
        username: this.username,
        password: this.password
      });
      try {
        // @ts-ignore
        this.$parent.close();
      } catch (e) {
        console.error("can not close");
      }
      this.$toast.open({
        type: "is-success",
        message: "login success"
      });
    } catch (e) {
      this.$toast.open({
        type: "is-danger",
        message: e
      });
    }
  }
}
</script>
