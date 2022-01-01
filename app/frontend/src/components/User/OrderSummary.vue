<template>
  <div v-if="orders && Object.keys(orders).length > 0">
    <div
        v-for="order in orders"
        v-bind:key="order.id"
        class="mb-4"
        v-bind:order="order">
      <h3 class="is-size-4 mb-3">Order #{{ order.id }}</h3>
      <div class="box">
        <div class="card">
          <div class="card-body card-body-order-history">
            <div class="order-history-grid-head">
              <span></span>
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            <div class="order-history-grid-body" v-for="item in order.items"
                v-bind:key="item.product.id">
                <router-link :to="'/product' + item.product.absolute_url" aria-label="Product">
                  <span>
                    <img :src="item.product.main_image" width="75" height="75" class="border-radius-img img-fluid" :alt="item.product.name">
                  </span>
                  <span>{{ item.product.name }}</span>
                  <span>${{ item.product.price }}</span>
                  <span>{{ item.quantity }}</span>
                  <span>${{ itemTotal(item).toFixed(2) }}</span>
                </router-link>
            </div>
          </div>
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

<style lang="scss" scoped>
  .order-history-grid {
    &-head, &-body a{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 70px;
      align-items: center;
      justify-items: center;
    }
    &-head {
      padding-bottom: 10px;
    }
    &-body {
      padding: 10px;
      border: 1px solid $primary-color-6;
      background-color: white;
      border-radius: 8px;
      &:hover {
        box-shadow: 0 0 2px 1px #f800007d;
      }
    }
  }
  .card-body-order-history {
    background-color: $primary-color-4!important;
    border-radius: 10px;
    padding-top: 30px!important;
    padding-bottom: 30px!important;
    span, a {
      color: $primary-color-2!important;
    }
  }
</style>