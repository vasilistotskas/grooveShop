<template>
  <button type="button"  data-mdb-ripple-color="dark" class="btn btn-outline-danger col-12 col-md-4" @click="favouriteHandle()">
    <i :class=favouriteIconClass()></i>
    <font-awesome-icon v-if="!this.isFavourite" size="2x" icon="heart" :style="{ color: 'white' }"></font-awesome-icon>
    <font-awesome-icon v-else size="2x" icon="heart" :style="{ color: 'red' }"></font-awesome-icon>
  </button>
</template>


<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"
import ProductModel from "@/state/product/ProductModel"

@Options({
  name: "FavouriteButton",
  props: {
    product: Object
  }
})
export default class FavouriteButton extends Vue {

  product = new ProductModel()

  get isFavourite(): ProductModel {
    // const productId = this.product.id
    return store.getters['product/favourite/getStateIsCurrentProductInFavourites']
  }

  async favouriteHandle(): Promise<void> {
    await store.dispatch('product/favourite/toggleFavourite', this.product)
  }

  private favouriteIconClass(): string {
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
