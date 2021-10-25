<template>
  <div
      v-for="order in orders"
      v-bind:key="order.id"
      class="box mb-4"
      v-bind:order="order"
  >
    <h3 class="is-size-4 mb-6">Order #{{ order.id }}</h3>

    <h4 class="is-size-5">Products</h4>

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
          v-for="item in order.items"
          v-bind:key="item.product.id"
      >
        <td>{{ item.product.name }}</td>
        <td>${{ item.product.price }}</td>
        <td>{{ item.quantity }}</td>
        <td>${{ getItemTotal(item).toFixed(2) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'OrderSummary',
  beforeCreate() {
    this.$store.dispatch('getUserOrders')
  },
  mounted() {
    document.title = 'My Orders | grooveShop'
  },
  computed: {
    orders: {
      get() {
        return this.$store.getters['getStateUserOrders']
      }
    }
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price
    },
    orderTotalLength(order) {
      return order.items.reduce((acc, curVal) => {
        return acc += curVal.quantity
      }, 0)
    }
  }
}
</script>