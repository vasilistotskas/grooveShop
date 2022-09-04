<template>
  <button
    class="btn btn-outline-primary-two"
    title="Log Out from all devices"
    @click="clearAllAccountSessions"
  >
    Log Out from all devices
  </button>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/state/auth/auth/AuthModule'
import { equal, min } from '@/components/Form/Utils'
import CountryModule from '@/state/country/CountryModule'
import FormProvider from '@/components/Form/FormProvider.vue'
import { Options as Component, Vue } from 'vue-class-component'
import FormBaseInput from '@/components/Form/FormBaseInput.vue'
import PasswordModule from '@/state/auth/password/PasswordModule'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import ProductReviewModule from '@/state/product/review/ProductReviewModule'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'
import UpdatePasswordApiData from '@/state/auth/Interface/UpdatePasswordApiData'
import ProductFavouriteModule from '@/state/product/favourite/ProductFavouriteModule'

@Component({
  name: 'UserPassword',
  components: {
    FormProvider,
    FormBaseInput,
    FormSubmitButtons,
    FormValidationErrors,
  },
})
export default class UserPassword extends Vue {
  authModule = getModule(AuthModule)
  passwordModule = getModule(PasswordModule)
  productFavouriteModule = getModule(ProductFavouriteModule)
  productReviewModule = getModule(ProductReviewModule)
  countryModule = getModule(CountryModule)

  submitButtonText = 'Update'

  handleSubmit = async () => {}

  async clearAllAccountSessions(): Promise<void> {
    await this.authModule.clearAllAccountSessions()
    this.productFavouriteModule.unsetFavourites()
    this.productFavouriteModule.unsetUserFavourites()
    this.productReviewModule.unsetUserToProductReview()
    this.productReviewModule.unsetUserReviews()
    this.countryModule.unsetUserCountryData()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/User/UserPassword';
</style>
