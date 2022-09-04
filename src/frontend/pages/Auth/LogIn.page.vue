<template>
  <div class="page-log-in mt-7 mb-5">
    <div class="container">
      <div class="card login-card">
        <div class="card-body card-body-border-top">
          <!-- Register buttons -->
          <div class="login-register-field">
            <p class="mb-1">Not a member?</p>
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
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import ProductFavouriteModule from '@/state/product/favourite/ProductFavouriteModule'

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

  keyIcon = faKey
  googleIcon = faGoogle
  envelopeIcon = faEnvelope
  facebookIcon = faFacebook

  mounted(): void {
    document.title = 'Log In'
  }

  handleSubmit = async () => {
    session.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('token')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Auth/LogIn';
</style>
