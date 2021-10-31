<template>
  <div class="page-checkout container mt-5">
    <div class="row">
      <div class="col-12">
        <h1 class="title mb-5">Checkout</h1>
      </div>

      <div class="col-12 box">
        <table class="table is-fullwidth">
          <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          </thead>

          <tbody>
          <tr
              v-for="item in cart"
              v-bind:key="item.product.id"
          >
            <td>{{ item.product.name }}</td>
            <td>${{ item.product.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>${{ itemTotal(item).toFixed(2) }}</td>
          </tr>
          </tbody>

          <tfoot>
          <tr>
            <td colspan="2">Total</td>
            <td>{{ cartTotalLength }}</td>
            <td>${{ cartTotalPrice.toFixed(2) }}</td>
          </tr>
          </tfoot>
        </table>
      </div>

      <div class="col-12 box">
        <h2 class="subtitle">Shipping details</h2>

        <p class="has-text-grey mb-4">* All fields are required</p>

        <div class="row">
          <div class="col-6">
            <div class="field">
              <label>First name*</label>
              <div class="control">
                <input type="text" class="input" v-model="customerDetails.first_name">
              </div>
            </div>

            <div class="field">
              <label>Last name*</label>
              <div class="control">
                <input type="text" class="input" v-model="customerDetails.last_name">
              </div>
            </div>

            <div class="field">
              <label>E-mail*</label>
              <div class="control">
                <input type="email" class="input" v-model="customerDetails.email">
              </div>
            </div>

            <div class="field">
              <label>Phone*</label>
              <div class="control">
                <input type="text" class="input" v-model="customerDetails.phone">
              </div>
            </div>
          </div>

          <div class="col-6">
            <div class="field">
              <label>Address*</label>
              <div class="control">
                <input type="text" class="input" v-model="customerDetails.address">
              </div>
            </div>

            <div class="field">
              <label>Zip code*</label>
              <div class="control">
                <input type="text" class="input" v-model="customerDetails.zipcode">
              </div>
            </div>

            <div class="field">
              <label>Place*</label>
              <div class="control">
                <input type="text" class="input" v-model="customerDetails.place">
              </div>
            </div>

            <div class="field">
              <label for="inputCountry" class="form-label">Country</label>
              <select name="country" id="inputCountry" class="form-select" v-model="customerDetails.country" v-on:change="handle">
                <option disabled value="choose">Choose...</option>
                <option
                    v-for="country in availableCountries"
                    :key="country.alpha_2"
                    :value="country.alpha_2">
                  {{ country.name }}
                </option>
              </select>
            </div>

            <div class="field">
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

        <div class="notification is-danger mt-4" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
        </div>

        <div ref="stripleElement" id="stripe-card" class="mb-5 mt-5"></div>

        <template v-if="cartTotalLength">
          <button class="button is-dark" @click="submitForm">Pay with Stripe</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AppBasePage from '@/pages/AppBasePage.vue'
import { Options } from "vue-class-component";
import store from "@/store";
import UserDetailsModel from "@/state/user/data/UserDetailsModel";
import CartItemModel from "@/state/cart/CartItemModel";
import CountryModel from "@/state/country/CountryModel";
import RegionsModel from "@/state/country/RegionsModel";
import { cloneDeep } from  "lodash"

@Options({
  name: "Checkout"
})
export default class Checkout extends AppBasePage {

  // @TODO KATI NA GINEI ME TO STRIPE NA PAEI PISW STO STORE OR SOMETHING
  $refs!: {
    stripleElement: HTMLFormElement
  }
  // selectedCountry = new CountryModel()
  errors: Array<any> = []
  customerDetails: any = {}
  card = {}


  get availableCountries(): CountryModel {
    return store.getters['country/getCountries']
  }

  get regionsBasedOnAlpha(): RegionsModel {
    return store.getters['country/getRegionsBasedOnAlpha']
  }

  get selectedCountry(): CountryModel {
    return store.getters['country/getSelectedCountry']
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
    return store.getters['cart/cartTotalLength']
  }

  get cartTotalPrice(): number {
    return store.getters['cart/cartTotalPrice']
  }

  get stripeResultToken(): any {
    return store.getters['stripeCard/getResultToken']
  }

  itemTotal(item: CartItemModel): number {
    return item.quantity * item.product.price
  }

  async created(): Promise<void> {
    await store.dispatch('country/getCountriesFromRemote')
    await store.dispatch('stripeIban/initIBANComponent')
    await store.dispatch('stripeCard/initStripeComponent')
  }

  async mounted(): Promise<void> {
    document.title = 'Checkout | grooveShop'
    if(this.isAuthenticated){
      await store.dispatch('user/data/userDataFromRemote')
      await store.dispatch('country/findRegionsBasedOnAlphaForLoggedCustomer')
    }
    this.customerDetailsInitialize()
  }

  async handle(e: any): Promise<void> {
    const countryAlpha2Key = e.target.value
    await store.dispatch('country/findRegionsBasedOnAlphaFromInput', countryAlpha2Key)
    this.customerDetails.region = 'choose'
  }

  private customerDetailsInitialize(): void {
    if (this.isAuthenticated) {
      this.customerDetails = cloneDeep(this.userData)
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
    if (this.customerDetails.first_name === '') {
      this.errors.push('The first name field is missing!')
    }

    if (this.customerDetails.last_name === '') {
      this.errors.push('The last name field is missing!')
    }

    if (this.customerDetails.email === '') {
      this.errors.push('The email field is missing!')
    }

    if (this.customerDetails.phone === 0) {
      this.errors.push('The phone field is missing!')
    }

    if (this.customerDetails.address === '') {
      this.errors.push('The address field is missing!')
    }

    if (this.customerDetails.zipcode === 0) {
      this.errors.push('The zip code field is missing!')
    }

    if (this.customerDetails.place === '') {
      this.errors.push('The place field is missing!')
    }

    if (!this.errors.length) {
      try {
        await store.dispatch('stripeCard/createStripeToken')
        await this.stripeTokenHandler(this.stripeResultToken)
      } catch (e) {
        console.log(e)
      }
    }
  }

  async stripeTokenHandler(token: any): Promise<void> {
    const items = []
    console.log(this.cart)

    for (let i = 0; i < this.cart.length; i++) {
      const item = this.cart[i]
      const obj = {
        product: item.product.id,
        quantity: item.quantity,
        price: item.product.price * item.quantity
      }

      items.push(obj)
    }

    const data = {
      'user_id': this.customerDetails.id ? this.customerDetails.id : this.userData.id,
      'first_name': this.customerDetails.first_name,
      'last_name': this.customerDetails.last_name,
      'email': this.customerDetails.email,
      'address': this.customerDetails.address,
      'zipcode': this.customerDetails.zipcode,
      'place': this.customerDetails.place,
      'phone': this.customerDetails.phone,
      'items': items,
      'stripe_token': token.id
    }

    console.log(data)

    await store.dispatch('cart/createOrder', data)
  }

}
</script>
