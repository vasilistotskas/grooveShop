<template>
  <div class="page-checkout container mt-8 mb-5 ">
    <div class="checkout-grid-container content-min-height">

      <div class="checkout-grid-order-user-details">
        <div class="checkout-grid-content">
          <h2 class="subtitle">Shipping details</h2>
          <p class="has-text-grey mb-4">* All fields are required</p>
          <FormProvider
              id="userDetailsForm"
              name="userDetailsForm"
              title=""
              :formClass="'form-class checkout-grid-form'"
              :form="formManager.form"
              :errors="formManager.errors"
              @submit="handleSubmit()">

            <div class="checkout-grid-form-part-left">
              <div class="first_name col-12 mb-3">
                <label :for="formManager.form.first_name.$uid" class="label">First Name</label>
                <BaseInput
                    v-model="formManager.form.first_name.$value"
                    :has-error="formManager.form.first_name.$hasError"
                    :validating="formManager.form.first_name.$validating"
                    :placeholder="customerDetails.first_name"
                    :id="formManager.form.first_name.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.first_name.$errors"/>
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.last_name.$uid" class="label">Last Name</label>
                <BaseInput
                    v-model="formManager.form.last_name.$value"
                    :has-error="formManager.form.last_name.$hasError"
                    :validating="formManager.form.last_name.$validating"
                    :placeholder="customerDetails.last_name"
                    :id="formManager.form.last_name.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.last_name.$errors"/>
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.email.$uid" class="label">Email</label>
                <BaseInput
                    v-model="formManager.form.email.$value"
                    :has-error="formManager.form.email.$hasError"
                    :validating="formManager.form.email.$validating"
                    :placeholder="customerDetails.email"
                    :id="formManager.form.email.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.email.$errors"/>
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.phone.$uid" class="label">Phone</label>
                <BaseInput
                    v-model="formManager.form.phone.$value"
                    :has-error="formManager.form.phone.$hasError"
                    :validating="formManager.form.phone.$validating"
                    :placeholder="customerDetails.phone"
                    :id="formManager.form.phone.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.phone.$errors"/>
              </div>

            </div>

            <div class="checkout-grid-form-part-right">
              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.address.$uid" class="label">Address</label>
                <BaseInput
                    v-model="formManager.form.address.$value"
                    :has-error="formManager.form.address.$hasError"
                    :validating="formManager.form.address.$validating"
                    :placeholder="customerDetails.address"
                    :id="formManager.form.address.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.address.$errors"/>
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.zipcode.$uid" class="label">Zipcode</label>
                <BaseInput
                    v-model="formManager.form.zipcode.$value"
                    :has-error="formManager.form.zipcode.$hasError"
                    :validating="formManager.form.zipcode.$validating"
                    :placeholder="customerDetails.zipcode"
                    :id="formManager.form.zipcode.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.zipcode.$errors"/>
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.place.$uid" class="label">Place</label>
                <BaseInput
                    v-model="formManager.form.place.$value"
                    :has-error="formManager.form.place.$hasError"
                    :validating="formManager.form.place.$validating"
                    :placeholder="customerDetails.place"
                    :id="formManager.form.place.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.place.$errors"/>
              </div>

              <div class="checkout-grid-country-region">
                <div class="form-outline">
                  <label for="inputCountry" class="form-label">Country</label>
                  <select name="country" id="inputCountry" class="form-select" v-model="customerDetails.country" v-on:change="restRegions">
                    <option disabled value="choose">Choose...</option>
                    <option
                        v-for="country in availableCountries"
                        :key="country.alpha_2"
                        :value="country.alpha_2">
                      {{ country.name }}
                    </option>
                  </select>
                </div>

                <div class="form-outline">
                  <label for="inputRegion" class="form-label">Region</label>
                  <select ref="regionElement" name="region" id="inputRegion" class="form-select" v-model="customerDetails.region">
                    <option disabled value="choose">Choose...</option>
                    <option
                        v-for="region in regionsBasedOnAlpha"
                        :key="region.alpha"
                        :value="region.alpha">
                      {{ region.name }}
                    </option>
                  </select>
                </div>
              </div>

            </div>

          </FormProvider>

          <div ref="stripleElement" id="stripe-card" class="mb-5 mt-3"></div>
          <template v-if="cartTotalLength">
            <button type="button" class="btn btn-outline-primary" @click="submitForm">Pay with Stripe</button>
          </template>

        </div>
      </div>

      <div class="checkout-grid-order-info">
        <div class="checkout-grid-title">
          <h1 class="title">Checkout</h1>
        </div>
        <div class="checkout-grid-head">
          <div class="checkout-grid-head-part-one">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          <div class="checkout-grid-head-part-two"
               v-for="item in cart"
               v-bind:key="item.product.id">
            <span>{{ item.product.name }}</span>
            <span>${{ item.product.price }}</span>
            <span>{{ item.quantity }}</span>
            <span>${{ itemTotal(item).toFixed(2) }}</span>
          </div>

          <div class="checkout-grid-head-part-three">
            <span>Total</span>
            <span>{{ cartTotalLength }}</span>
            <span>${{ cartTotalPrice.toFixed(2) }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store"
import { cloneDeep } from "lodash"
import { useToast } from "vue-toastification"
import { Options, Vue } from "vue-class-component"
import CartItemModel from "@/state/cart/CartItemModel"
import CountryModel from "@/state/country/CountryModel"
import RegionsModel from "@/state/country/RegionsModel"
import BaseInput from "@/components/Form/BaseInput.vue"
import FormProvider from "@/components/Form/FormProvider.vue"
import SubmitButtons from "@/components/Form/SubmitButtons.vue"
import UserDetailsModel from "@/state/user/data/UserDetailsModel"
import {useValidation, ValidationError} from "vue3-form-validation"
import ValidationErrors from "@/components/Form/ValidationErrors.vue"
import {equal, min, exactly, required, email } from "@/components/Form/Utils"

const toast = useToast()

let {
  form,
  submitting,
  validating,
  errors,
  hasError,
  validateFields,
  resetFields,
  add,
  remove
} = useValidation({})

@Options({
  name: "Checkout",
  components: {
    FormProvider,
    BaseInput,
    SubmitButtons,
    ValidationErrors
  }
})
export default class Checkout extends Vue {

  $refs!: {
    stripleElement: HTMLFormElement
  }
  customerDetails: any = {}
  card = {}

  async created(): Promise<void> {
    await Promise.all([
      await store.dispatch('country/getCountriesFromRemote'),
      store.dispatch('stripeIban/initIBANComponent'),
      store.dispatch('stripeCard/initStripeComponent')
    ])
  }

  async mounted(): Promise<void> {
    document.title = 'Checkout'
    if(this.isAuthenticated){
      await store.dispatch('user/data/userDataFromRemote')
    }
    this.customerDetailsInitialize()
  }

  formManager = {
    form,
    submitting,
    validating,
    errors,
    hasError,
    validateFields,
    resetFields,
    add,
    remove
  } = useValidation({
    first_name: {
      $value: "",
      $rules: [
        required("First Name is required"),
        min(2)("First Name has to be longer than 1 characters")
      ]
    },
    last_name: {
      $value: "",
      $rules: [
        required("Last Name is required"),
        min(2)("Last Name has to be longer than 1 characters")
      ]
    },
    email: {
      $value: "",
      $rules: [
        required("Email is required"),
        email("Please enter a valid email address")
      ]
    },
    phone: {
      $value: "",
      $rules: [
        required("Phone is required"),
        exactly(10)("Phone number has to be 10 characters")
      ]
    },
    zipcode: {
      $value: "",
      $rules: [
        required("Zipcode is required"),
        exactly(5)("Zipcode has to be 5 characters")
      ]
    },
    address: {
      $value: "",
      $rules: [
        required("Address is required"),
        min(2)("City has to be longer than 1 characters")
      ]
    },
    place: {
      $value: "",
      $rules: [
        required("Place is required"),
        min(2)("Place has to be longer than 1 characters")
      ]
    }
  })

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }

  get availableCountries(): CountryModel {
    return store.getters['country/getCountries']
  }

  get regionsBasedOnAlpha(): RegionsModel {
    return store.getters['country/getRegionsBasedOnAlpha']
  }

  get cart(): Array<CartItemModel> {
    return store.getters['cart/getCart']
  }

  get userData(): UserDetailsModel {
    if(this.isAuthenticated) {
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

  get stripeResultToken(): string {
    return store.getters['stripeCard/getResultToken']
  }

  itemTotal(item: CartItemModel): number {
    return item.quantity * item.product.price
  }

  async restRegions(e: any): Promise<void> {
    const countryAlpha2Key = e.target.value
    await store.dispatch('country/findRegionsBasedOnAlphaFromInput', countryAlpha2Key)
    this.customerDetails.region = 'choose'
  }

  private customerDetailsInitialize(): void {
    this.customerDetails = cloneDeep(this.userData)

    if (this.isAuthenticated) {
      if (this.customerDetails.first_name != null){
        this.formManager.form.first_name.$value = cloneDeep(this.userData.first_name)
      }
      if (this.customerDetails.last_name != null){
        this.formManager.form.last_name.$value = cloneDeep(this.userData.last_name)
      }
      if (this.customerDetails.phone != null){
        this.formManager.form.phone.$value = String(<unknown | string>cloneDeep(this.userData.phone) as unknown as string)
      }
      if (this.customerDetails.place != null){
        this.formManager.form.place.$value = cloneDeep(this.userData.place)
      }
      if (this.customerDetails.email != null){
        this.formManager.form.email.$value = cloneDeep(this.userData.email)
      }
      if (this.customerDetails.zipcode != null){
        this.formManager.form.zipcode.$value = String(<unknown | string>cloneDeep(this.userData.zipcode) as unknown as string)
      }
      if (this.customerDetails.address != null){
        this.formManager.form.address.$value = cloneDeep(this.userData.address)
      }


      if(!this.customerDetails.country){
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

  async submitForm(): Promise<void> {
    try {
      await store.dispatch('stripeCard/createStripeToken')
      if(this.stripeResultToken){
        await this.handleSubmit(this.stripeResultToken)
      }
    } catch (e) {
      console.log(e)
    }
  }

  handleSubmit = async (token: any) => {
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

      const formData:any = await validateFields()
      const apiData = {
        user_id: this.customerDetails.id ? this.customerDetails.id : this.userData.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        address: formData.address,
        zipcode: formData.zipcode,
        place: formData.place,
        phone: formData.phone,
        country: this.customerDetails.country,
        region: this.customerDetails.region,
        items: items,
        stripe_token: token.id
      }
      if(this.customerDetails.country == 'choose'){
        toast.error("The country field is missing!")
      }
      else if(this.customerDetails.region == 'choose'){
        toast.error("The region field is missing!")
      }
      else {
        await store.dispatch('cart/createOrder', apiData)
      }

    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .checkout-grid-container {
    display: grid;
    grid-template-columns: 60% 40%;
    background-color: white;
    border-radius: 10px;
    padding: 15px 30px 30px;
    gap: 25px;
    a, h2 {
      color: $primary-color-2;
    }
    .checkout-grid-head {
      display: grid;
      gap: 10px;
      &-part {
        &-two, &-three {
          background-color: $primary-color-4;
          border-radius: 5px;
          align-items: center;
          justify-items: center;
          padding: 5px;
        }
        &-one {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-radius: 5px;
          align-items: center;
          justify-items: center;
          padding: 5px;
          font-size: 20px;
        }
        &-two {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        &-three {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
      }
    }
    .checkout-grid-content {
      display: grid;
      button {
        justify-self: end;
        align-self: end;
      }
    }
    .checkout-grid-country-region {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-items: center;
    }
  }

</style>
