<template>
  <div id="password-reset-confirm-view" class="container mt-8">
    <Breadcrumbs :breadCrumbPath="breadCrumbPath"></Breadcrumbs>
    <div class="card password-reset-card">
      <div class="card-body card-body-border-top">
        <div>
          <font-awesome-icon :icon="lockIcon" size="4x" :style="{ color: '#5A5A5A' }"></font-awesome-icon>
        </div>
        <h1>Reset Password Confirm</h1>
        <template v-if="resetLoading">
          loading...
        </template>
        <template v-else-if="!resetCompleted">
          <form @submit.prevent="submit">
            <div class="form-group">
              <div class="input-group-w-addon mb-1">
                <span class="input-group-addon">
                  <font-awesome-icon :icon="lockIcon" :style="{ color: '#080808' }"></font-awesome-icon>
                </span>
                <input v-model="inputs.password1" type="password" id="password1" placeholder="password" class="form-control">
              </div>
              <div class="input-group-w-addon">
                <span class="input-group-addon">
                  <font-awesome-icon :icon="lockIcon" :style="{ color: '#080808' }"></font-awesome-icon>
                </span>
                <input v-model="inputs.password2" type="password" id="password2" placeholder="confirm password" class="form-control">
              </div>
            </div>
          </form>
          <button class="btn btn-outline-primary-two" @click="resetPasswordConfirm(inputs)">
            reset password
          </button>
          <span class="error" v-show="resetError">
            A error occured while processing your request.
          </span>
        </template>
        <template v-else>
          <span>Your password has been reset.</span>
          <router-link to="/log-in">return to login page</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from "@/routes"
import { Options, Vue } from "vue-class-component"
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.vue"

@Options({
  name: "PasswordRestConfirm",
  components: {
    Breadcrumbs
  }
})
export default class PasswordRestConfirm extends Vue {

  inputs = {
    password1: '',
    password2: '',
    uid: '',
    token: ''
  }

  mounted() : void {
    document.title = 'Password Reset Confirm'
    this.inputs.uid = <string>this.$route.params.uid
    this.inputs.token = <string>this.$route.params.token
  }

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get lockIcon(): typeof faLock {
    return faLock
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

  async resetPasswordConfirm(inputs: any): Promise<void> {
    await store.dispatch('password/resetPasswordConfirm', inputs)
  }

  async clearResetStatus(): Promise<void> {
    await store.dispatch('password/clearResetStatus')
  }

}
</script>

<style lang="scss">
#password-reset-confirm-view {
  max-width: 500px;
  .card-body {
    padding: 50px;
  }
}
</style>