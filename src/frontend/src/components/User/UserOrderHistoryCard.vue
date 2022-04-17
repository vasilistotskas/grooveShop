<template>
  <RouterLink
    v-if="product && Object.keys(product).length > 0"
    :title="product.name"
    :to="'/product' + product.absolute_url"
    aria-label="Product"
  >
    <span>
      <img
        :alt="product.name"
        :src="mediaStreamImage(ImageTypeOptions.PRODUCTS, product.main_image_filename, '75', '75')"
        class="border-radius-img img-fluid"
        height="75"
        width="75"
        loading="lazy"
      >
    </span>
    <span>{{ product.name }}</span>
    <span>${{ product.price }}</span>
    <span>{{ orderTotal }}</span>
    <span>${{ orderTotal.toFixed(2) }}</span>
  </RouterLink>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ProductModel from '@/state/product/ProductModel'
import Pagination from '@/components/Pagination/Pagination.vue'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Options({
  name: 'UserOrderHistoryCard',
  components: {
    Pagination
  },
  props: {
    product: Object,
    orderTotal: Number,
    quantity: Number
  }
})

export default class UserOrderHistoryCard extends Vue  {

  product = new ProductModel()
  orderTotal = 0
  quantity = 0

  ImageTypeOptions = ImageTypeOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions

  imageUrl: string = ''

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

</style>