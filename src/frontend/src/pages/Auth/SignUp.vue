<template>
  <div class="page-sign-up mt-7 mb-5">
    <div class="container">
      <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
      <template v-if="registrationLoading"> loading... </template>
      <template v-else-if="!registrationCompleted">
        <div class="card sign-up-card">
          <div class="card-body card-body-border-top">
            <FormProvider
              :errors="formManager.errors"
              :form="formManager.form"
              title="Register"
              @submit="handleSubmit()"
            >
              <div class="container">
                <div class="email mb-3">
                  <label :for="formManager.form.email.$uid" class="label mb-2">Email</label>
                  <FormBaseInput
                    :id="formManager.form.email.$uid"
                    v-model="formManager.form.email.$value"
                    :has-error="formManager.form.email.$hasError"
                    :input-with-add-on="true"
                    :input-with-add-on-icon="envelopeIcon"
                    :validating="formManager.form.email.$validating"
                    placeholder="Alice, Bob, Oscar"
                    autocomplete="username"
                    @blur="formManager.form.email.onBlur"
                  />
                  <FormValidationErrors
                    :errors="formManager.form.email.$errors"
                    class="validation-errors"
                  />
                </div>
                <div class="password mb-3">
                  <label :for="formManager.form.password.$uid" class="label mb-2">Password</label>
                  <FormBaseInput
                    :id="formManager.form.password.$uid"
                    v-model="formManager.form.password.$value"
                    :has-error="formManager.form.password.$hasError"
                    :input-with-add-on="true"
                    :input-with-add-on-icon="keyIcon"
                    type="password"
                    autocomplete="new-password"
                    @blur="formManager.form.password.onBlur"
                  />
                  <FormValidationErrors :errors="formManager.form.password.$errors" />
                </div>

                <div class="confirm-password mb-4">
                  <label :for="formManager.form.confirmPassword.$uid" class="label mb-2">
                    Confirm Password
                  </label>
                  <FormBaseInput
                    :id="formManager.form.confirmPassword.$uid"
                    v-model="formManager.form.confirmPassword.$value"
                    :has-error="formManager.form.confirmPassword.$hasError"
                    :input-with-add-on="true"
                    :input-with-add-on-icon="keyIcon"
                    type="password"
                    autocomplete="new-password"
                    @blur="formManager.form.confirmPassword.onBlur"
                  />
                  <FormValidationErrors :errors="formManager.form.confirmPassword.$errors" />
                </div>
                <span v-show="registrationError" class="error">
                  An error occured while processing your request.
                </span>
                <FormSubmitButtons
                  :submitting="formManager.submitting"
                  class="buttons"
                  gap="2rem"
                  @reset="formManager.resetFields()"
                />
              </div>
              <p class="register-login-field mt-4 mb-4">
                Or
                <RouterLink aria-label="Log In" title="Log In" to="/log-in">
                  click here
                </RouterLink>
                to log in!
              </p>
            </FormProvider>
          </div>
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
import store from '@/store'
import router from '@/routes'
import { min, email, equal } from '@/components/Form/Utils'
import FormProvider from '@/components/Form/FormProvider.vue'
import { Options as Component, Vue } from 'vue-class-component'
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey'
import FormBaseInput from '@/components/Form/FormBaseInput.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import RegisterApiData from '@/state/auth/Interface/RegisterApiData'
import { useValidation, ValidationError } from 'vue3-form-validation'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import VerifyEmailResendInput from '@/pages/Auth/VerifyEmailResendInput.vue'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

let { validateFields } = useValidation({})

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
  activationEmailAtLocalStorage = false

  formManager = ({ validateFields } = useValidation({
    email: {
      $value: '',
      $rules: [email('Please enter a valid email address')],
    },
    password: {
      $value: '',
      $rules: [
        min(8)('Password has to be longer than 7 characters'),
        {
          key: 'pw',
          rule: equal('Passwords do not match'),
        },
      ],
    },
    confirmPassword: {
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

  envelopeIcon = faEnvelope
  keyIcon = faKey

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: () => Array<BreadcrumbItemInterface> = router.currentRoute
      .value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb()
  }

  get registrationCompleted(): boolean {
    return store.getters['signup/getRegistrationCompleted']
  }

  get registrationError(): boolean {
    return store.getters['signup/getRegistrationError']
  }

  get registrationLoading(): boolean {
    return store.getters['signup/getRegistrationLoading']
  }

  mounted(): void {
    document.title = 'Sign Up'
  }

  updated(): void {
    const emailFromLocalStorage = store.getters['signup/getRegistrationEmail']
    if (emailFromLocalStorage) this.activationEmailAtLocalStorage = true
  }

  async clearRegistrationStatus(): Promise<void> {
    await store.dispatch('signup/clearRegistrationStatus')
  }

  async activationEmailResend(): Promise<void> {
    const email = localStorage.getItem('registrationEmail')

    if (email) {
      await store.dispatch('signup/activationEmailResend', email)
    } else {
      await router.push('/accounts/activate/verify_mail_resend')
    }
  }

  handleSubmit = async () => {
    try {
      const formData: RegisterApiData = await validateFields()
      const apiData: RegisterApiData = {
        first_name: 'who',
        last_name: 'me',
        email: formData.email,
        password: formData.password,
        re_password: formData.confirmPassword,
      }
      await store.commit('signup/setRegistrationEmail', apiData.email)
      await store.dispatch('signup/createAccount', apiData)
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }

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
