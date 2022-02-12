<template>
  <div id="password-reset-confirm-view" class="container mt-8">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath"/>
    <div class="card password-reset-card">
      <div class="card-body card-body-border-top">
        <div>
          <font-awesome-icon :icon="lockIcon" size="4x"/>
        </div>
        <h1>Reset Password Confirm</h1>
        <template v-if="resetLoading">
          loading...
        </template>
        <template v-else-if="!resetCompleted">
          <FormProvider id="userPasswordForm"
                        :errors="formManager.errors"
                        :form="formManager.form"
                        name="userPasswordForm"
                        title=""
                        @submit="handleSubmit()"
          >
            <div class="grid-account-password-fields">
              <div class="new_password">
                <label :for="formManager.form.password1.$uid" class="label">New Password</label>
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
                    class="validation-errros"
                />
              </div>
              <div class="re_new_password">
                <label :for="formManager.form.password2.$uid" class="label">Retype New Password</label>
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
                    class="validation-errros"
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
          <RouterLink aria-label="Log In" title="Log In" to="/log-in">return to login page</RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { Options, Vue } from 'vue-class-component'
import { equal, min } from '@/components/Form/Utils'
import FormProvider from '@/components/Form/FormProvider.vue'
import FormBaseInput from '@/components/Form/FormBaseInput.vue'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useValidation, ValidationError } from 'vue3-form-validation'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

let {
  validateFields
} = useValidation({})

@Options({
  name: 'PasswordRestConfirm',
  components: {
    Breadcrumbs,
    FormProvider,
    FormBaseInput,
    FormSubmitButtons,
    FormValidationErrors
  }
})
export default class PasswordRestConfirm extends Vue {

  submitButtonText: string = 'Reset password'

  inputs = {
    password1: '',
    password2: '',
    uid: '',
    token: ''
  }

  lockIcon: IconDefinition = faLock

  formManager = {
    validateFields
  } = useValidation({
    password1: {
      $value: '',
      $rules: [
        min(8)('Password has to be longer than 7 characters'),
        {
          key: 'pw',
          rule: equal('Passwords do not match')
        }
      ]
    },
    password2: {
      $value: '',
      $rules: [
        min(8)('Password has to be longer than 7 characters'),
        {
          key: 'pw',
          rule: equal('Passwords do not match')
        }
      ]
    }
  })

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
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

  mounted(): void {
    document.title = 'Password Reset Confirm'
    this.inputs.uid = <string>this.$route.params.uid
    this.inputs.token = <string>this.$route.params.token
  }

  handleSubmit = async () => {
    try {
      const formData: any = await validateFields()
      const apiData = {
        password1: formData.password1,
        password2: formData.password2,
        uid: this.inputs.uid,
        token: this.inputs.token
      }

      await store.dispatch('password/resetPasswordConfirm', apiData)
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }

  async clearResetStatus(): Promise<void> {
    await store.dispatch('password/clearResetStatus')
  }

}
</script>

<style lang="scss">
@import "@/assets/styles/pages/Auth/PasswordResetConfirm"

</style>