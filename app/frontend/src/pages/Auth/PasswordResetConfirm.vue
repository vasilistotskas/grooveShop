<template>
  <div id="password-reset-confirm-view" class="container mt-8">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="card password-reset-card">
      <div class="card-body card-body-border-top">
        <div>
          <font-awesome-icon :icon="lockIcon" size="4x" />
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
                  <font-awesome-icon :icon="lockIcon" />
                </span>
                <input id="password1" v-model="inputs.password1" class="form-control" placeholder="password"
                       type="password"
                />
              </div>
              <div class="input-group-w-addon">
                <span class="input-group-addon">
                  <font-awesome-icon :icon="lockIcon" />
                </span>
                <input id="password2" v-model="inputs.password2" class="form-control" placeholder="confirm password"
                       type="password"
                />
              </div>
            </div>
          </form>
          <button class="btn btn-outline-primary-two" @click="resetPasswordConfirm(inputs)">
            reset password
          </button>
          <span v-show="resetError" class="error">
            A error occured while processing your request.
          </span>
        </template>
        <template v-else>
          <span>Your password has been reset.</span>
          <RouterLink to="/log-in">return to login page</RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import router from '@/routes';
import { Options, Vue } from 'vue-class-component';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';

@Options({
  name: 'PasswordRestConfirm',
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
  };

  mounted(): void {
    document.title = 'Password Reset Confirm';
    this.inputs.uid = <string>this.$route.params.uid;
    this.inputs.token = <string>this.$route.params.token;
  }

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb;
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params);
  }

  get lockIcon(): typeof faLock {
    return faLock;
  }

  get resetCompleted(): any {
    return store.getters['password/getResetCompleted'];
  }

  get resetError(): any {
    return store.getters['password/getResetError'];
  }

  get resetLoading(): any {
    return store.getters['password/getResetLoading'];
  }

  async resetPasswordConfirm(inputs: any): Promise<void> {
    await store.dispatch('password/resetPasswordConfirm', inputs);
  }

  async clearResetStatus(): Promise<void> {
    await store.dispatch('password/clearResetStatus');
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