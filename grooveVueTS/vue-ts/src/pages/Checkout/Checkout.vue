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

<script lang="ts">
import AppBasePage from '@/pages/AppBasePage.vue'
import { Options } from "vue-class-component";

@Options({
  name: "Checkout"
})

export default class Checkout extends AppBasePage {

}
</script>
