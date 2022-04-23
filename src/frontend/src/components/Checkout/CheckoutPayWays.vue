<template v-if="validPayWays && Object.keys(validPayWays).length > 0">
  <div class="checkout-pay_way-container">
    <h2 class="checkout-pay_way-container-title">
      <span>Choose payment method</span>
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
          @click="managePayWayClick(payWay)"
          @change="setSelectedPayWay(payWay)"
        >
        <label
          class="checkout-pay_way-input-label"
          :for="payWay.name"
        >
          <span class="checkout-pay_way-icon">
            <LottiePlayerMain
              class="about_fedra_world-lottie"
              :animation-data="getPayWayLottie(payWay.name)"
              :loop="true"
            />
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
import { inject } from 'vue'
import { Emitter } from 'mitt'
import { Options, Vue } from 'vue-class-component'
import PayWayModel from '@/state/payway/PayWayModel'
import { PayWaysEnum } from '@/state/payway/Enum/PayWaysEnum'
import * as credit_card_lottie from '@/assets/lotties/credit_card.json'
import LottiePlayerMain from '@/components/Utilities/LottiePlayerMain.vue'
import * as pay_on_delivery_lottie from '@/assets/lotties/pay_on_delivery.json'

@Options({
  name: 'CheckoutPayWays',
  components: {
    LottiePlayerMain
  },
  props: {
    cartTotalPrice: Number,
    cartTotalPriceForPayWay: Number
  }
})
export default class CheckoutPayWays extends Vue {

  emitter: Emitter<any> | undefined = inject('emitter')
  PayWaysEnum = PayWaysEnum
  selectedPayWay: string = ''
  cartTotalPrice: number = 0
  cartTotalPriceForPayWay: number = 0

  async created(): Promise<void> {
    await store.dispatch('pay_way/fetchActivePayWaysFromRemote')

    this.$watch(
        () => this.getSelectedPayWayName,
        (to: any) => {
          this.selectedPayWay = to
        }
    )
  }

  get validPayWays(): Array<PayWayModel> {
    return store.getters['pay_way/getActivePayWays']
  }

  get getSelectedPayWayName(): PayWayModel['name'] {
    return store.getters['pay_way/getSelectedPayWayName']
  }

  public lottieReplay(): void {
    this.emitter!.emit('lottie-replay')
  }

  public getPayWayLottie(payWayName: PayWayModel['name']): object {
    switch(payWayName) {
      case PayWaysEnum.CREDIT_CARD: {
        return credit_card_lottie
      }
      case PayWaysEnum.PAY_ON_DELIVERY: {
        return pay_on_delivery_lottie
      }
      default: {
        return credit_card_lottie
      }
    }
  }

  protected setSelectedPayWay(selectedPayWay: PayWayModel): void {
    store.dispatch('cart/cartTotalPriceForPayWayAction', selectedPayWay)
    store.commit('pay_way/setSelectedPayWay', selectedPayWay)
  }

  protected managePayWayClick(selectedPayWay: PayWayModel): void {
    if (selectedPayWay.name === PayWaysEnum.CREDIT_CARD) {
      this.emitter!.emit('modal-open')
    }
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
