<template>
  <div class="container min-height-container mt-7">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div
      v-if="product && Object.keys(product).length > 0"
      class="product-page-grid-container mb-5"
    >
      <div class="product-page-grid-image">
        <figure
          v-for="image in product.images"
          :key="image.id"
          :class="{'image-main': image.is_main }"
          class="image"
        >
          <GrooveImage
            :alt="product.name"
            :file-name="image.product_image_filename"
            :use-media-stream="true"
            :img-type="ImageTypeOptions.PRODUCTS"
            :img-width="330"
            :img-height="420"
          />
        </figure>
      </div>
      <div class="product-page-grid-right">
        <div class="product-page-grid-info-part-one">
          <div class="product-page-grid-info">
            <h1 class="title mb-2">
              {{ product.name }}
            </h1>
            <h5 class="mb-4">
              <strong>Product ID: </strong>
              <span>{{ product.id }}</span>
            </h5>
            <!-- Product Review -->
            <p
              class="description mb-4"
              v-html="product.description"
            />
          </div>

          <div class="product-page-grid-price mb-4">
            <p class="mb-2 product-page-grid-price-save">
              <strong>Product Save Percent: </strong>
              <span>{{ product.price_save_percent }}%</span>
            </p>
            <p class="mb-2 product-page-grid-price-starting">
              <strong>Starting Price: </strong>
              <span>${{ product.price }}</span>
            </p>
            <p class="product-page-grid-price-final">
              <strong>Final Price: </strong>
              <span>${{ product.final_price }}</span>
            </p>
          </div>

          <div class="product-page-information mb-4">
            <div
              v-if="product.stock > 0"
              class="product-page-information-availability"
            >
              <font-awesome-icon
                :icon="cubesIcon"
                :style="{ color: '#53e24aeb' }"
                size="lg"
              />
              <span>Immediately available</span>
            </div>
            <div
              v-else
              class="product-page-information-availability unavailable"
            >
              <font-awesome-icon
                :icon="warningTriangleIcon"
                :style="{ color: '#FD0002e0' }"
                size="lg"
              />
              <span>Out of stock</span>
            </div>
            <div class="product-page-information-delivery">
              <font-awesome-icon
                :icon="truckPickupIcon"
                :style="{ color: '#1f8dfd' }"
                size="lg"
              />
              <span>Instant delivery</span>
            </div>
          </div>

          <div class="product-page-grid-buttons">
            <input
              v-model="quantity"
              class="input"
              min="1"
              type="number"
            >
            <button
              :class="{'disabled': disabled }"
              :title="`Add to cart ${product.name}`"
              class="btn-outline-primary-one addToCartButton"
              type="button"
              @click="addToCart()"
            >
              <font-awesome-icon
                :icon="shopingBagIcon"
                :style="{ color: '#53e24aeb' }"
                size="lg"
              />
              <span>{{ addToCartButtonText }}</span>
            </button>
            <FavouriteButton 
              :model="product" 
              :getter-type="'product/favourite/getIsCurrentProductInUserFavourites'"
              :dispatch-type="'product/favourite/toggleFavourite'"
              :use-store="true"
            />
          </div>
        </div>
        <div class="product-page-grid-info-part-two">
          <div class="product-page-grid-modal">
            <ProductReview />
          </div>
        </div>
      </div>
    </div>
  </div>
  <ProductReviews
    v-if="product.id"
    :product="product"
  />
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import ProductModel from '@/state/product/ProductModel'
import { Options as Component, Vue } from 'vue-class-component'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import ProductReview from '@/components/Product/ProductReview.vue'
import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes'
import ProductReviews from '@/components/Product/ProductReviews.vue'
import { ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'
import FavouriteButton from '@/components/Utilities/FavouriteButton.vue'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons/faShoppingBag'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import { faShippingFast } from '@fortawesome/free-solid-svg-icons/faShippingFast'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'

const starSvg = '<path data-v-558dc688="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg = '<path data-v-558dc688="" fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Component({
  name: 'Product',
  components: {
    FavouriteButton,
    ProductReview,
    ProductReviews,
    Breadcrumbs,
    GrooveImage
  },
  props: {
    category_slug: {
      type: String
    },
    product_slug: {
      type: String
    }
  }
})

export default class Product extends Vue {

  quantity = 1

  cubesIcon = faCubes
  shopingBagIcon = faShoppingBag
  truckPickupIcon = faShippingFast
  warningTriangleIcon = faExclamationTriangle

  ImageTypeOptions = ImageTypeOptions

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get product(): ProductModel {
    return store.getters['product/getProductData']
  }

  get addToCartButtonText(): string {
    return store.getters['product/addToCartButtonText']
  }

  get disabled(): boolean {
    return this.product.active === 'False' || this.product.stock <= 0
  }

  async created(): Promise<void> {

    document.title = <string>this.$route.params.product_slug

    await Promise.all([
      await store.dispatch('product/fetchProductFromRemote'),
      store.dispatch('product/updateProductHits'),

      store.dispatch('app/updateMetaTagElement', {
        'metaName': 'description',
        'metaAttribute': 'content',
        'newValue': this.product.description
      })
    ])
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

}

</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Product/Product"

</style>
