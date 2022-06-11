<template>
  <div
    v-if="item && Object.keys(item).length > 0"
    class="checkout-product-card-container"
  >
    <div class="checkout-grid-head-part-two-product-image">
      <RouterLink
        :title="item.product.name"
        :to="'/product' + item.product.absolute_url"
        aria-label="Product"
      >
        <span>
          <GrooveImage
            :alt="item.product.name"
            :file-name="item.product.main_image_filename"
            :use-media-stream="true"
            :img-type="ImageTypeOptions.PRODUCTS"
            :img-width="100"
            :img-height="100"
          />
        </span>
      </RouterLink>
    </div>
    <div class="checkout-grid-head-part-two-product-info">
      <RouterLink
        :title="item.product.name"
        :to="'/product' + item.product.absolute_url"
        aria-label="Product"
      >
        <span class="checkout-grid-head-part-two-product-info-name">{{ item.product.name }}</span>
      </RouterLink>
      <span class="checkout-grid-head-part-two-product-info-price">Item Price: ${{ item.product.price }}</span>
      <span class="checkout-grid-head-part-two-product-info-quantity">Qty: {{ item.quantity }}</span>
    </div>
    <div class="checkout-grid-head-part-two-product-total">
      <span>${{ itemTotal(item).toFixed(2) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options as Component, Vue } from 'vue-class-component'
import CartItemModel from '@/state/cart/CartItemModel'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import { ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Component({
  name: 'CheckoutProductCard',
  components: {
    GrooveImage
  },
  props: {
    item: Object
  }
})
export default class CheckoutProductCard extends Vue {

  item = new CartItemModel()
  ImageTypeOptions = ImageTypeOptions

  itemTotal(item: CartItemModel): number {
    return item.quantity * item.product.price
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Checkout/Checkout"

</style>
