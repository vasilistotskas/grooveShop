<template>
  <div class="page-checkout container mt-7 mb-5 ">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="checkout-grid-container content-min-height">
      <div class="checkout-grid-order-user-details">
        <div class="checkout-grid-content">
          <h2 class="subtitle">
            Shipping details
          </h2>
          <p class="has-text-grey mb-4">
            * All fields are required
          </p>
          <FormProvider
            id="userDetailsForm"
            :errors="formManager.errors"
            :form="formManager.form"
            :form-class="'form-class checkout-grid-form'"
            name="userDetailsForm"
            title=""
            @submit="handleSubmit()"
          >
            <div class="checkout-grid-form-part-left">
              <div class="first_name col-12 mb-3">
                <label
                  :for="formManager.form.first_name.$uid"
                  class="label"
                >First Name</label>
                <FormBaseInput
                  :id="formManager.form.first_name.$uid"
                  v-model="formManager.form.first_name.$value"
                  :has-error="formManager.form.first_name.$hasError"
                  :placeholder="customerDetails.first_name"
                  :validating="formManager.form.first_name.$validating"
                />
                <FormValidationErrors
                  :errors="formManager.form.first_name.$errors"
                  class="validation-errros"
                />
              </div>

              <div class="last_name col-12 mb-3">
                <label
                  :for="formManager.form.last_name.$uid"
                  class="label"
                >Last Name</label>
                <FormBaseInput
                  :id="formManager.form.last_name.$uid"
                  v-model="formManager.form.last_name.$value"
                  :has-error="formManager.form.last_name.$hasError"
                  :placeholder="customerDetails.last_name"
                  :validating="formManager.form.last_name.$validating"
                />
                <FormValidationErrors
                  :errors="formManager.form.last_name.$errors"
                  class="validation-errros"
                />
              </div>

              <div class="last_name col-12 mb-3">
                <label
                  :for="formManager.form.email.$uid"
                  class="label"
                >Email</label>
                <FormBaseInput
                  :id="formManager.form.email.$uid"
                  v-model="formManager.form.email.$value"
                  :has-error="formManager.form.email.$hasError"
                  :placeholder="customerDetails.email"
                  :validating="formManager.form.email.$validating"
                />
                <FormValidationErrors
                  :errors="formManager.form.email.$errors"
                  class="validation-errros"
                />
              </div>

              <div class="last_name col-12 mb-3">
                <label
                  :for="formManager.form.phone.$uid"
                  class="label"
                >Phone</label>
                <FormBaseInput
                  :id="formManager.form.phone.$uid"
                  v-model="formManager.form.phone.$value"
                  :has-error="formManager.form.phone.$hasError"
                  :placeholder="customerDetails.phone"
                  :validating="formManager.form.phone.$validating"
                />
                <FormValidationErrors
                  :errors="formManager.form.phone.$errors"
                  class="validation-errros"
                />
              </div>
            </div>

            <div class="checkout-grid-form-part-right">
              <div class="last_name col-12 mb-3">
                <label
                  :for="formManager.form.address.$uid"
                  class="label"
                >Address</label>
                <FormBaseInput
                  :id="formManager.form.address.$uid"
                  v-model="formManager.form.address.$value"
                  :has-error="formManager.form.address.$hasError"
                  :placeholder="customerDetails.address"
                  :validating="formManager.form.address.$validating"
                />
                <FormValidationErrors
                  :errors="formManager.form.address.$errors"
                  class="validation-errros"
                />
              </div>

              <div class="last_name col-12 mb-3">
                <label
                  :for="formManager.form.zipcode.$uid"
                  class="label"
                >Zipcode</label>
                <FormBaseInput
                  :id="formManager.form.zipcode.$uid"
                  v-model="formManager.form.zipcode.$value"
                  :has-error="formManager.form.zipcode.$hasError"
                  :placeholder="customerDetails.zipcode"
                  :validating="formManager.form.zipcode.$validating"
                />
                <FormValidationErrors
                  :errors="formManager.form.zipcode.$errors"
                  class="validation-errros"
                />
              </div>

              <div class="last_name col-12 mb-3">
                <label
                  :for="formManager.form.place.$uid"
                  class="label"
                >Place</label>
                <FormBaseInput
                  :id="formManager.form.place.$uid"
                  v-model="formManager.form.place.$value"
                  :has-error="formManager.form.place.$hasError"
                  :placeholder="customerDetails.place"
                  :validating="formManager.form.place.$validating"
                />
                <FormValidationErrors
                  :errors="formManager.form.place.$errors"
                  class="validation-errros"
                />
              </div>

              <div class="checkout-grid-country-region">
                <div class="form-outline">
                  <label
                    class="form-label"
                    for="inputCountry"
                  >Country</label>
                  <select
                    id="inputCountry"
                    v-model="customerDetails.country"
                    class="form-select"
                    name="country"
                    @change="restRegions"
                  >
                    <option
                      disabled
                      value="choose"
                    >
                      Choose...
                    </option>
                    <option
                      v-for="country in availableCountries"
                      :key="country.alpha_2"
                      :value="country.alpha_2"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </div>

                <div class="form-outline">
                  <label
                    class="form-label"
                    for="inputRegion"
                  >Region</label>
                  <select
                    id="inputRegion"
                    ref="regionElement"
                    v-model="customerDetails.region"
                    class="form-select"
                    name="region"
                  >
                    <option
                      disabled
                      value="choose"
                    >
                      Choose...
                    </option>
                    <option
                      v-for="region in regionsBasedOnAlpha"
                      :key="region.alpha"
                      :value="region.alpha"
                    >
                      {{ region.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </FormProvider>

          <!-- Na ginei modal -->
          <div
            v-show="getSelectedPayWay.name === PayWaysEnum.CREDIT_CARD"
            id="stripe-card"
            ref="stripleElement"
          />
        </div>
      </div>
      <CheckoutPayWays
        :cart-total-price="cartTotalPrice"
        :cart-total-price-for-pay-way="cartTotalPriceForPayWay"
      />
      <CheckoutProductContainer
        :cart="cart"
        :cart-total-length="cartTotalLength"
        :cart-total-price="cartTotalPrice"
        :cart-total-price-for-pay-way="cartTotalPriceForPayWay"
      />
      <template v-if="cartTotalLength">
        <div class="checkout-grid-pay-button">
          <button
            class="btn btn-outline-primary-one green-bg"
            title="Pay Now"
            type="button"
            @click="submitForm"
          >
            Confirm your purchase
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { cloneDeep, merge } from 'lodash'
import { useToast } from 'vue-toastification'
import { Options, Vue } from 'vue-class-component'
import PayWayModel from '@/state/payway/PayWayModel'
import CartItemModel from '@/state/cart/CartItemModel'
import CountryModel from '@/state/country/CountryModel'
import RegionsModel from '@/state/country/RegionsModel'
import { PayWaysEnum } from '@/state/payway/Enum/PayWaysEnum'
import FormProvider from '@/components/Form/FormProvider.vue'
import FormBaseInput from '@/components/Form/FormBaseInput.vue'
import UserDetailsModel from '@/state/user/data/UserDetailsModel'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import { useValidation, ValidationError } from 'vue3-form-validation'
import { email, exactly, min, required } from '@/components/Form/Utils'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import CheckoutPayWays from '@/components/Checkout/CheckoutPayWays.vue'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import CheckoutProductContainer from '@/components/Checkout/CheckoutProductContainer.vue'

const toast = useToast()

let {
  validateFields
} = useValidation({})

@Options({
  name: 'Checkout',
  components: {
    FormProvider,
    FormBaseInput,
    FormSubmitButtons,
    FormValidationErrors,
    Breadcrumbs,
    CheckoutProductContainer,
    CheckoutPayWays
  }
})
export default class Checkout extends Vue {

  customerDetails = new UserDetailsModel()
  PayWaysEnum = PayWaysEnum
  
  formManager = {
    validateFields
  } = useValidation({
    first_name: {
      $value: '',
      $rules: [
        required('First Name is required'),
        min(2)('First Name has to be longer than 1 characters')
      ]
    },
    last_name: {
      $value: '',
      $rules: [
        required('Last Name is required'),
        min(2)('Last Name has to be longer than 1 characters')
      ]
    },
    email: {
      $value: '',
      $rules: [
        required('Email is required'),
        email('Please enter a valid email address')
      ]
    },
    phone: {
      $value: '',
      $rules: [
        required('Phone is required'),
        exactly(10)('Phone number has to be 10 characters')
      ]
    },
    zipcode: {
      $value: '',
      $rules: [
        required('Zipcode is required'),
        exactly(5)('Zipcode has to be 5 characters')
      ]
    },
    address: {
      $value: '',
      $rules: [
        required('Address is required'),
        min(2)('City has to be longer than 1 characters')
      ]
    },
    place: {
      $value: '',
      $rules: [
        required('Place is required'),
        min(2)('Place has to be longer than 1 characters')
      ]
    }
  })

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }

  get availableCountries(): Array<CountryModel> {
    return store.getters['country/getCountries']
  }

  get regionsBasedOnAlpha(): Array<RegionsModel> {
    return store.getters['country/getRegionsBasedOnAlpha']
  }

  get cart(): Array<CartItemModel> {
    return store.getters['cart/getCart']
  }

  get userData(): UserDetailsModel {
    if (this.isAuthenticated) {
      return store.getters['user/data/getUserData']
    }
    return new UserDetailsModel
  }

  get cartTotalLength(): number {
    return store.getters['cart/getCartTotalLength']
  }

  get cartTotalPrice(): number {
    return store.getters['cart/getCartTotalPrice']
  }

  get cartTotalPriceForPayWay(): number {
    return store.getters['cart/getCartTotalPriceForPayWay']
  }

  get stripeResultToken(): string {
    return store.getters['stripeCard/getResultToken']
  }

  get getSelectedPayWay(): PayWayModel {
    return store.getters['pay_way/getSelectedPayWay']
  }

  async created(): Promise<void> {
    await store.dispatch('country/fetchCountriesFromRemote')
  }

  async mounted(): Promise<void> {
    document.title = 'Checkout'
    if (this.isAuthenticated) {
      await store.dispatch('user/data/fetchUserDataFromRemote')
    }
    await Promise.all([
      store.dispatch('stripeIban/initIBANComponent'),
      store.dispatch('stripeCard/initStripeComponent'),
      store.dispatch('cart/cartTotalPriceForPayWayAction', this.getSelectedPayWay)
    ])

    this.customerDetailsInitialize()
  }

  async restRegions(e: any): Promise<void> {
    const countryAlpha2Key = e.target.value
    await store.dispatch('country/findRegionsBasedOnAlphaFromInput', countryAlpha2Key)
    this.customerDetails.region = 'choose'
  }

  async submitForm(): Promise<void> {
    if(this.getSelectedPayWay.name === PayWaysEnum.CREDIT_CARD) {
      try {
        await store.dispatch('stripeCard/createStripeToken')
        if (this.stripeResultToken) {
          await this.handleSubmit(this.stripeResultToken)
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      await this.handleSubmit()
    }
  }

  handleSubmit = async (stripe_token?: any) => {
    const items = []
    try {
      for (let i = 0; i < this.cart.length; i++) {
        const item = this.cart[i]
        const obj = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity
        }
        items.push(obj)
      }

      const formData: any = await validateFields()
      const apiData = {
        user_id: this.customerDetails.id ? this.customerDetails.id : this.userData.id,
        pay_way: 'Credit Card',
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        address: formData.address,
        zipcode: formData.zipcode,
        place: formData.place,
        phone: formData.phone,
        country: this.customerDetails.country,
        region: this.customerDetails.region,
        items
      }

      if (this.getSelectedPayWay.name === PayWaysEnum.CREDIT_CARD) {
        const stripeToken = {
          stripe_token: stripe_token.id
        }
        merge(apiData, stripeToken)
      }

      if (this.customerDetails.country === 'choose') {
        toast.error('The country field is missing!')
      } else if (this.customerDetails.region === 'choose') {
        toast.error('The region field is missing!')
      } else if (Object.keys(this.getSelectedPayWay).length <= 0) {
        toast.error('You have to select a pay way method')
      } else {
        await store.dispatch('cart/createOrder', apiData)
      }

    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }

  public customerDetailsInitialize(): void {
    this.customerDetails = cloneDeep(this.userData)

    if (this.isAuthenticated) {
      if (this.customerDetails.first_name !== null) {
        this.formManager.form.first_name.$value = cloneDeep(this.userData.first_name)
      }
      if (this.customerDetails.last_name !== null) {
        this.formManager.form.last_name.$value = cloneDeep(this.userData.last_name)
      }
      if (this.customerDetails.phone !== null) {
        this.formManager.form.phone.$value = String(cloneDeep(this.userData.phone) as unknown as string)
      }
      if (this.customerDetails.place !== null) {
        this.formManager.form.place.$value = cloneDeep(this.userData.place)
      }
      if (this.customerDetails.email !== null) {
        this.formManager.form.email.$value = cloneDeep(this.userData.email)
      }
      if (this.customerDetails.zipcode !== null) {
        this.formManager.form.zipcode.$value = String(cloneDeep(this.userData.zipcode) as unknown as string)
      }
      if (this.customerDetails.address !== null) {
        this.formManager.form.address.$value = cloneDeep(this.userData.address)
      }

      if (!this.customerDetails.country) {
        this.customerDetails.country = 'choose'
        this.customerDetails.region = 'choose'
      }
    } else {
      this.customerDetails.address = ''
      this.customerDetails.city = ''
      this.customerDetails.country = ''
      this.customerDetails.email = ''
      this.customerDetails.first_name = ''
      this.customerDetails.last_name = ''
      this.customerDetails.phone = 0
      this.customerDetails.place = ''
      this.customerDetails.region = ''
      this.customerDetails.zipcode = 0
      this.customerDetails.country = 'choose'
      this.customerDetails.region = 'choose'
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Checkout/Checkout"

</style>
