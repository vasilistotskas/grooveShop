<template>
  <div v-if="order && Object.keys(order).length > 0" class="card-body card-body-order-history">
    <div class="order-history-grid-head">
      <span />
      <span>Product</span>
      <span>Price</span>
      <span>Quantity</span>
      <span>Total</span>
    </div>
    <UserOrderHistoryCard v-for="item in order.items" :key="item.product.id" :product="item.product" :order-total="orderTotal" :quantity="item.quantity" class="order-history-grid-body" />
  </div>
</template>

<script lang="ts">
import { forEach } from 'lodash'
import UserOrderModel from '@/state/user/order/UserOrderModel'
import OrderItemModel from '@/state/user/order/OrderItemModel'
import { Options as Component, Vue } from 'vue-class-component'
import Pagination from '@/components/Pagination/Pagination.vue'
import UserOrderHistoryCard from '@/components/User/UserOrderHistoryCard.vue'

@Component({
  name: 'UserOrderHistoryContainer',
  components: {
    Pagination,
    UserOrderHistoryCard,
  },
  props: {
    order: Object,
  },
})
export default class UserOrderHistoryContainer extends Vue {
  order = new UserOrderModel()

  get orderTotal(): number {
    let total = 0
    forEach(this.order.items, (item: OrderItemModel) => {
      total += item.quantity * item.product.price
    })
    return total
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/User/UserOrderHistory';
</style>
