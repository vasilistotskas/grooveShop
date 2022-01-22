<template>
  <div id="password-reset-view" class="container mt-8">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="card password-reset-card">
      <div class="card-body card-body-border-top">
        <div>
          <font-awesome-icon :icon="lockIcon" :style="{ color: '#0d1117' }" size="4x" />
        </div>
        <h1>Forgot Password?</h1>
        <p>You can reset your password here.</p>
        <template v-if="emailLoading">
          loading...
        </template>
        <template v-else-if="!emailCompleted">
          <form @submit.prevent="submit">
            <div class="form-group">
              <div class="input-group-w-addon">
                <span class="input-group-addon">
                  <font-awesome-icon :icon="envelopeIcon" :style="{ color: '#dbdfe3' }" />
                </span>
                <input id="email" v-model="inputs.email" class="form-control" name="email" placeholder="email"
                       type="email"
                />
              </div>
            </div>
          </form>
          <button class="btn btn-outline-primary-two" @click="sendResetEmail(inputs)">
            send email
          </button>
          <span v-show="emailError" class="error">
            A error occured while processing your request.
          </span>
        </template>
        <template v-else>
          <div class="password-reset-message">
            <span>Check your inbox for a link to reset your password. If an email doesn't appear within a few
              minutes, check your spam folder.</span>
          </div>
          <RouterLink to="/log-in">
            return to login page
          </RouterLink>
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
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

@Options({
  name: 'PasswordReset',
  components: {
    Breadcrumbs
  }
})

export default class PasswordReset extends Vue {

  inputs = {
    email: ''
  };

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb;
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params);
  }

  get lockIcon(): typeof faLock {
    return faLock;
  }

  get envelopeIcon(): typeof faEnvelope {
    return faEnvelope;
  }

  get emailCompleted(): any {
    return store.getters['password/getEmailCompleted'];
  }

  get emailError(): any {
    return store.getters['password/getEmailError'];
  }

  get emailLoading(): any {
    return store.getters['password/getEmailLoading'];
  }

  mounted(): void {
    document.title = 'Password Reset';
  }

  async unmounted(): Promise<void> {
    await store.dispatch('password/clearEmailStatus');
  }

  async sendResetEmail(inputs: any): Promise<void> {
    await store.dispatch('password/sendPasswordResetEmail', inputs);
  }

  async clearEmailStatus(): Promise<void> {
    await store.dispatch('password/clearEmailStatus');
  }

}
</script>

<style lang="scss">
form input {
  display: block
}
.error {
  color: $color-palette-main-primary;
  font-size: 12px;
}
#password-reset-view {
  max-width: 500px;
  .card-body {
    padding: 50px;
  }
}
.password-reset-message {
  span {
    color: $color-palette-main-fifth;
  }
}
</style>