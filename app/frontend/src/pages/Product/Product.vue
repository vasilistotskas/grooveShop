<template>
  <div class="container mt-7" v-if="product && Object.keys(product).length > 0">
    <Breadcrumbs :routeParams="this.$route.params"></Breadcrumbs>
    <div class="product-page-grid-container mb-5">
        <div class="product-page-grid-image">
          <figure
                  v-for="image in product.images"
                  :key="image.id"
                  class="image"
                  v-bind:class="{'image-main': image.is_main }"
          >
            <img class="img-fluid" v-bind:src="axiosBaseUrl + image.image">
          </figure>
        </div>
        <div class="product-page-grid-right">
          <div class="product-page-grid-info-part-one">
            <div class="product-page-grid-info">
              <h1 class="title mb-1">{{ product.name }}</h1>
              <h5 class="mb-1"><strong>Product ID: </strong>{{ product.id }}</h5>
              <!-- Product Review -->
              <a type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal">Product Review</a>
              <p class="description">{{ product.description }}</p>
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
                <button type="button" class="btn btn-outline-primary addToCartButton col-12 col-md-8" v-bind:class="{'disabled': disabled }" @click="addToCart()">{{ addToCartButtonText }}</button>
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
  <div class="container-small">
    <div class="product-page-grid-review" id="reviews-container" v-if="productReviews && Object.keys(productReviews).length > 0">
      <div class="grid-item-two">
        <h5>REVIEW AVERAGE : {{ productReviewsAverage }}</h5>
        <h5>REVIEW COUNTER : {{ productReviewsCounter }}</h5>
      </div>
      <div class="grid-item-two">
        <h2 class="title section-title">
          <span class="content">Reviews</span>
        </h2>

        <ProductReviews
            v-for="review in productReviews"
            v-bind:key="review.id"
            v-bind:review="review"/>
      </div>
    </div>
  </div>


</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"
import ProductModel from "@/state/product/ProductModel"
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import ProductReviews from "@/components/Product/ProductReviews.vue"
import FavouriteButton from '@/components/Product/FavouriteButton.vue'
import ProductReviewModal from '@/modals/Product/ProductReviewModal.vue'

@Options({
  name: "ProductVue",
  components: {
    FavouriteButton,
    ProductReviewModal,
    ProductReviews,
    Breadcrumbs
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

  get axiosBaseUrl(): boolean {
    return store.getters['app/axiosBaseUrl']
  }

  get product(): ProductModel {
    return store.getters['product/getProductData']
  }

  get productReviews(): Array<any> {
    return store.getters['product/review/getProductReviews']
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

  async mounted(): Promise<void> {
    document.title = <string>this.$route.params.product_slug

    await Promise.all([

      await store.dispatch('product/productFromRemote'),
      store.dispatch('product/updateProductHits'),
      store.dispatch('product/review/currentProductReviewsFromRemote'),

      store.commit('product/review/setProductReviewsAverage', this.product.review_average),
      store.commit('product/review/setProductReviewsCounter', this.product.review_counter),
      await store.dispatch('app/updateMetaTagElement', {'metaName' : 'description', 'metaAttribute': 'content', 'newValue' : this.product.description})
    ])
  }
}

</script>

<style lang="scss" scoped>
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
    background-color: white;
    padding: 30px;
    border-radius: 5px;
    .image-main {
      grid-column: 1/4;
      grid-row: 1;
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
        background-color: white;
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
      color: black;
      background-color: white;
      margin-left: 0;
      text-align: center;
      align-self: center;
      justify-self: center;
      border: 1px solid #e8e8e8;
      border-radius: 5px;
      height: 100%;
      width: 100%;
    }
  }
  .addToCartButton{
    &.disabled{
      background-color: #363636;
      border-color: transparent;
      box-shadow: none;
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

</style>
