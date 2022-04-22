<template v-if="validPayWays && Object.keys(validPayWays).length > 0">
  <div class="checkout-pay_way-container">
    <h2 class="checkout-pay_way-container-title">
      Choose payment method
    </h2>
    <div class="checkout-pay_way-section">
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
          <span class="checkout-pay_way-icon">
            <font-awesome-icon :icon="getPayWayIcon(payWay.name)" />
          </span>
          <span class="checkout-pay_way-name">{{ payWay.name }}</span>
          <span
            class="checkout-pay_way-cost"
            v-html="payWayExtraCost(payWay)"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import PayWayModel from '@/state/payway/PayWayModel'
import { PayWaysEnum } from '@/state/payway/Enum/PayWaysEnum'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons/faCreditCard'
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons/faHandHoldingUsd'

@Options({
  name: 'CheckoutPayWays',
  props: {
    cartTotalPrice: Number,
    cartTotalPriceForPayWay: Number
  }
})
export default class CheckoutPayWays extends Vue {

  selectedPayWay: string = ''
  cartTotalPrice: number = 0
  cartTotalPriceForPayWay: number = 0

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

  public getPayWayIcon(payWayName: PayWayModel['name']) {
    switch(payWayName) {
      case PayWaysEnum.CREDIT_CARD: {
        return faCreditCard
      }
      case PayWaysEnum.PAY_ON_DELIVERY: {
        return faHandHoldingUsd
      }
      default: {
        return faCreditCard
      }
    }
  }

  protected setSelectedPayWay(selectedPayWay: PayWayModel): void {
    store.dispatch('cart/cartTotalPriceForPayWayAction', selectedPayWay)
    store.commit('pay_way/setSelectedPayWay', selectedPayWay)
  }

  protected payWayExtraCost(payWay: PayWayModel): string {
    if (payWay.free_for_order_amount < this.cartTotalPrice) {
      return '(<span class="checkout-pay_way-cost-free green">Free</span>)'
    }
    return '(+' + payWay.cost + '€ per shipment)'
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Checkout/CheckoutPayWays"

</style>
