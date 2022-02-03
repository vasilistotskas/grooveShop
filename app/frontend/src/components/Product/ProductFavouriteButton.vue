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
import ProductModel from '@/store/product/ProductModel'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'

@Options({
  name: 'ProductFavouriteButton',
  props: {
    product: Object
  }
})
export default class ProductFavouriteButton extends Vue {

  product = new ProductModel()

  heartIcon: IconDefinition = faHeart

  get isFavourite(): ProductModel {
    return store.getters['product/favourite/getstoreIsCurrentProductInFavourites']
  }

  async favouriteHandle(): Promise<void> {
    await store.dispatch('product/favourite/toggleFavourite', this.product)
  }

}

</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Product/ProductCard"

</style>
