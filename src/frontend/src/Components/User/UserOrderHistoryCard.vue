<template>
  <RouterLink
    v-if="product && Object.keys(product).length > 0"
    :title="product.name"
    :to="'/Product' + product.absolute_url"
    aria-label="Product"
  >
    <span>
      <GrooveImage
        :alt="product.name"
        :file-name="product.main_image_filename"
        :use-media-stream="true"
        :class="'border-radius-img img-fluid'"
        :img-type="ImageTypeOptions.PRODUCTS"
        :img-width="75"
        :img-height="75"
      />
    </span>
    <span>{{ product.name }}</span>
    <span>${{ product.price }}</span>
    <span>{{ quantity }}</span>
    <span>${{ orderTotal.toFixed(2) }}</span>
  </RouterLink>
</template>

<script lang="ts">
import { PropType } from 'vue'
import ProductModel from '@/State/Product/ProductModel'
import { Options as Component, Vue } from 'vue-class-component'
import Pagination from '@/Components/Pagination/Pagination.vue'
import GrooveImage from '@/Components/Utilities/GrooveImage.vue'
import { ImageTypeOptions } from '@/Helpers/MediaStream/ImageUrlEnum'

@Component({
  name: 'UserOrderHistoryCard',
  components: {
    Pagination,
    GrooveImage,
  },
  props: {
    product: Object as PropType<ProductModel>,
    orderTotal: Number,
    quantity: Number,
  },
})
export default class UserOrderHistoryCard extends Vue {
  product = new ProductModel()
  orderTotal = 0
  quantity = 0

  ImageTypeOptions = ImageTypeOptions
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/User/UserOrderHistory';
</style>
