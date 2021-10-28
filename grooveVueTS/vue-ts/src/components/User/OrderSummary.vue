<template>
  <div
      v-for="order in orders"
      v-bind:key="order.id"
      class="box mb-4"
      v-bind:order="order"
  >
    <h3 class="is-size-4 mb-6 text-black">Order #{{ order.id }}</h3>

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
import UserOrderModel from "@/state/user/order/UserOrderModel";
import CartItemModel from "@/state/cart/CartItemModel";

@Options({
  name: "OrderSummary",
})

export default class orderSummary extends AppBaseLayout{
  beforeCreate() {
    this.$store.dispatch('user/order/userOrdersFromRemote')
  }
  mounted() {
    document.title = 'My Orders | grooveShop'
  }
  get orders(): UserOrderModel {
    return this.$store.getters['user/order/getUserOrders']
  }
  getItemTotal(item: CartItemModel): number {
    return item.quantity * item.product.price
  }
}
</script>