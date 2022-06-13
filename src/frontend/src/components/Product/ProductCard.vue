<template>
  <div
    v-if="product && Object.keys(product).length > 0"
    class="product-card-main"
  >
    <RouterLink
      :title="product.name"
      :to="productPath"
      aria-label="Product"
    >
      <div class="card cardEffect">
        <div class="card-image-content">
          <GrooveImage
            v-if="product.main_image_filename"
            :alt="product.name"
            :file-name="product.main_image_filename"
            :use-media-stream="true"
            :img-type="ImageTypeOptions.PRODUCTS"
            :img-width="150"
            :img-height="150"
          />
        </div>
        <div class="card-body">
          <div class="card-title">
            <span v-if="product.name">{{ contentShorten(product.name) }}</span>
          </div>
          <div class="card-review-content">
            <div class="card-review-content-stars">
              <svg
                v-for="(star, i) of backgroundStars(product.review_average)"
                :key="i"
                aria-hidden="true"
                class="star star-background"
                data-icon="star"
                data-prefix="fas"
                focusable="false"
                role="img"
                viewBox="0 0 576 512"
                xmlns="http://www.w3.org/2000/svg"
                v-html="star"
              />
            </div>
            <div class="card-review-content-count">
              <span>({{ product.review_counter }})</span>
            </div>
          </div>
          <div class="card-text">
            <span class="card-text-price-from">
              from <span class="card-text-price-num">${{ product.price }}</span>
            </span>
          </div>
          <div class="card-footer">
            <a
              :class="{'disabled': disabled }"
              :title="`Add to cart - ${product.name}`"
              class="btn-outline-primary-one btn-product-card"
              href="#"
              type="button"
              @click.prevent="addToCart()"
            >{{ addToCartButtonText }}</a>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script lang="ts">

import store from '@/store'
import { constant, times } from 'lodash'
import { helpers } from '@/helpers/main'
import ProductModel from '@/state/product/ProductModel'
import { Options as Component, Vue } from 'vue-class-component'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import { ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

const starSvg = '<path data-v-558dc688="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg = '<path data-v-558dc688="" fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Component({
  name: 'ProductCard',
  components: {
    GrooveImage
  },
  props: {
    product: Object
  }
})

export default class ProductCard extends Vue {

  quantity = 1
  product = new ProductModel()

  ImageTypeOptions = ImageTypeOptions

  get disabled(): boolean {
    return this.product.active === 'False' || this.product.stock <= 0
  }

  get productPath(): string {
    return '/product' + this.product.absolute_url
  }

  get addToCartButtonText(): string {
    return (this.product.active === 'False' || this.product.stock <= 0) ? 'Out Of Stock' : 'Add To Cart'
  }

  public addToCart(): void {

    if (isNaN(this.quantity) || this.quantity < 1) {
      this.quantity = 1
    }

    const item = {
      product: this.product,
      quantity: this.quantity
    }

    store.commit('cart/addToCart', item)
  }

  public contentShorten(productName: any): string {
    return helpers.contentShorten(productName, 0, 50)
  }

  public isOddNumber(num: any) {
    return num % 2
  }

  public backgroundStars(productRate: any): string[] {
    const stars: string[] = times(productRate / 2, constant(starSvg)) as string[]

    if (this.isOddNumber(productRate)) {
      stars.push(starHalfSvg)
    }

    return stars
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Product/ProductCard"

</style>
