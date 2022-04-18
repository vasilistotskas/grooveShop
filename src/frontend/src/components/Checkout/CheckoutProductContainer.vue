<template>
  <div
    v-if="cart && Object.keys(cart).length > 0"
    class="checkout-grid-order-info"
  >
    <div class="checkout-grid-title mb-4">
      <h2 class="title">
        Your Items
      </h2>
    </div>
    <div class="checkout-grid-head">
      <CheckoutProductCard
        v-for="item in cart"
        :key="item.product.id"
        :item="item"
      />
    </div>
    <div class="checkout-grid-head-part-three">
      <span>Total:</span>
      <span>${{ cartTotalPrice.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CartItemModel from '@/state/cart/CartItemModel'
import CheckoutProductCard from '@/components/Checkout/CheckoutProductCard.vue'

@Options({
  name: 'CheckoutProductContainer',
  components: {
    CheckoutProductCard
  },
  props: {
    cart: Array,
    cartTotalLength: Number,
    cartTotalPrice: Number
  }
})
export default class CheckoutProductContainer extends Vue {
  cart: Array<CartItemModel> = []
  cartTotalLength = 0
  cartTotalPrice = 0
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Checkout/Checkout"

</style>
