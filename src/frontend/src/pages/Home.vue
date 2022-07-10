<template>
  <div class="home">
    <div class="container mt-9 mb-5">
      <div class="home-top-grid-content">
        <HomePageMainSlider v-if="homepageSlider[0] && Object.keys(homepageSlider[0]).length > 0" :img-height="760" :img-width="1200" :slider="homepageSlider[0]" class="grid-item-swipper" />

        <div class="grid-item-right">
          <div class="grid-item-content-one">
            <HomePageMainSlider v-if="homepageSlider[1] && Object.keys(homepageSlider[1]).length > 0" :img-height="400" :img-width="525" :slider="homepageSlider[1]" class="grid-item-swipper" />
          </div>
          <div class="grid-item-content-two">
            <HomePageMainSlider v-if="homepageSlider[2] && Object.keys(homepageSlider[2]).length > 0" :img-height="400" :img-width="525" :slider="homepageSlider[2]" class="grid-item-swipper" />
          </div>
        </div>
      </div>
    </div>

    <div class="home-usp-grid-container">
      <div class="home-usp-grid-content mb-5">
        <div class="grid-usp-item">
          <font-awesome-icon v-if="isMobile" :icon="phoneIcon" />
          <font-awesome-icon v-else :icon="phoneIcon" size="3x" />
          <span
            >Lorem Ipsum
            <span>Lorem Ipsum</span>
          </span>
        </div>
        <div class="grid-usp-item">
          <font-awesome-icon v-if="isMobile" :icon="envelopeIcon" />
          <font-awesome-icon v-else :icon="envelopeIcon" size="3x" />
          <span
            >Lorem Ipsum
            <span>Lorem Ipsum</span>
          </span>
        </div>
        <div class="grid-usp-item">
          <font-awesome-icon v-if="isMobile" :icon="commentIcon" />
          <font-awesome-icon v-else :icon="commentIcon" size="3x" />
          <span
            >Lorem Ipsum
            <span>Lorem Ipsum</span>
          </span>
        </div>
      </div>
    </div>

    <div class="product-listing-container">
      <div class="container mb-5">
        <div class="col-12">
          <h2 class="mb-2">
            {{ $t('eshop.test3') }}
          </h2>
        </div>
        <div class="grid-content-six">
          <ProductCard v-for="product in LatestProducts" :key="product.id" :product="product" class="grid-item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'swiper/css'
import store from '@/store'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import SliderModel from '@/state/slider/SliderModel'
import ProductModel from '@/state/product/ProductModel'
import ProductCard from '@/components/Product/ProductCard.vue'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import HomePageMainSlider from '@/components/Sliders/VueHorizontal/HomePageMainSlider.vue'

@Component({
  name: 'Home',
  components: {
    ProductCard,
    HomePageMainSlider,
  },
})
export default class Home extends Vue {
  meta = setup(() =>
    useMeta(
      computed(() => ({
        title: 'Deep Web Homepage',
        description: 'Deep Web Homepage',
      }))
    )
  )

  mainSliderStyle = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff',
  }

  phoneIcon = faPhone
  envelopeIcon = faEnvelope
  commentIcon = faComment

  get isMobile(): boolean {
    return store.getters['app/isMobile']
  }

  get LatestProducts(): Array<ProductModel> {
    return store.getters['product/getLatestProductData']
  }

  get homepageSlider(): Array<SliderModel> {
    return store.getters['slider/getSlidersData']
  }

  async beforeCreate(): Promise<void> {
    await Promise.all([store.dispatch('product/fetchLatestProductsFromRemote'), store.dispatch('slider/fetchSlidersFromRemote')])
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Home';
</style>
