<template>
  <button class="btn-outline-primary-three" data-mdb-ripple-color="dark" title="Favourite Actions" type="button"
          @click="favouriteHandle()">
    <font-awesome-icon v-if="!isFavourite" :icon="heartIcon" size="2x"/>
    <font-awesome-icon v-else :icon="heartIcon" :style="{ color: '#981d1dc9' }" size="2x"/>
  </button>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import ProductModel from '@/state/product/ProductModel'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'

@Options({
  name: 'ProductFavouriteButton',
  props: {
    product: Object
  }
})
export default class ProductFavouriteButton extends Vue {

  product = new ProductModel()

  heartIcon = faHeart

  get isFavourite(): boolean {
    return store.getters['product/favourite/getStateIsCurrentProductInFavourites']
  }

  async favouriteHandle(): Promise<void> {
    await store.dispatch('product/favourite/toggleFavourite', this.product)
  }

}

</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Product/ProductCard"

</style>
