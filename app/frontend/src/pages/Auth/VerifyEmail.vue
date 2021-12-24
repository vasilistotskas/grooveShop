<template>
  <div id="activate-account-view">
    <h1>Verify Email</h1>
    <template v-if="activationLoading">loading...</template>
    <template v-else-if="activationError">An error occured.</template>
    <template v-else-if="activationCompleted">
      Account activation successful.
      <router-link v-if="!isAuthenticated" to="/log-in">
        Click here to sign in.
      </router-link>
    </template>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"
import router from "@/routes";

@Options({
  name: "VerifyEmail",
  props: {
    product: Object
  }
})

export default class VerifyEmail extends Vue {

  get isAuthenticated(): any {
    return store.getters['auth/isAuthenticated']
  }

  get activationCompleted(): any {
    return store.getters['signup/getActivationCompleted']
  }

  get activationError(): any {
    return store.getters['signup/getActivationError']
  }

  get activationLoading(): any {
    return store.getters['signup/getActivationError']
  }

  async activateAccount(): Promise<void> {
    await store.dispatch('signup/activateAccount')
  }

  async clearActivationStatus(): Promise<void> {
    await store.dispatch('signup/clearActivationStatus')
  }

  created(): void {
    this.activateAccount()
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    this.clearActivationStatus()
    next()
  }

}
</script>