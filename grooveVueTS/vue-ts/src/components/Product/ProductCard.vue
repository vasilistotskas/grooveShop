<template>
  <div v-if="product && Object.keys(product).length > 0">
    <router-link v-bind:to="product.get_absolute_url" class="p-1">

      <div class="card" style="width: 18rem;">
        <img v-bind:src="product.main_image" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">${{ product.price }}</p>
          <a href="#" type="button" class="btn btn-dark" v-bind:class="{'disabled': disabled }" @click.prevent="addToCart()">{{ addToCartButtonText}}</a>
        </div>
      </div>

    </router-link>
  </div>

</template>

<script lang="ts">

import {Options} from "vue-class-component"
import AppBasePage from "@/pages/AppBasePage.vue"
import ProductModel from "@/state/product/ProductModel"
import store from '@/store'

@Options({
  name: "ProductCard",
  props: {
    product: Object
  }
})

export default class ProductCard extends AppBasePage {

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

  get disabled() {
    return this.product.active === "False" || this.product.stock <= 0
  }

  get addToCartButtonText(): string {
    return store.getters['product/addToCartButtonText']
  }

}
</script>

<style lang="scss">
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
