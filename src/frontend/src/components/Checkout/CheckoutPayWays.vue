<template v-if="validPayWays && Object.keys(validPayWays).length > 0">
  <div class="checkout-pay_way-container">
    <h2 class="checkout-pay_way-container-title">
      <span>Choose payment method</span>
    </h2>
    <div class="checkout-pay_way-section">
      <div v-for="payWay in validPayWays" :key="payWay.name" class="checkout-pay_way-content">
        <input
          :id="payWay.name"
          v-model="selectedPayWay"
          name="payway"
          :value="payWay.name"
          type="radio"
          class="checkout-pay_way-input"
          @click="managePayWayClick(payWay)"
          @change="setSelectedPayWay(payWay)"
        />
        <label class="checkout-pay_way-input-label" :for="payWay.name">
          <span class="checkout-pay_way-icon">
            <LottiePlayerMain :animation-data="getPayWayLottie(payWay.name)" :loop="true" />
          </span>
          <span class="checkout-pay_way-name">{{ payWay.name }}</span>
          <span class="checkout-pay_way-cost" v-html="payWayExtraCost(payWay)" />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { Emitter, EventType } from 'mitt'
import { defineComponent, inject, watch } from 'vue'
import PayWayModel from '@/state/payway/PayWayModel'
import { PayWaysEnum } from '@/state/payway/Enum/PayWaysEnum'
import * as credit_card_lottie from '@/assets/lotties/credit_card.json'
import LottiePlayerMain from '@/components/Utilities/LottiePlayerMain.vue'
import * as pay_on_delivery_lottie from '@/assets/lotties/pay_on_delivery.json'

export default defineComponent({
  name: 'CheckoutPayWays',
  components: {
    LottiePlayerMain,
  },
  props: {
    cartTotalPrice: {
      type: Number,
      required: true,
    },
    cartTotalPriceForPayWay: {
      type: Number,
      required: true,
    },
  },
  async setup(props) {
    const store = useStore()
    const emitter: Emitter<Record<EventType, unknown>> | undefined = inject('emitter')

    let selectedPayWay = ''
    const getSelectedPayWayName = () => store.getters['pay_way/getSelectedPayWayName']
    watch(getSelectedPayWayName, (to: PayWaysEnum) => {
      selectedPayWay = to
    })

    const validPayWays: Array<PayWayModel> = await store.dispatch('pay_way/fetchActivePayWaysFromRemote')
    const getPayWayLottie = (payWayName: PayWayModel['name']): object => {
      switch (payWayName) {
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
    const setSelectedPayWay = async (selectedPayWay: PayWayModel): Promise<void> => {
      await store.dispatch('cart/cartTotalPriceForPayWayAction', selectedPayWay)
      store.commit('pay_way/setSelectedPayWay', selectedPayWay)
    }
    const managePayWayClick = (selectedPayWay: PayWayModel): void => {
      if (selectedPayWay.name === PayWaysEnum.CREDIT_CARD) {
        emitter?.emit('modal-open')
      }
    }
    const payWayExtraCost = (payWay: PayWayModel): string => {
      if (payWay.free_for_order_amount < props.cartTotalPrice) {
        return '(<span class="checkout-pay_way-cost-free green">Free</span>)'
      }
      return '(+' + payWay.cost + '€ per shipment)'
    }

    return {
      validPayWays,
      selectedPayWay,
      managePayWayClick,
      setSelectedPayWay,
      getPayWayLottie,
      payWayExtraCost,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Checkout/CheckoutPayWays';
</style>
