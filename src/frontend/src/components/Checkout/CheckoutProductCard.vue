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
          <img
            :alt="item.product.name"
            :src="mediaStreamImage(ImageTypeOptions.PRODUCTS, item.product.main_image_filename, '100', '100')"
            height="100"
            width="100"
            loading="lazy"
          >
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
import { Options, Vue } from 'vue-class-component'
import CartItemModel from '@/state/cart/CartItemModel'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Options({
  name: 'CheckoutProductCard',
  props: {
    item: Object
  }
})
export default class CheckoutProductCard extends Vue {

  item = new CartItemModel()
  imageUrl: string = ''
  ImageTypeOptions = ImageTypeOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions

  itemTotal(item: CartItemModel): number {
    return item.quantity * item.product.price
  }

  public mediaStreamImage(
      imageType: string,
      imageName: string,
      width?: string,
      height?: string,
      fit?: ImageFitOptions,
      position?: ImagePositionOptions,
      trimThreshold?: number
  ): string | (() => string) {
    const mediaStreamImageData: ImageUrlInterface = {
      'imageType': imageType,
      'imageName': imageName,
      'width': width,
      'height': height,
      'fit': fit,
      'position': position,
      'trimThreshold': trimThreshold
    }

    const imageModel = new ImageUrlModel(mediaStreamImageData)

    imageModel.buildMediaStreamImageUrl()
        .then((finalUrl: string) => {
          this.imageUrl = finalUrl
        })

    return this.imageUrl

  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Checkout/Checkout"

</style>
