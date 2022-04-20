<template v-if="validPayWays && Object.keys(validPayWays).length > 0">
  <div class="checkout-pay_way-container">
    <h2 class="mb-4">
      Choose payment method
    </h2>
    <div
      v-for="payWay in validPayWays"
      :key="payWay.name"
      class="checkout-pay_way-content"
    >
      <input
        :id="payWay.name"
        v-model="selectedPayWay"
        name="payway"
        :value="payWay.name"
        type="radio"
        class="checkout-pay_way-input"
        @change="setSelectedPayWay(payWay)"
      >
      <label
        class="checkout-pay_way-input-label"
        :for="payWay.name"
      >
        {{ payWay.name }} <span class="checkout-pay_way-cost">({{ payWayExtraCost(payWay) }})</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import PayWayModel from '@/state/payway/PayWayModel'

@Options({
  name: 'CheckoutPayWays',
  props: {
    cartTotalPrice: Number
  }
})
export default class CheckoutPayWays extends Vue {

  selectedPayWay: string = ''
  cartTotalPrice: number = 0

  async created(): Promise<void> {
    await store.dispatch('pay_way/fetchActivePayWaysFromRemote')
  }

  mounted(): void {
    this.selectedPayWay = this.getSelectedPayWayName
  }

  get validPayWays(): Array<PayWayModel> {
    return store.getters['pay_way/getActivePayWays']
  }

  get getSelectedPayWayName(): PayWayModel['name'] {
    return store.getters['pay_way/getSelectedPayWayName']
  }

  protected setSelectedPayWay(selectedPayWay: PayWayModel): void {
    store.dispatch('cart/cartTotalPriceForPayWayAction', selectedPayWay)
    store.commit('pay_way/setSelectedPayWay', selectedPayWay)
  }

  protected payWayExtraCost(payWay: PayWayModel): string {
    if (payWay.free_for_order_amount < this.cartTotalPrice) {
      return 'Free'
    }
    return payWay.cost + '$'
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Checkout/CheckoutPayWays"

</style>
