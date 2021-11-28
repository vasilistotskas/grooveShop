<template>
  <div v-if="orders && Object.keys(orders).length > 0">
    <div
        v-for="order in orders"
        v-bind:key="order.id"
        class="box mb-4"
        v-bind:order="order">
      <h3 class="is-size-4 mb-6 text-black">Order #{{ order.id }}</h3>
      <div class="card">
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
                v-for="item in order.items"
                v-bind:key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td>${{ item.product.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>${{ itemTotal(item).toFixed(2) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>NO ORDERS</h1>
  </div>

</template>

<script lang="ts">
import store from '@/store'
import {Options, Vue} from "vue-class-component"
import CartItemModel from "@/state/cart/CartItemModel"
import UserOrderModel from "@/state/user/order/UserOrderModel"

@Options({
  name: "OrderSummary",
})

export default class orderSummary extends Vue{
  beforeCreate() {
    store.dispatch('user/order/userOrdersFromRemote')
  }
  mounted() {
    document.title = 'My Orders | grooveShop'
  }
  get orders(): UserOrderModel {
    return store.getters['user/order/getUserOrders']
  }
  itemTotal(item: CartItemModel): number {
    return item.quantity * item.product.price
  }
}
</script>
