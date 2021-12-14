<template>
  <div class="container mt-5" v-if="product && Object.keys(product).length > 0">
    <div class="row">
      <div class="col-md-9 page-product-image-col">
        <figure
                v-for="image in product.images"
                :key="image.id"
                class="image">
          <img class="img-fluid" v-bind:src="axiosBaseUrl + image.image">
        </figure>
      </div>

      <div class="col-md-3 text-dark">
        <h1 class="title mb-1">{{ product.name }}</h1>
        <h5 class="mb-1"><strong>Product ID: </strong>{{ product.id }}</h5>
        <!-- Product Review -->
        <a type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal">Product Review</a>
        <ProductReviewModal></ProductReviewModal>

        <p class="description mb-4">{{ product.description }}</p>
        <p class="mb-2"><strong>Price: </strong>${{ product.price }}</p>

        <p class="mb-2"><strong>Discount Percent: </strong>{{ product.discount_percent }}%</p>
        <p class="mb-2"><strong>Discount Value: </strong>${{ product.discount_value }}</p>

        <p class="mb-2"><strong>Vat Percent: </strong>{{ product.vat_percent }}%</p>
        <p class="mb-4"><strong>Vat Value: </strong>${{ product.vat_value }}</p>

        <p><strong>Total Price: </strong>${{ product.final_price }}</p>

        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantity">
          </div>

          <div class="row mt-2">
            <button type="button" class="btn btn-outline-primary addToCartButton col-12 col-md-8" v-bind:class="{'disabled': disabled }" @click="addToCart()">{{ addToCartButtonText }}</button>
            <FavouriteButton :product="product"></FavouriteButton>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div class="container" id="reviews-container" v-if="productReviews && Object.keys(productReviews).length > 0">
    <div class="row mt-5">
      <h5>REVIEW AVERAGE : {{ productReviewsAverage }}</h5>
      <h5>REVIEW COUNTER : {{ productReviewsCounter }}</h5>
    </div>
    <div class="row mt-5">
      <h2 class="title section-title">
        <span class="content">Reviews</span>
      </h2>

      <ProductReviews
          v-for="review in productReviews"
          v-bind:key="review.id"
          v-bind:review="review"/>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"
import ProductModel from "@/state/product/ProductModel"
import ProductReviews from "@/components/Product/ProductReviews.vue"
import FavouriteButton from '@/components/Product/FavouriteButton.vue'
import ProductReviewModal from '@/modals/Product/ProductReviewModal.vue'

@Options({
  name: "ProductVue",
  components: {
    FavouriteButton,
    ProductReviewModal,
    ProductReviews
  },
  props: {
    category_id: {
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
      store.commit('product/review/setProductReviewsCounter', this.product.review_counter)
    ])
  }
}

</script>

<style lang="scss" scoped>
  figure{
    img{
      max-width: 100%
    }
  }
  .page-product-image-col{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-column-gap: 0;
    grid-row-gap: 0;
    @media screen and (max-width: 767px){
      margin-bottom: 20px;
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
  #reviews-container{
    @media screen and (min-width: 1200px){
      max-width: 1070px;
    }
  }

</style>
