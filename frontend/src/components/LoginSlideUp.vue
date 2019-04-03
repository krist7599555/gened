<template lang="pug">
  .LoginSlideUp(align='center')
    form(align='left' @submit.prevent='submit' v-if='!isLogin')
        header.modal-card-head
          p.modal-card-title Login {{isLogin}}
        section.modal-card-body
          b-field(label='username')
            b-input(type='tel', v-model='username', placeholder='Your username', required)
          b-field(label='Password')
            b-input(type='password', v-model='password', password-reveal='', placeholder='Your password', required)
        footer.modal-card-foot
          button.button(type='button', @click='$parent.close()') Close
          button.button.is-primary(:class='loading ? "is-loading" : ""') Login
    .box(v-else-if='user')
      .is-size-3 {{user.displayname}}
      figure.image.is-clipped(style='border-radius: 10px')
        img(v-if='user.line.picture' :src='user.line.picture' style='max-width: 300px')
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
// @ts-ignore
@Component()
// @ts-ignore
export default class LoginSlideUp extends Vue {
  username = "";
  password = "";
  loading = false;

  get authline() {
    return this.$route.meta.authline;
  }

  // @ts-ignore
  @Getter("auth/isLogin")
  // @ts-ignore
  isLogin: boolean;
  // @ts-ignore
  @Getter("auth/user")
  // @ts-ignore
  user: boolean;

  // @ts-ignore
  @Action("auth/login")
  // @ts-ignore
  login: (payload: any) => Promise;

  @Action("auth/lineLogin")
  lineLogin: () => Promise<void>;

  async submit() {
    try {
      this.loading = true;
      await this.login({
        username: this.username,
        password: this.password
      });
      if (this.authline) {
        await this.lineLogin();
      }

      this.loading = false;
      setTimeout(() => {
        try {
          // @ts-ignore
          this.$parent.close();
        } catch (e) {
          this.$emit("close");
        }
        this.$toast.open({
          type: "is-success",
          message: "login success"
        });
      }, 2500);
    } catch (e) {
      this.loading = true;
      this.$toast.open({
        type: "is-danger",
        message: e
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.LoginSlideUp {
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #363636;
  background-image: url(https://www.chula.ac.th/wp-content/uploads/2018/03/faculty-hero-1440x900.jpg);
  background-size: cover;
  background-attachment: fixed;
  background-blend-mode: overlay;
}
</style>
