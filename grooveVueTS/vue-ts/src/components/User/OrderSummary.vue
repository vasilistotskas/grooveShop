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

<script lang="ts">
import AppBaseLayout from '@/layouts/AppBaseLayout.vue'
import {Options} from "vue-class-component";
import CategoryModel from "@/state/category/CategoryModel";

@Options({
  name: "OrderSummary",
})

export default class orderSummary extends AppBaseLayout{
  beforeCreate() {
    this.$store.dispatch('user/userOrdersFromRemote')
  }
  mounted() {
    document.title = 'My Orders | grooveShop'
  }
  // get category(): Category {
  //   return this.$store.getters['user/userOrders']
  // }
  // getItemTotal(item) {
  //   return item.quantity * item.product.price
  // }
  // orderTotalLength(order) {
  //   return order.items.reduce((acc, curVal) => {
  //     return acc += curVal.quantity
  //   }, 0)
  // }
}
</script>