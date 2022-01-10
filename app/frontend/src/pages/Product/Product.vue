<template>
  <div class="container min-height-container mt-7">
    <Breadcrumbs :breadCrumbPath="breadCrumbPath"></Breadcrumbs>
    <div class="product-page-grid-container mb-5" v-if="product && Object.keys(product).length > 0">
        <div class="product-page-grid-image">
          <figure
                  v-for="image in product.images"
                  :key="image.id"
                  class="image"
                  v-bind:class="{'image-main': image.is_main }">
            <img class="img-fluid" v-bind:src="axiosBaseUrl + image.image">
          </figure>
        </div>
        <div class="product-page-grid-right">
          <div class="product-page-grid-info-part-one">
            <div class="product-page-grid-info">
              <h1 class="title mb-2">{{ product.name }}</h1>
              <h5 class="mb-2"><strong>Product ID: </strong>{{ product.id }}</h5>
              <!-- Product Review -->
              <p class="description mb-2" v-html="product.description"></p>
            </div>

            <div class="product-page-grid-price">
              <p class="mb-2"><strong>Price: </strong>${{ product.price }}</p>

              <p class="mb-2"><strong>Discount Percent: </strong>{{ product.discount_percent }}%</p>
              <p class="mb-2"><strong>Discount Value: </strong>${{ product.discount_value }}</p>

              <p class="mb-2"><strong>Vat Percent: </strong>{{ product.vat_percent }}%</p>
              <p class="mb-4"><strong>Vat Value: </strong>${{ product.vat_value }}</p>

              <p><strong>Final Price: </strong>${{ product.final_price }}</p>
            </div>
            <div class="product-page-grid-buttons">
                <input type="number" class="input" min="1" v-model="quantity">
                <button type="button" class="btn-outline-primary-one addToCartButton" v-bind:class="{'disabled': disabled }" @click="addToCart()">{{ addToCartButtonText }}</button>
                <FavouriteButton :product="product"></FavouriteButton>
            </div>
          </div>
          <div class="product-page-grid-info-part-two">
            <div class="product-page-grid-modal">
              <ProductReviewModal></ProductReviewModal>
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
               aria-hidden="true"
               focusable="false"
               data-prefix="fas"
               data-icon="star"
               role="img"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 576 512"
               :key="i"
               class="star star-background"
               v-html="star"></svg>
          <span class="product-reviews-average-count">({{ productReviewsAverage }}/10)</span>
        </span>
        <span class="product-reviews-average-total">Total Reviews :
          <span>{{ productReviewsCounter }}</span>
        </span>
      </div>
    </div>
    <div class="container-small">
      <div class="product-page-grid-review" id="reviews-container" v-if="productReviewResults && Object.keys(productReviewResults).length > 0">
        <div class="product-reviews-grid">
          <ProductReviewCard
              v-if="userToProductReview && Object.keys(userToProductReview).length > 0"
              v-bind:key="userToProductReview.id"
              v-bind:review="userToProductReview"
              v-bind:userId="userId"
              v-bind:class="{'current-user-review-card': userToProductReview.user_id == userId }"
              class="product-review-main-card"/>

          <ProductReviewCard
              v-for="review in productReviewResults"
              v-bind:key="review.id"
              v-bind:review="review"
              v-bind:userId="userId"
              v-bind:class="{'current-user-review-card': review.user_id == userId }"
              class="product-review-main-card"/>
        </div>
        <Pagination
            v-if="Object.keys(productReviewResults).length !== 0"
            :total-pages="productReviewResultsTotalPages"
            :max-visible-buttons="3"
            :route="'Product'"
            :endpointUrl="buildEndPointUrlForPaginatedResults()"
            :routerReplace="false"
            @pagechanged="onPageChange"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from "@/routes"
import { Options, Vue } from "vue-class-component"
import ProductModel from "@/state/product/ProductModel"
import Pagination from "@/components/Pagination/Pagination.vue"
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import FavouriteButton from '@/components/Product/FavouriteButton.vue'
import ProductReviewModal from '@/modals/Product/ProductReviewModal.vue'
import ProductReviewCard from '@/components/Reviews/ProductReviewCard.vue'
import ProductReviewModel from "@/state/product/review/ProductReviewModel";
import {constant, times} from "lodash";

const starSvg = '<path data-v-558dc688="" fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg = '<path data-v-558dc688="" fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Options({
  name: "ProductVue",
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


  async created(): Promise<void> {

    document.title = <string>this.$route.params.product_slug

    await Promise.all([
      await store.dispatch('product/productFromRemote'),
      store.dispatch('product/updateProductHits'),

      this.fetchProductReviews(),

      store.commit('product/review/setProductReviewsAverage', this.product.review_average),
      store.commit('product/review/setProductReviewsCounter', this.product.review_counter),
      await store.dispatch('app/updateMetaTagElement', {'metaName' : 'description', 'metaAttribute': 'content', 'newValue' : this.product.description})
    ])

  }

  async unmounted(): Promise<void>{
    store.commit('pagination/unsetResults')
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
    return `reviews/product/${product_id}`
  }

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

  onPageChange(page: any) {
    this.currentPage = page
  }

  get productReviewsAverage(): Number {
    return store.getters['product/review/getProductReviewsAverage']
  }

  get productReviewsCounter(): Number {
    return store.getters['product/review/getProductReviewsCounter']
  }

  get addToCartButtonText(): string {
    return store.getters['product/addToCartButtonText']
  }

  get disabled(): boolean {
    return this.product.active === "False" || this.product.stock <= 0
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
    return num % 2;
  }

  public backgroundStars(productRate: any): string[] {
    const stars: string[] = times(productRate/2, constant(starSvg)) as string[]

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
        color: $primary-color-5;
        font-weight: 500;
        padding-left: 10px;
      }
      &-total {
        span {
          font-size: 18px;
          color: $primary-color-5;
          font-weight: 500;
        }
      }
    }
  }
  .product-reviews-stats {
    background-color: $primary-color-7;
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
    grid-template-columns: repeat(2,1fr);
    gap: 25px;
  }
  .product-page-grid-image{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: minmax(90px, 1fr);
    gap: 20px;
    background-color: $primary-color-7;
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
    @media screen and (max-width: 767px){
      margin-bottom: 20px;
    }
  }
  .product-page-grid-right {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 30px;
    border-radius: 5px;
    .product-page-grid-info-part {
      &-one, &-two {
        border-radius: 5px;
        background-color: $primary-color-7;
      }
      &-one {
        padding: 30px 30px 15px;
      }
      &-two {
        padding: 15px 30px 30px;
      }
    }
  }

  .product-page-grid-price {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .product-page-grid-buttons {
    max-width: 330px;
    display: grid;
    grid-template-columns: 20% 62% 18%;
    gap: 15px;
    input {
      color: $primary-color-2;
      background-color: $primary-color-4;
      margin-left: 0;
      text-align: center;
      align-self: center;
      justify-self: center;
      border: 1px solid $primary-color-4;
      border-radius: 5px;
      height: 100%;
      width: 100%;
    }
  }
  .addToCartButton{
    &.disabled{
      background-color: $primary-color-3;
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
    background-color: $primary-color-4;
  }
  .product-reviews-grid {
    display: grid;
    gap: 15px;
    grid-template-rows: repeat(1, 1fr);
  }
</style>
