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
              v-for="item in cart.items"
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

        <div ref="stripleElement" id="card-element" class="mb-5 mt-5"></div>

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
import {find} from "lodash";

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
  customerDetails = new UserDetailsModel
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

  get cart(): {} {
    return store.getters['cart/getCart']
  }

  get userData(): UserDetailsModel {
    return store.getters['user/data/getUserData']
  }

  get cartTotalLength(): number {
    return store.getters['cart/cartTotalLength']
  }

  get cartTotalPrice(): number {
    return store.getters['cart/cartTotalPrice']
  }

  itemTotal(item: CartItemModel): number {
    return item.quantity * item.product.price
  }

  async created(): Promise<void> {
    await store.dispatch('country/getCountriesFromRemote')
  }

  async mounted(): Promise<void> {
    document.title = 'Checkout | grooveShop'
    if(this.isAuthenticated){
      await store.dispatch('user/data/userDataFromRemote')
      await store.dispatch('country/findRegionsBasedOnAlphaForLoggedCustomer')
    }
    this.customerDetailsInitialize()
  }

  updated(): void {
    if (!this.$refs.stripleElement.classList.contains('StripeElement')) {
      this.updateStripeElement()
    }
  }

  async handle(e: any): Promise<void> {
    const countryAlpha2Key = e.target.value
    await store.dispatch('country/findRegionsBasedOnAlphaFromInput', countryAlpha2Key)
  }

  private customerDetailsInitialize(): void {
    if (this.isAuthenticated) {
      this.customerDetails = this.userData
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

  protected updateStripeElement(): void {
    if (this.cartTotalLength > 0) {
      // this.stripe = new Stripe('pk_test_sDva2BtVWsc3nQzcqU5MEWDP008QiK6ae3')
      // const elements = this.stripe.elements();
      // this.card = elements.create('card', { hidePostalCode: true })
      // this.card.mount('#card-element')
    }
  }

  protected submitForm(): void {
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

    //   if (!this.errors.length) {
    //   //   this.stripe.createToken(this.card).then((result:any) => {
    //   //     if (result.error) {
    //   //       this.errors.push('Something went wrong with Stripe. Please try again')
    //   //       console.log(result.error.message)
    //   //     } else {
    //   //       this.stripeTokenHandler(result.token)
    //   //     }
    //   //   })
    //   // }
    // }
  }

  // async stripeTokenHandler(token: string): Promise<void> {
  //   const items = []
  //
  //   for (let i = 0; i < this.cart.items.length; i++) {
  //     const item = this.cart.items[i]
  //     const obj = {
  //       product: item.product.id,
  //       quantity: item.quantity,
  //       price: item.product.price * item.quantity
  //     }
  //
  //     items.push(obj)
  //   }
  //
  //   const data = {
  //     'user_id': this.userDetails.id,
  //     'first_name': this.userDetails.first_name,
  //     'last_name': this.userDetails.last_name,
  //     'email': this.userDetails.email,
  //     'address': this.userDetails.address,
  //     'zipcode': this.userDetails.zipcode,
  //     'place': this.userDetails.place,
  //     'phone': this.userDetails.phone,
  //     'items': items,
  //     'stripe_token': token.id
  //   }
  //
  //   this.$sthis.$store.dispatch('createOrder', data)
  // }
}
</script>
