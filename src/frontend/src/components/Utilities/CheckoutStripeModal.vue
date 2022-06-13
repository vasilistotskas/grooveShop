<template>
  <div :class="`cp-utilities-generic_modal-wrapper ${isModalCurrentlyOpen ? 'open' : 'closed'}`">
    <div
      class="cp-utilities-generic_modal-overlay"
      @click="closeModal"
    >
      <svg
        class="cp-utilities-generic_modal-overlay-static"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter :id="getMyId">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="1"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          :filter="`url(#${getMyId})`"
        />
      </svg>
      <button
        :style="`color: ${closeBtnColor}`"
        class="cp-utilities-generic_modal-overlay-close"
        aria-label="Close"
        @click="closeModal"
      >
        <font-awesome-icon
          :icon="getExitModalIcon"
          size="2x"
        />
      </button>
    </div>
    <div class="cp-utilities-generic_modal">
      <div class="cp-utilities-generic_modal-header">
        <slot name="header" />
      </div>
      <div class="cp-utilities-generic_modal-body">
        <slot />
      </div>
      <div class="cp-utilities-generic_modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import PayWayModel from '@/state/payway/PayWayModel'
import { Options as Component } from 'vue-class-component'
import GenericModalModel from '@/components/Utilities/Model/GenericModalModel'

@Component({
  name: 'CheckoutStripeModal',
  extends: GenericModalModel
})
export default class CheckoutStripeModal extends GenericModalModel {

  closeModal(): void {
    store.commit('pay_way/setSelectedPayWay', new PayWayModel())
    this.isModalCurrentlyOpen = false
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Utilities/CheckoutStripeModal"

</style>
