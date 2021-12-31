<template>
  <button type="button"  data-mdb-ripple-color="dark" class="btn-outline-primary-main" @click="favouriteHandle()">
    <i :class=favouriteIconClass()></i>
    <font-awesome-icon v-if="!this.isFavourite" size="2x" :icon="heartIcon" :style="{ color: 'white' }"></font-awesome-icon>
    <font-awesome-icon v-else size="2x" :icon="heartIcon" :style="{ color: '#f80000e0' }"></font-awesome-icon>
  </button>
</template>


<script lang="ts">
import store from '@/store'
import { Options, Vue } from "vue-class-component"
import ProductModel from "@/state/product/ProductModel"
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'

@Options({
  name: "FavouriteButton",
  props: {
    product: Object
  }
})
export default class FavouriteButton extends Vue {

  product = new ProductModel()

  get heartIcon(): typeof faHeart {
    return faHeart
  }

  get isFavourite(): ProductModel {
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

<style lang="scss" scoped>
.favourite-content{
  padding: 8px;
  background: #e4e4e4;
  .fa-heart{ font-size: 20px;
    &.fas{
      color: $primary-color-1;
    }
  }
}
</style>
