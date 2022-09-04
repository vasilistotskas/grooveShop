<template>
  <div class="page-sign-up mt-7 mb-5">
    <div class="container">
      <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
      <template v-if="registrationLoading"> loading... </template>
      <template v-else-if="!registrationCompleted">
        <div class="card sign-up-card">
          <div class="card-body card-body-border-top"></div>
        </div>
      </template>
      <template v-else>
        <div class="registration-complete-message container mt-5">
          <div class="registration-complete-message-content">
            <span>
              Registration complete. You should receive an email shortly with instructions on how to
              activate your account.
            </span>
            <p class="mt-3">
              If you cant find email check your spam folder , if its not there click
              <span class="registration-resend-action" @click="activationEmailResend">Here</span> to
              receive new activation email.
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/routes'
import { min, email, equal } from '@/components/Form/Utils'
import FormProvider from '@/components/Form/FormProvider.vue'
import { Options as Component, Vue } from 'vue-class-component'
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey'
import FormBaseInput from '@/components/Form/FormBaseInput.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import RegisterApiData from '@/state/auth/Interface/RegisterApiData'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import VerifyEmailResendInput from '@/pages/Auth/VerifyEmailResendInput.vue'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import { getModule } from 'vuex-module-decorators'
import SignUpModule from '@/state/auth/signup/SignUpModule'

@Component({
  name: 'Register',
  components: {
    FormProvider,
    FormBaseInput,
    FormSubmitButtons,
    FormValidationErrors,
    Breadcrumbs,
    VerifyEmailResendInput,
  },
})
export default class Register extends Vue {
  signupModule = getModule(SignUpModule)
  activationEmailAtLocalStorage = false

  envelopeIcon = faEnvelope
  keyIcon = faKey

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: () => Array<BreadcrumbItemInterface> = router.currentRoute
      .value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb()
  }

  get registrationCompleted(): boolean {
    return this.signupModule.getRegistrationCompleted
  }

  get registrationError(): boolean {
    return this.signupModule.getRegistrationError
  }

  get registrationLoading(): boolean {
    return this.signupModule.getRegistrationLoading
  }

  mounted(): void {
    document.title = 'Sign Up'
  }

  updated(): void {
    const emailFromLocalStorage = this.signupModule.getRegistrationEmail
    if (emailFromLocalStorage) this.activationEmailAtLocalStorage = true
  }

  async clearRegistrationStatus(): Promise<void> {
    await this.signupModule.clearRegistrationStatus()
  }

  async activationEmailResend(): Promise<void> {
    const email = localStorage.getItem('registrationEmail')

    if (email) {
      await this.signupModule.activationEmailResend(email)
    } else {
      await router.push('/accounts/activate/verify_mail_resend')
    }
  }

  handleSubmit = async () => {}

  beforeRouteLeave(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    this.clearRegistrationStatus()
    next()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Auth/SignUp';
</style>
