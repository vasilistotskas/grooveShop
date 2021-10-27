<template>
  <div>
    <router-link v-bind:to="product.get_absolute_url" class="p-1">

      <div class="card" style="width: 18rem;">
        <img v-bind:src="product.main_image" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">${{ product.price }}</p>
          <a href="#" class="btn btn-primary" v-bind:class="{'disabled': disabled }" @click.prevent="addToCart(product.id, product.price)">{{ addToCartButtonText}}</a>
        </div>
      </div>

    </router-link>
  </div>

</template>

<script lang="ts">

import {Options} from "vue-class-component";
import AppBasePage from "@/pages/AppBasePage.vue";
import Product from "@/state/product/Product";

@Options({
  name: "ProductCard",
  props: {
    product: Object
  }
})

export default class ProductCard extends AppBasePage {

  quantity = 1
  product = new Product()


  public addToCart(productId: number, productPrice: number) {
    console.log(this.product.id)

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

  get addToCartButtonText(): string {
    return this.$store.getters['product/addToCartButtonText']
  }

}
</script>

<style lang="scss" scoped>
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