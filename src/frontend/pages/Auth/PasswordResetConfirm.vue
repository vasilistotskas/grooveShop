<template>
  <div id="password-reset-confirm-view" class="container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="card password-reset-card">
      <div class="card-body card-body-border-top">
        <div>
          <font-awesome-icon :icon="lockIcon" size="4x" />
        </div>
        <h1>Reset Password Confirm</h1>
        <template v-if="resetLoading"> loading... </template>
        <template v-else-if="!resetCompleted">
          <span v-show="resetError" class="error">
            A error occured while processing your request.
          </span>
        </template>
        <template v-else>
          <span>Your password has been reset.</span>
          <RouterLink aria-label="Log In" title="Log In" to="/log-in">
            return to login page
          </RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/routes'
import { getModule } from 'vuex-module-decorators'
import { equal, min } from '@/components/Form/Utils'
import FormProvider from '@/components/Form/FormProvider.vue'
import { Options as Component, Vue } from 'vue-class-component'
import FormBaseInput from '@/components/Form/FormBaseInput.vue'
import PasswordModule from '@/state/auth/password/PasswordModule'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'
import ResetPasswordApiData from '@/state/auth/Interface/ResetPasswordApiData'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Component({
  name: 'PasswordRestConfirm',
  components: {
    Breadcrumbs,
    FormProvider,
    FormBaseInput,
    FormSubmitButtons,
    FormValidationErrors,
  },
})
export default class PasswordRestConfirm extends Vue {
  passwordModule = getModule(PasswordModule)
  submitButtonText = 'Reset password'

  inputs = {
    password1: '',
    password2: '',
    uid: '',
    token: '',
  } as ResetPasswordApiData

  lockIcon = faLock

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: () => Array<BreadcrumbItemInterface> = router.currentRoute
      .value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb()
  }

  get resetCompleted(): boolean {
    return this.passwordModule.getResetCompleted
  }

  get resetError(): boolean {
    return this.passwordModule.getResetError
  }

  get resetLoading(): boolean {
    return this.passwordModule.getResetLoading
  }

  mounted(): void {
    document.title = 'Password Reset Confirm'
    this.inputs.uid = this.$route.params.uid as string
    this.inputs.token = this.$route.params.token as string
  }

  handleSubmit = async () => {}

  async clearResetStatus(): Promise<void> {
    await this.passwordModule.clearResetStatus()
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/Auth/PasswordResetConfirm';
</style>
