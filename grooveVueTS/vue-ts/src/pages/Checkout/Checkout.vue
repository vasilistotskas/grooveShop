<template>
  <div class="page-checkout container mt-3 mb-5">
    <div class="row">
      <div class="col-12">
        <h1 class="title mb-3">Checkout</h1>
      </div>

      <div class="card mb-3">
        <div class="card-body">
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

            <tfoot class="border-bottom-0">
            <tr>
              <td colspan="2" class="border-bottom-0">Total</td>
              <td class="border-bottom-0">{{ cartTotalLength }}</td>
              <td class="border-bottom-0">${{ cartTotalPrice.toFixed(2) }}</td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div class="col-12 card shipping-details-card">
        <div class="card-body">
          <h2 class="subtitle">Shipping details</h2>

          <p class="has-text-grey mb-4">* All fields are required</p>

          <div class="row">
            <div class="col-6">
              <div class="form-outline">
                <label class="form-label">First name*</label>
                <input type="text" class="form-control" v-model="customerDetails.first_name" required>
              </div>

              <div class="form-outline">
                <label class="form-label">Last name*</label>
                <input type="text" class="form-control" v-model="customerDetails.last_name" required>
              </div>

              <div class="form-outline">
                <label class="form-label">E-mail*</label>
                <input type="email" class="form-control" v-model="customerDetails.email" required>
              </div>

              <div class="form-outline">
                <label class="form-label">Phone*</label>
                <input type="number" class="form-control" v-model="customerDetails.phone" required>
              </div>
            </div>

            <div class="col-6">
              <div class="form-outline">
                <label class="form-label">Address*</label>
                <input type="text" class="form-control" v-model="customerDetails.address" required>
              </div>

              <div class="form-outline">
                <label class="form-label">Zip code*</label>
                <input type="text" class="form-control" v-model="customerDetails.zipcode" required>
              </div>

              <div class="form-outline">
                <label class="form-label">Place*</label>
                <input type="text" class="form-control" v-model="customerDetails.place" required>
              </div>

              <div class="form-outline">
                <label for="inputCountry" class="form-label">Country</label>
                <select name="country" id="inputCountry" class="form-select" v-model="customerDetails.country" @:change="restRegions">
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
          <div ref="stripleElement" id="stripe-card" class="mb-5 mt-3"></div>
          <template v-if="cartTotalLength">
            <button type="button" class="btn btn-success float-end" @click="submitForm">Pay with Stripe</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import store from "@/store"
import UserDetailsModel from "@/state/user/data/UserDetailsModel"
import CartItemModel from "@/state/cart/CartItemModel"
import CountryModel from "@/state/country/CountryModel"
import RegionsModel from "@/state/country/RegionsModel"
import { cloneDeep } from  "lodash"
import { useToast } from "vue-toastification"

const toast = useToast()

@Options({
  name: "Checkout"
})
export default class Checkout extends Vue {

  $refs!: {
    stripleElement: HTMLFormElement
  }
  errors: Array<any> = []
  customerDetails: any = {}
  card = {}

  get isAuthenticated(): boolean {
    return store.getters['user/data/getIsAuthenticated']
  }

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

  async created(): Promise<void> {
    await store.dispatch('country/getCountriesFromRemote')
    await store.dispatch('stripeIban/initIBANComponent')
    await store.dispatch('stripeCard/initStripeComponent')
  }

  async mounted(): Promise<void> {
    document.title = 'Checkout'
    if(this.isAuthenticated){
      await store.dispatch('user/data/userDataFromRemote')
      await store.dispatch('country/findRegionsBasedOnAlphaForLoggedCustomer')
    }
    this.customerDetailsInitialize()
  }

  async restRegions(e: any): Promise<void> {
    const countryAlpha2Key = e.target.value
    await store.dispatch('country/findRegionsBasedOnAlphaFromInput', countryAlpha2Key)
    this.customerDetails.region = 'choose'
  }

  private customerDetailsInitialize(): void {
    if (this.isAuthenticated) {
      this.customerDetails = cloneDeep(this.userData)
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
    if (this.customerDetails.first_name === '' || this.customerDetails.first_name === null) {
      this.errors.push('The first name field is missing!')
    }

    if (this.customerDetails.last_name === '' || this.customerDetails.last_name === null) {
      this.errors.push('The last name field is missing!')
    }

    if (this.customerDetails.email === '' || this.customerDetails.email === null ) {
      this.errors.push('The email field is missing!')
    }

    if (this.customerDetails.phone === 0 || this.customerDetails.phone === null) {
      this.errors.push('The phone field is missing!')
    }

    if (this.customerDetails.address === '' || this.customerDetails.address === null) {
      this.errors.push('The address field is missing!')
    }

    if (this.customerDetails.zipcode === 0 || this.customerDetails.zipcode === null) {
      this.errors.push('The zip code field is missing!')
    }

    if (this.customerDetails.place === '' || this.customerDetails.place === null) {
      this.errors.push('The place field is missing!')
    }

    if (!this.errors.length) {
      try {
        await store.dispatch('stripeCard/createStripeToken')
        if(this.stripeResultToken){
          await this.stripeTokenHandler(this.stripeResultToken)
        }
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

    if (!this.errors.length){
      await store.dispatch('cart/createOrder', data)
    }
  }

}
</script>

<style lang="scss">
.shipping-details-card{
  color: #121212;
}
</style>
