<template>
  <div id="password-reset-view" class="mt-9">
    <h1>Reset Password</h1>
    <template v-if="emailLoading">
      loading...
    </template>
    <template v-else-if="!emailCompleted">
      <form @submit.prevent="submit">
        <input v-model="inputs.email" type="text" id="email" placeholder="email">
      </form>
      <button @click="sendResetEmail(inputs)">
        send email
      </button>
      <span class="error" v-show="emailError">
        A error occured while processing your request.
      </span>
    </template>
    <template v-else>
      <div>
        Check your inbox for a link to reset your password. If an email doesn't appear within a few
        minutes, check your spam folder.
      </div>
      <router-link to="/log-in">
        return to login page
      </router-link>
    </template>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"

@Options({
  name: "PasswordReset",
})

export default class PasswordReset extends Vue {

  inputs = {
    email: '',
  }

  get emailCompleted(): any {
    return store.getters['password/getEmailCompleted']
  }

  get emailError(): any {
    return store.getters['password/getEmailError']
  }

  get emailLoading(): any {
    return store.getters['password/getEmailLoading']
  }

  async sendResetEmail(inputs: any): Promise<void> {
    await store.dispatch('password/sendResetEmail', inputs)
  }

  async clearEmailStatus(): Promise<void> {
    await store.dispatch('password/clearEmailStatus')
  }

}
</script>

<style lang="scss">
form input {
  display: block
}
.error {
  color: $primary-color-1;
  font-size: 12px;
}
</style>