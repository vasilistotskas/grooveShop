<template>
  <div class="page-checkout container mt-5" v-if="customerDetails && Object.keys(customerDetails).length > 0">
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
            <td>${{ getItemTotal(item).toFixed(2) }}</td>
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
              <select name="country" id="inputCountry" class="form-select" v-model="customerDetails.country" @change="resetRegion">
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

<script>
import {isEmpty} from "lodash";
import store from '@/store'

export default {
  name: 'Checkout',
  data() {
    return {
      cart: {
        items: []
      },
      stripe: {},
      card: {},
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      region: '',
      country: '',
      zipcode: '',
      place: '',
      errors: []
    }
  },
  computed: {
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.product.price * curVal.quantity
      }, 0)
    },
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.quantity
      }, 0)
    },
    userData: {
      get() {
        return store.getters['getStateUserData']
      },
      set(value) {
        store.commit('updateUserData', value)
      }
    },
    customerDetails: {
      get() {
        return store.state.isAuthenticated ? store.getters['getStateUserDetails'] : {}
      },
    },
    availableCountries: {
      get() {
        return store.getters['getStateCountries']
      }
    },
    regionsBasedOnAlpha: {
      get() {
        return store.getters['getStateRegionsBasedOnAlpha']
      }
    }
  },
  beforeCreate() {
    store.dispatch('getCountries')
    if (store.state.isAuthenticated) {
      store.dispatch('getUserData')
    }
  },
  created() {
    this.customerDataInitialize()
  },
  mounted() {
    document.title = 'Checkout | grooveShop'
    this.cart = store.state.cart
  },
  updated() {
    if(!this.$refs.stripleElement.classList.contains('StripeElement')){
      this.stripeElement()
    }
  },
  watch:{
    'customerDetails.country': function (newVal, oldVal){
      store.dispatch('getRegionsBasedOnAlpha', newVal)
    }
  },
  methods: {
    resetRegion() {
      // ?????
      if (!store.state.isAuthenticated) {
        store.dispatch('getRegionsBasedOnAlpha', this.customerDetails.country)
      }
      this.customerDetails.region = 'choose'

    },
    customerDataInitialize(){
      if (store.state.isAuthenticated) {
        store.dispatch('getUserDetails')
      } else {
        this.customerDetails.address = this.address
        this.customerDetails.city = this.city
        this.customerDetails.country = this.country
        this.customerDetails.email = this.email
        this.customerDetails.first_name = this.first_name
        this.customerDetails.last_name = this.last_name
        this.customerDetails.phone = this.phone
        this.customerDetails.place = this.place
        this.customerDetails.region = this.region
        this.customerDetails.zipcode = this.zipcode
      }
    },
    stripeElement(){
      if (this.cartTotalLength > 0) {
        this.stripe = Stripe('pk_test_sDva2BtVWsc3nQzcqU5MEWDP008QiK6ae3')
        const elements = this.stripe.elements();
        this.card = elements.create('card', {hidePostalCode: true})

        this.card.mount('#card-element')
      }
    },
    getItemTotal(item) {
      return item.quantity * item.product.price
    },
    submitForm() {
      this.errors = []

      if (this.customerDetails.first_name === '') {
        this.errors.push('The first name field is missing!')
      }

      if (this.customerDetails.last_name === '') {
        this.errors.push('The last name field is missing!')
      }

      if (this.customerDetails.email === '') {
        this.errors.push('The email field is missing!')
      }

      if (this.customerDetails.phone === '') {
        this.errors.push('The phone field is missing!')
      }

      if (this.customerDetails.address === '') {
        this.errors.push('The address field is missing!')
      }

      if (this.customerDetails.zipcode === '') {
        this.errors.push('The zip code field is missing!')
      }

      if (this.customerDetails.place === '') {
        this.errors.push('The place field is missing!')
      }

      if (!this.errors.length) {

        this.stripe.createToken(this.card).then(result => {
          if (result.error) {

            this.errors.push('Something went wrong with Stripe. Please try again')

            console.log(result.error.message)
          } else {
            this.stripeTokenHandler(result.token)
          }
        })
      }
    },
    async stripeTokenHandler(token) {
      const items = []

      for (let i = 0; i < this.cart.items.length; i++) {
        const item = this.cart.items[i]
        const obj = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity
        }

        items.push(obj)
      }

      const data = {
        'user_id': this.userData.id,
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

      store.dispatch('createOrder', data)
    }
  }
}
</script>
