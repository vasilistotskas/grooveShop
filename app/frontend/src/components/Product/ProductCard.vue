<template>
  <div v-if="product && Object.keys(product).length > 0">
    <router-link :to="productPath" aria-label="Product">
      <div class="card cardEffect">
        <img :src="product.main_image" width="308" height="320" class="card-img-top img-fluid" :alt="product.name">
        <div class="card-body">
          <div class="card-title">
            <span>{{ product.name }}</span>
          </div>

          <div class="card-text">
            <p>${{ product.price }}</p>
          </div>
          <div class="card-footer">
            <a href="#" type="button" class="btn btn-product-card" v-bind:class="{'disabled': disabled }" @click.prevent="addToCart()">{{ addToCartButtonText }}</a>
          </div>
        </div>
      </div>

    </router-link>
  </div>

</template>

<script lang="ts">

import store from '@/store'
import {Options, Vue} from "vue-class-component"
import ProductModel from "@/state/product/ProductModel"

@Options({
  name: "ProductCard",
  props: {
    product: Object
  }
})

export default class ProductCard extends Vue {

  quantity = 1
  product = new ProductModel()

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

  get disabled(): boolean {
    return this.product.active === "False" || this.product.stock <= 0
  }

  get productPath(): string {
    return '/product' + this.product.absolute_url
  }

  get addToCartButtonText(): string {
    return (this.product.active === "False" || this.product.stock <= 0) ? 'Out Of Stock' : 'Add To Cart'
  }

}
</script>

<style lang="scss" scoped>
  .grid-item {
    a {
      position: relative;
      display: block;
    }
  }
  .image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
  .box{
    &:hover{
        box-shadow: rgb(0 0 0 / 20%) 0 3px 5px -1px, rgb(0 0 0 / 14%) 0 6px 10px 0, rgb(0 0 0 / 12%) 0 1px 18px 0;
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
