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
          <FormProvider
            id="userPasswordForm"
            :errors="formManager.errors"
            :form="formManager.form"
            name="userPasswordForm"
            title=""
            @submit="handleSubmit()"
          >
            <div class="grid-account-password-fields">
              <div class="new_password">
                <label :for="String(formManager.form.password1.$uid)" class="label"
                  >New Password</label
                >
                <FormBaseInput
                  :id="formManager.form.password1.$uid"
                  v-model="formManager.form.password1.$value"
                  :has-error="formManager.form.password1.$hasError"
                  :placeholder="'New Password'"
                  :validating="formManager.form.password1.$validating"
                  :input-with-add-on="true"
                  :input-with-add-on-icon="lockIcon"
                  type="password"
                />
                <FormValidationErrors
                  :errors="formManager.form.password1.$errors"
                  class="validation-errors"
                />
              </div>
              <div class="re_new_password">
                <label :for="String(formManager.form.password2.$uid)" class="label"
                  >Retype New Password</label
                >
                <FormBaseInput
                  :id="formManager.form.password2.$uid"
                  v-model="formManager.form.password2.$value"
                  :has-error="formManager.form.password2.$hasError"
                  :placeholder="'Retype New Password'"
                  :validating="formManager.form.password2.$validating"
                  :input-with-add-on="true"
                  :input-with-add-on-icon="lockIcon"
                  type="password"
                />
                <FormValidationErrors
                  :errors="formManager.form.password2.$errors"
                  class="validation-errors"
                />
              </div>
              <div class="button">
                <FormSubmitButtons
                  :submit-text="submitButtonText"
                  :submitting="formManager.submitting"
                  class="buttons float-end"
                  gap="2rem"
                  @reset="formManager.resetFields()"
                />
              </div>
            </div>
          </FormProvider>

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
import router from '@/Routes'
import { getModule } from 'vuex-module-decorators'
import { equal, min } from '@/Components/Form/Utils'
import FormProvider from '@/Components/Form/FormProvider.vue'
import { Options as Component, Vue } from 'vue-class-component'
import FormBaseInput from '@/Components/Form/FormBaseInput.vue'
import PasswordModule from '@/State/Auth/Password/PasswordModule'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { useValidation, ValidationError } from 'vue3-form-validation'
import FormSubmitButtons from '@/Components/Form/FormSubmitButtons.vue'
import FormValidationErrors from '@/Components/Form/FormValidationErrors.vue'
import ResetPasswordInputApi from '@/State/Auth/Interface/ResetPasswordInputApi'

let { validateFields } = useValidation({} as ResetPasswordInputApi)

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
  submitButtonText = 'Reset Password'

  inputs = {
    password1: '',
    password2: '',
    uid: '',
    token: '',
  } as ResetPasswordInputApi

  lockIcon = faLock

  formManager = ({ validateFields } = useValidation({
    password1: {
      $value: '',
      $rules: [
        min(8)('Password has to be longer than 7 characters'),
        {
          key: 'pw',
          rule: equal('Passwords do not match'),
        },
      ],
    },
    password2: {
      $value: '',
      $rules: [
        min(8)('Password has to be longer than 7 characters'),
        {
          key: 'pw',
          rule: equal('Passwords do not match'),
        },
      ],
    },
  }))

  get breadCrumbPath() {
    return router.currentRoute.value.meta.breadcrumb
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

  handleSubmit = async () => {
    try {
      const formData = await validateFields()
      const apiData: ResetPasswordInputApi = {
        password1: formData.password1,
        password2: formData.password2,
        uid: this.inputs.uid,
        token: this.inputs.token,
      }

      await this.passwordModule.resetPasswordConfirm(apiData)
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }

  clearResetStatus(): void {
    this.passwordModule.clearResetStatus()
  }
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Pages/Auth/PasswordResetConfirm';
</style>
