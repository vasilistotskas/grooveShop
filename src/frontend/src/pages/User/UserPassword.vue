<template>
  <FormProvider
    id="userPasswordForm"
    :errors="formManager.errors"
    :form="formManager.form"
    name="userPasswordForm"
    title=""
    @submit="handleSubmit()"
  >
    <div class="grid-account-password-fields">
      <div class="current_password">
        <label :for="String(formManager.form.current_password.$uid)" class="label"
          >Current Password</label
        >
        <FormBaseInput
          :id="formManager.form.current_password.$uid"
          v-model="formManager.form.current_password.$value"
          :has-error="formManager.form.current_password.$hasError"
          :placeholder="'Current Password'"
          :validating="formManager.form.current_password.$validating"
          autocomplete="current-password"
          type="password"
        />
        <FormValidationErrors
          :errors="formManager.form.current_password.$errors"
          class="validation-errors"
        />
      </div>
      <div class="new_password">
        <label :for="String(formManager.form.new_password.$uid)" class="label">New Password</label>
        <FormBaseInput
          :id="formManager.form.new_password.$uid"
          v-model="formManager.form.new_password.$value"
          :has-error="formManager.form.new_password.$hasError"
          :placeholder="'New Password'"
          :validating="formManager.form.new_password.$validating"
          autocomplete="new-password"
          type="password"
        />
        <FormValidationErrors
          :errors="formManager.form.new_password.$errors"
          class="validation-errors"
        />
      </div>
      <div class="re_new_password">
        <label :for="String(formManager.form.re_new_password.$uid)" class="label"
          >Retype New Password</label
        >
        <FormBaseInput
          :id="formManager.form.re_new_password.$uid"
          v-model="formManager.form.re_new_password.$value"
          :has-error="formManager.form.re_new_password.$hasError"
          :placeholder="'Retype New Password'"
          :validating="formManager.form.re_new_password.$validating"
          autocomplete="new-password"
          type="password"
        />
        <FormValidationErrors
          :errors="formManager.form.re_new_password.$errors"
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
import { useValidation, ValidationError } from 'vue3-form-validation'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import ProductReviewModule from '@/state/product/review/ProductReviewModule'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'
import UpdatePasswordApiData from '@/state/auth/Interface/UpdatePasswordApiData'
import ProductFavouriteModule from '@/state/product/favourite/ProductFavouriteModule'

let { validateFields } = useValidation({})

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

  formManager = ({ validateFields } = useValidation({
    current_password: {
      $value: '',
      $rules: [min(8)('Password has to be longer than 7 characters')],
    },
    new_password: {
      $value: '',
      $rules: [
        min(8)('Password has to be longer than 7 characters'),
        {
          key: 'pw',
          rule: equal('Passwords do not match'),
        },
      ],
    },
    re_new_password: {
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

  handleSubmit = async () => {
    try {
      const formData = (await validateFields()) as UpdatePasswordApiData
      const apiData: UpdatePasswordApiData = {
        current_password: formData.current_password,
        new_password: formData.new_password,
        re_new_password: formData.re_new_password,
      }

      await this.passwordModule.updateUserPassword(apiData)
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }

  clearAllAccountSessions(): void {
    this.authModule.clearAllAccountSessions().then(() => {
      this.productFavouriteModule.unsetFavourites()
      this.productFavouriteModule.unsetUserFavourites()
      this.productReviewModule.unsetUserToProductReview()
      this.productReviewModule.unsetUserReviews()
      this.countryModule.unsetUserCountryData()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/User/UserPassword';
</style>
