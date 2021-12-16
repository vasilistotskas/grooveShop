<template>

  <div class="container" v-if="favourites && Object.keys(favourites).length > 0">
    <div class="product-listing-grid">
      <ProductCard
          class="grid-item"
          v-for="product in favourites"
          v-bind:key="product.id"
          v-bind:product="product"/>
    </div>
  </div>
  <div v-else>
    <h1>NO FAVOURITES</h1>
  </div>

</template>

<script lang="ts">
import store from '@/store'
import {Options, Vue} from "vue-class-component"
import ProductModel from "../../state/product/ProductModel"
import ProductCard from "@/components/Product/ProductCard.vue"


@Options({
  name: "Favourites",
  components: {
    ProductCard
  }
})

export default class Favourites extends Vue{
  mounted(): void {
    document.title = 'My Orders | grooveShop'
  }
  get favourites(): ProductModel[] {
    return store.getters['product/favourite/getUserFavouriteData']
  }
}
</script>
