<template>
  <div class="container min-height-container mt-7">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath"/>
    <div v-if="product && Object.keys(product).length > 0" class="product-page-grid-container mb-5">
      <div class="product-page-grid-image">
        <figure
            v-for="image in product.images"
            :key="image.id"
            :class="{'image-main': image.is_main }"
            class="image"
        >
          <img :src="mediaStreamImage('products', image.product_image_filename, '330', '420')" alt="Product Image"
               class="img-fluid"
          />
        </figure>
      </div>
      <div class="product-page-grid-right">
        <div class="product-page-grid-info-part-one">
          <div class="product-page-grid-info">
            <h1 class="title mb-2">{{ product.name }}</h1>
            <h5 class="mb-4">
              <strong>Product ID: </strong>
              <span>{{ product.id }}</span>
            </h5>
            <!-- Product Review -->
            <p class="description mb-4" v-html="product.description"></p>
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
            <div v-if="product.stock > 0" class="product-page-information-availability">
              <font-awesome-icon :icon="cubesIcon" :style="{ color: '#53e24aeb' }" size="lg"/>
              <span>Immediately available</span>
            </div>
            <div v-else class="product-page-information-availability unavailable">
              <font-awesome-icon :icon="warningTriangleIcon" :style="{ color: '#FD0002e0' }" size="lg"/>
              <span>Out of stock</span>
            </div>
            <div class="product-page-information-delivery">
              <font-awesome-icon :icon="truckPickupIcon" :style="{ color: '#1f8dfd' }" size="lg"/>
              <span>Instant delivery</span>
            </div>
          </div>

          <div class="product-page-grid-buttons">
            <input v-model="quantity" class="input" min="1" type="number"/>
            <button :class="{'disabled': disabled }" :title="`Add to cart ${product.name}`" class="btn-outline-primary-one addToCartButton"
                    type="button"
                    @click="addToCart()"
            >
              <font-awesome-icon :icon="shopingBagIcon" :style="{ color: '#53e24aeb' }" size="lg"/>
              <span>{{ addToCartButtonText }}</span>
            </button>
            <FavouriteButton :product="product"/>
          </div>
        </div>
        <div class="product-page-grid-info-part-two">
          <div class="product-page-grid-modal">
            <ProductReviewModal/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Component must be -->
  <div class="product-reviews-container">
    <div class="product-reviews-stats">
      <div class="container-small product-reviews-stats-container">
        <span class="product-reviews-title">
          <span class="content">Reviews</span>
        </span>
        <span class="product-reviews-average">
          <span class="product-reviews-average-title">Review Average</span>
          <span class="product-reviews-average-stars"></span>
          <svg v-for="(star, i) of backgroundStars(productReviewsAverage)"
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
          <span class="product-reviews-average-count">({{ productReviewsAverage }}/10)</span>
        </span>
        <span class="product-reviews-average-total">Total Reviews :
          <span>{{ productReviewsCounter }}</span>
        </span>
      </div>
    </div>
    <div class="container-small">
      <div v-if="productReviewResults && Object.keys(productReviewResults).length > 0" id="reviews-container"
           class="product-page-grid-review"
      >
        <div class="product-reviews-grid">
          <ProductReviewCard
              v-if="userToProductReview && Object.keys(userToProductReview).length > 0"
              :key="userToProductReview.id"
              :class="{'current-user-review-card': userToProductReview.user_id == userId }"
              :review="userToProductReview"
              :user-id="userId"
              class="product-review-main-card"
          />

          <ProductReviewCard
              v-for="review in productReviewResults"
              :key="review.id"
              :class="{'current-user-review-card': review.user_id == userId }"
              :review="review"
              :user-id="userId"
              class="product-review-main-card"
          />
        </div>
        <Pagination
            v-if="Object.keys(productReviewResults).length !== 0"
            :endpoint-url="buildEndPointUrlForPaginatedResults()"
            :max-visible-buttons="3"
            :route="'Product'"
            :router-replace="false"
            :total-pages="productReviewResultsTotalPages"
            @pagechanged="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { constant, times } from 'lodash'
