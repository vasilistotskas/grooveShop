<template>
  <div class="page-product container mt-5" v-if="product && Object.keys(product).length > 0">
    <div class="row">
      <div class="col-md-9 page-product-image-col">
        <figure
            v-for="image in product.images"
            :key="image.id"
            class="image">
          <img v-bind:src="'http://127.0.0.1:8000' + image.image">
        </figure>
      </div>

      <div class="col-md-3">
        <h1 class="title mb-1">{{ product.name }}</h1>
        <h5 class="mb-1"><strong>Product ID: </strong>{{ product.id }}</h5>
        <!-- Product Review -->
        <a type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal">Product Review</a>
        <RateProductModal></RateProductModal>
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

          <button type="button" class="btn btn-dark addToCartButton" v-bind:class="{'disabled': disabled }" @click="addToCart(product.id, product.price)">Dark</button>


<!--          <FavouriteButton :product="product">-->

<!--          </FavouriteButton>-->
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import FavouriteButton from '@/components/Product/FavouriteButton'
// import RateProductModal from '@/modals/Product/RateProductModal'
import AppBasePage from '@/pages/AppBasePage.vue'
import { Options } from "vue-class-component";
import Product from "@/state/product/Product";

@Options({
  name: "Product",
  components: {
    // FavouriteButton,
    // RateProductModal
  }
})

export default class ProductVue extends AppBasePage {

  quantity = 1

  get product(): Product {
    return this.$store.getters['product/getProductData']
  }

  public addToCart(productId: number, productPrice: number) {

    if (isNaN(this.quantity) || this.quantity < 1) {
      this.quantity = 1
    }

    const item = {
      id: productId,
      quantity: this.quantity,
      price: productPrice
    }

    this.$store.commit('cart/addToCart', item)
  }


  async mounted(): Promise<void> {
    await this.$store.dispatch('product/getProduct')
    this.$store.dispatch('product/updateProductHits')
  }
}

</script>



<style lang="scss">
  .page-product-image-col{
    display: grid;
    grid-template-rows: auto;
    grid-gap: 1vw;
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
</style>