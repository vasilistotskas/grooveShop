<template>
  <div id="activate-account-view" class="container mt-7">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <h1 class="mb-3">Verify Email</h1>
    <template v-if="activationLoading"> loading... </template>
    <template v-else-if="activationError">
      <span class="activation-error-text"
        >An error occured, your account has been activated or link expired, resend activation link
        <span class="activation-error-action" @click="activationEmailResend">Here.</span>
      </span>
    </template>
    <template v-else-if="activationCompleted">
      <span class="activation-complete-text mb-3">Account activation successful.</span>
      <RouterLink v-if="!isAuthenticated" aria-label="Log In" title="Log In" to="/log-in">
        <span class="activation-complete-action">Click here to log in.</span>
      </RouterLink>
    </template>
    <template v-else-if="reActivationMailSent">
      <span class="re-activation-text mb-3"
        >A new activation link has been sent to your email.</span
      >
      <span class="re-activation-problem"
        >If the activation email still does not appear in the inbox or in the spam mails contact
        us.</span
      >
    </template>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { Options as Component, Vue } from 'vue-class-component'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Component({
  name: 'VerifyEmail',
  components: {
    Breadcrumbs,
  },
})
export default class VerifyEmail extends Vue {
  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: () => Array<BreadcrumbItemInterface> = router.currentRoute
      .value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb()
  }

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }

  get activationCompleted(): boolean {
    return store.getters['signup/getActivationCompleted']
  }

  get activationError(): boolean {
    return store.getters['signup/getActivationError']
  }

  get activationLoading(): boolean {
    return store.getters['signup/getActivationLoading']
  }

  get reActivationMailSent(): boolean {
    return store.getters['signup/getReActivationMailSent']
  }

  created(): void {
    this.activateAccount()
  }

  async activateAccount(): Promise<void> {
    await store.dispatch('signup/activateAccount')
  }

  async clearActivationStatus(): Promise<void> {
    await store.dispatch('signup/clearActivationStatus')
  }

  async activationEmailResend(): Promise<void> {
    const email = localStorage.getItem('registrationEmail')

    if (email) {
      await store.dispatch('signup/activationEmailResend', email)
    } else {
      await router.push('/accounts/activate/verify_mail_resend')
    }
  }

  beforeRouteLeave(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    this.clearActivationStatus()
    next()
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/Auth/VerifyEmail';
</style>
