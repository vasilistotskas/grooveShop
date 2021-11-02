<template>
  <button type="button"  data-mdb-ripple-color="dark" class="btn btn-outline-danger col-12 col-md-4" @click="favouriteHandle()">
    <i :class=getFavouriteIconClass()></i>
  </button>
</template>


<script lang="ts">
import AppBasePage from '@/pages/AppBasePage.vue'
import { Options } from "vue-class-component"
import ProductModel from "@/state/product/ProductModel"
import store from '@/store'

@Options({
  name: "FavouriteButton",
  props: {
    product: Object
  }
})
export default class FavouriteButton extends AppBasePage {

  product = new ProductModel()

  get isFavourite(): ProductModel {
    // const productId = this.product.id
    return store.getters['user/favourite/getStateIsCurrentProductInFavourites']
  }

  async favouriteHandle(): Promise<void> {
    store.dispatch('user/favourite/toggleFavourite', this.product)
  }

  private getFavouriteIconClass(): string {
    return !this.isFavourite ? 'far fa-heart' : 'fas fa-heart'
  }

}

</script>

<style lang="scss">
.favourite-content{
  padding: 8px;
  background: #e4e4e4;
  .fa-heart{ font-size: 20px;
    &.fas{
      color: red;
    }
  }
}
</style>