import { Options, Vue } from 'vue-class-component'
import ProductModel from '@/state/product/ProductModel'
import Pagination from '@/components/Pagination/Pagination.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes'
import FavouriteButton from '@/components/Product/FavouriteButton.vue'
import ProductReviewModal from '@/modals/Product/ProductReviewModal.vue'
import ProductReviewCard from '@/components/Reviews/ProductReviewCard.vue'
import ProductReviewModel from '@/state/product/review/ProductReviewModel'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons/faShoppingBag'
import { faShippingFast } from '@fortawesome/free-solid-svg-icons/faShippingFast'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'

const starSvg = '<path data-v-558dc688="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg = '<path data-v-558dc688="" fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Options({
  name: 'ProductVue',
  components: {
    FavouriteButton,
    ProductReviewModal,
    Breadcrumbs,
    ProductReviewCard,
    Pagination
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

export default class ProductVue extends Vue {

  quantity = 1
  uri = window.location.search.substring(1)
  currentPage: number = 1
  params = new URLSearchParams(this.uri)

  cubesIcon: IconDefinition = faCubes
  shopingBagIcon: IconDefinition = faShoppingBag
  truckPickupIcon: IconDefinition = faShippingFast
  warningTriangleIcon: IconDefinition = faExclamationTriangle

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get userId(): number {
    return store.getters['user/data/getUserId']
  }

  get axiosBaseUrl(): boolean {
    return store.getters['app/axiosBaseUrl']
  }

  get product(): ProductModel {
    return store.getters['product/getProductData']
  }

  get userToProductReview(): ProductReviewModel {
    return store.getters['product/review/getUserToProductReview']
  }

  get currentPageQuery(): string {
    return store.getters['pagination/getCurrentQuery']
  }

  get productReviewResults(): ProductModel {
    return store.getters['pagination/getResultData']
  }

  get productReviewResultsCount(): number {
    return store.getters['pagination/getResultCountData']
  }

  get productReviewResultsNextPageUrl(): string {
    return store.getters['pagination/getResultNextPageUrl']
  }

  get productReviewResultsPreviousPageUrl(): string {
    return store.getters['pagination/getResultPreviousPageUrl']
  }

  get productReviewResultsTotalPages(): number {
    return store.getters['pagination/getResultTotalPages']
  }

  get productReviewsAverage(): number {
    return store.getters['product/review/getProductReviewsAverage']
  }

  get productReviewsCounter(): number {
    return store.getters['product/review/getProductReviewsCounter']
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
      await store.dispatch('product/productFromRemote'),
      store.dispatch('product/updateProductHits'),

      this.fetchProductReviews(),

      store.commit('product/review/setProductReviewsAverage', this.product.review_average),
      store.commit('product/review/setProductReviewsCounter', this.product.review_counter),
      await store.dispatch('app/updateMetaTagElement', {
        'metaName': 'description',
        'metaAttribute': 'content',
        'newValue': this.product.description
      })
    ])

  }

  async unmounted(): Promise<void> {
    store.commit('pagination/unsetResults')
  }

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/'
    const imageNameFileTypeRemove = imageName.substring(0, imageName.lastIndexOf('.')) || imageName
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/' + imageNameFileTypeRemove + '/' + width + '/' + height
  }

  public fetchProductReviews(): void {
    store.dispatch('pagination/getPaginatedResults', {
      'endpointUrl': this.buildEndPointUrlForPaginatedResults(),
      'query': this.currentPageQuery,
      'method': 'GET'
    })
  }

  public buildEndPointUrlForPaginatedResults(): string {
    const product_id: number = store.getters['product/getProductId']
    return `reviews/product/${ product_id }`
  }

  onPageChange(page: any) {
    this.currentPage = page
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
.product-reviews-stats-container {
  display: grid;
  gap: 10px;

  .product-reviews-title {
    span {
      font-size: 26px;
      font-weight: 500;
    }
  }

  .product-reviews-average {
    display: flex;

    &-title {
      padding-right: 15px;
    }

    &-stars {

    }

    &-count {
      font-size: 18px;
      color: var(--cp-palette-main-fifth);
      font-weight: 500;
      padding-left: 10px;
    }

    &-total {
      span {
        font-size: 18px;
        color: var(--cp-palette-main-fifth);
        font-weight: 500;
      }
    }
  }
}

.product-reviews-stats {
  background-color: var(--cp-palette-main-secondary);

  .product-reviews-average {
    .star {
      width: 18px;
      height: 18px;

      &-background {
        color: $rating-starts;
      }
    }
  }
}

.current-user-review-card {
  border: 1px solid $rating-starts;
}

.product-page-grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.product-page-grid-image {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  box-shadow: 0 0 7px 0 rgb(153 153 153 / 40%);
  border: 1px solid var(--cp-palette-main-third);
  padding: 30px;
  border-radius: 5px;

  .image-main {
    grid-column: 1/4;
    grid-row: 1;

    img {
      display: block;
      margin: 0 auto;
    }
  }

  .image {
    &:not(&.image-main) {
      display: grid;
      align-self: center;
      justify-items: center;

      &:hover {
        cursor: pointer;

        img {
          border: 1px solid #b6b6b6;
        }
      }

      img {
        border: 1px solid var(--cp-palette-main-fifth);
        border-radius: 4px;
        padding: 2px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
  }
}

.product-page-grid-info {
  h5 {
    color: var(--cp-palette-main-fifth);
  }
}

.product-page-grid-right {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 30px;
  border-radius: 5px;

  .product-page-grid-info-part {
    &-one, &-two {
      border-radius: 5px;
      background-color: var(--cp-palette-main-fourth);
      box-shadow: 0 0 7px 0 rgb(153 153 153 / 40%);
    }

    &-one {
      border: 1px solid var(--cp-palette-main-third);
      padding: 30px 60px 30px;
    }

    &-two {
      border: 1px solid var(--cp-palette-main-third);
      padding: 15px 30px 30px;
    }
  }
}

.product-page-grid-price {
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  &-starting {
    span {
      text-decoration: line-through;
    }
  }

  &-save {
    font-size: 16px;
  }

  &-final {
    font-size: 22px;
  }
}

.product-page-grid-buttons {
  max-width: 330px;
  display: grid;
  grid-template-columns: 20% 62% 18%;
  gap: 15px;

  input {
    color: var(--cp-palette-main-fifth);
    background-color: var(--cp-palette-main-fourth);
    margin-left: 0;
    text-align: center;
    align-self: center;
    justify-self: center;
    border: 1px solid var(--cp-palette-main-third);
    border-radius: 5px;
    height: 100%;
    width: 100%;
  }
}

.addToCartButton {
  &.disabled {
    background-color: var(--cp-palette-main-third);
    border-color: transparent;
    box-shadow: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.container-small {
  padding-top: 15px;
  padding-bottom: 15px;
}

.product-reviews-container {
  background-color: var(--cp-palette-main-fourth);
}

.product-reviews-grid {
  display: grid;
  gap: 15px;
  grid-template-rows: repeat(1, 1fr);
}

.product-page-information {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;

  &-availability {
    display: flex;
    gap: 12px;

    &.unavailable {
      span {
        letter-spacing: 0.5px;
        color: var(--cp-palette-main-fifth);
        font-weight: 500;
        line-height: 22px;
      }
    }

    span {
      letter-spacing: 0.5px;
      color: var(--cp-palette-main-fifth);
      font-weight: 500;
      line-height: 22px;
    }
  }

  &-delivery {
    display: flex;
    gap: 12px;

    span {
      letter-spacing: 0.5px;
      color: var(--cp-palette-main-fifth);
      font-weight: 500;
      line-height: 22px;
    }
  }
}

.btn-outline-primary-one {
  span {
    color: var(--cp-palette-main-fifth);
    padding-left: 15px;
  }
}
</style>
