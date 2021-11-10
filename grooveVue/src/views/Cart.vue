<template>
  <div class="page-cart container mt-5">
    <div class="row">
      <div class="col-12">
        <h1 class="title mb-5">Cart</h1>
      </div>

      <div class="col-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLength">
          <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          <CartItem
              v-for="item in cart.items"
              v-bind:key="item.product.id"
              v-bind:initialItem="item"
              v-on:removeFromCart="removeFromCart"/>
          </tbody>
        </table>

        <p v-else>You don't have any products in your cart...</p>
      </div>

      <div class="col-12 box">
        <h2 class="subtitle">Summary</h2>

        <strong>${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items

        <router-link to="/cart/checkout" class="button is-dark float-end">Proceed to checkout</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CartItem from '@/components/CartItem.vue'

export default {
  name: 'Cart',
  components: {
    CartItem
  },
  data() {
    return {
      cart: {
        items: []
      }
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
  methods: {
    removeFromCart(item) {
      this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
    }
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.quantity
      }, 0)
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.product.price * curVal.quantity
      }, 0)
    },
  }
}
</script>