<template>
  <div class="page-log-in mt-7 mb-5">
    <div class="container">
      <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
      <div class="card login-card">
        <div class="card-body card-body-border-top">
          <FormProvider
            :errors="formManager.errors"
            :form="formManager.form"
            title="Log In"
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
              <div class="password mb-4">
                <label :for="formManager.form.password.$uid" class="label mb-2">Password</label>
                <FormBaseInput
                  :id="formManager.form.password.$uid"
                  v-model="formManager.form.password.$value"
                  :has-error="formManager.form.password.$hasError"
                  :input-with-add-on="true"
                  :input-with-add-on-icon="keyIcon"
                  type="password"
                  autocomplete="current-password"
                  @blur="formManager.form.password.onBlur"
                />
                <FormValidationErrors :errors="formManager.form.password.$errors" />
              </div>
              <FormSubmitButtons
                :submitting="formManager.submitting"
                class="buttons mt-3 mb-3"
                gap="2rem"
                @reset="formManager.resetFields()"
              />
            </div>

            <!-- 2 column grid layout for inline styling -->
            <div class="login-grid-part-one mb-3">
              <div class="grid-item-one">
                <!-- Checkbox -->
                <div class="form-check">
                  <input
                    id="form2Example3"
                    checked
                    class="form-check-input form-check-input-main"
                    type="checkbox"
                    value=""
                  />
                  <label class="form-check-label" for="form2Example3"> Remember me </label>
                </div>
              </div>
              <div class="grid-item-two">
                <!-- Simple link -->
                <RouterLink title="Password Reset" to="/password_reset">
                  Forgot password?
                </RouterLink>
              </div>
            </div>
          </FormProvider>

          <!-- Register buttons -->
          <div class="login-register-field">
            <p class="mb-1">
              Not a member?
              <RouterLink aria-label="Sign Up" title="Sign Up" to="/sign-up"> Register </RouterLink>
            </p>
            <p class="mb-3">or sign up with:</p>
          </div>

          <div class="login-grid-part-socials mb-3">
            <!-- Facebook -->
            <a
              class="btn btn-outline-primary btn-floating mx-1"
              href="#!"
              role="button"
              title="Sign Up with Facebook"
            >
              <font-awesome-icon :icon="facebookIcon" :style="{ color: '#4267B2' }" size="lg" />
            </a>

            <!-- Google -->
            <a
              class="btn btn-outline-primary btn-floating mx-1"
              href="#!"
              role="button"
              title="Sign Up with Google"
            >
              <font-awesome-icon :icon="googleIcon" :style="{ color: '#DB4437' }" size="lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/routes'
import session from '@/api/session'
import { getModule } from 'vuex-module-decorators'
import { required } from '@/components/Form/Utils'
import UserModule from '@/state/user/data/UserModule'
import AuthModule from '@/state/auth/auth/AuthModule'
import CountryModule from '@/state/country/CountryModule'
import FormProvider from '@/components/Form/FormProvider.vue'
import LogInApiData from '@/state/auth/Interface/LogInApiData'
import FormBaseInput from '@/components/Form/FormBaseInput.vue'
import { Options as Component, Vue } from 'vue-class-component'
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import { useValidation, ValidationError } from 'vue3-form-validation'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import ProductFavouriteModule from '@/state/product/favourite/ProductFavouriteModule'

let { validateFields } = useValidation({})

@Component({
  name: 'LogIn',
  components: {
    FormProvider,
    FormBaseInput,
    FormSubmitButtons,
    FormValidationErrors,
    Breadcrumbs,
  },
})
export default class LogIn extends Vue {
  userModule = getModule(UserModule)
  authModule = getModule(AuthModule)
  productFavouriteModule = getModule(ProductFavouriteModule)
  countryModule = getModule(CountryModule)

  formManager = ({ validateFields } = useValidation({
    email: {
      $value: '',
      $rules: [required('Email is required')],
    },
    password: {
      $value: '',
      $rules: [required('Password is required')],
    },
  }))

  keyIcon = faKey
  googleIcon = faGoogle
  envelopeIcon = faEnvelope
  facebookIcon = faFacebook

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: () => Array<BreadcrumbItemInterface> = router.currentRoute
      .value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb()
  }

  mounted(): void {
    document.title = 'Log In'
  }

  handleSubmit = async () => {
    session.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('token')

    try {
      const formData: LogInApiData = await validateFields()
      const apiData: LogInApiData = {
        email: formData.email,
        password: formData.password,
      }
      await this.authModule
        .login(apiData)
        .then(() => {
          this.userModule.fetchUserDataFromRemote().then((response) => {
            if (response) {
              this.countryModule.findRegionsBasedOnAlphaForLoggedCustomer(
                this.userModule.getUserData
              )
              this.productFavouriteModule.fetchUserFavouritesFromRemote(response.data[0].user)
            }
          })
        })
        .catch((error: Error) => {
          console.log(error)
        })
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Auth/LogIn';
</style>
