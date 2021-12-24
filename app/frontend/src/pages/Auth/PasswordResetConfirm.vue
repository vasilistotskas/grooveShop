<template>
  <div id="password-reset-confirm-view">
    <h1>Reset Password Confirm</h1>
    <template v-if="resetLoading">
      loading...
    </template>
    <template v-else-if="!resetCompleted">
      <form @submit.prevent="submit">
        <input v-model="inputs.password1" type="password" id="password1" placeholder="password">
        <input v-model="inputs.password2" type="password" id="password2"
               placeholder="confirm password">
      </form>
      <button @click="resetPassword(inputs)">
        reset password
      </button>
      <span class="error" v-show="resetError">
        A error occured while processing your request.
      </span>
    </template>
    <template v-else>
      Your password has been reset.
      <router-link to="/log-in">return to login page</router-link>
    </template>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"

@Options({
  name: "PasswordRestConfirm",
})
export default class PasswordRestConfirm extends Vue {

  inputs = {
    password1: '',
    password2: '',
    uid: this.$route.params.uid,
    token: this.$route.params.token
  }

  get resetCompleted(): any {
    return store.getters['password/getResetCompleted']
  }

  get resetError(): any {
    return store.getters['password/getResetError']
  }

  get resetLoading(): any {
    return store.getters['password/getResetLoading']
  }

  async resetPassword(inputs: any): Promise<void> {
    await store.dispatch('password/resetPassword', inputs)
  }

  async clearResetStatus(): Promise<void> {
    await store.dispatch('password/clearResetStatus')
  }

}
</script>