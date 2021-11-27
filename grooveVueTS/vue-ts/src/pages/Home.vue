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
import store from '@/store'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Options, Vue } from "vue-class-component"
import SliderModel from '@/state/slider/SliderModel'
import ProductModel from "@/state/product/ProductModel"
import ProductCard from "@/components/Product/ProductCard.vue"

@Options({
  name: "Home",
  components: {
    ProductCard,
    Swiper,
    SwiperSlide
  },
})

export default class Home extends Vue {

  get LatestProducts(): [ProductModel] {
    return store.getters['product/getLatestProductData']
  }

  get homepageSlider(): [SliderModel] {
    return store.getters['slider/getSlidersData']
  }

  async beforeCreate(): Promise<void> {
    await Promise.all([
      await store.dispatch('product/latestProductsFromRemote'),
      await store.dispatch('slider/slidersFromRemote')
    ])
  }

}
</script>
