<template>
  <div class="home">
    <div class="container mt-3 mb-5">
      <div class="row">
        <div class="col-12 mb-5">
          <h2 class="is-size-2 has-text-centered">{{ $t('eshop.test3') }}</h2>
        </div>
        <ProductCard
            class="col-sm-3"
            v-for="product in LatestProducts"
            v-bind:key="product.id"
            v-bind:product="product"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import ProductCard from "@/components/Product/ProductCard.vue"
import store from '@/store'

@Options({
  name: "Home",
  components: {
    ProductCard
  },
})

export default class Home extends Vue {

  get LatestProducts(): [] {
    return store.getters['product/getLatestProductData']
  }

  async beforeCreate(): Promise<void> {
    await store.dispatch('product/latestProductsFromRemote')
  }

}
</script>
