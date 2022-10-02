<template>
  <div class="home">
    <div class="container mt-9 mb-5">
      <div class="home-top-grid-content">
        <HomePageMainSlider
          v-if="homepageSlider[0] && Object.keys(homepageSlider[0]).length > 0"
          :img-height="760"
          :img-width="1200"
          :slider="homepageSlider[0]"
          class="grid-item-swipper"
        />

        <div class="grid-item-right">
          <div class="grid-item-content-one">
            <HomePageMainSlider
              v-if="homepageSlider[1] && Object.keys(homepageSlider[1]).length > 0"
              :img-height="400"
              :img-width="525"
              :slider="homepageSlider[1]"
              class="grid-item-swipper"
            />
          </div>
          <div class="grid-item-content-two">
            <HomePageMainSlider
              v-if="homepageSlider[2] && Object.keys(homepageSlider[2]).length > 0"
              :img-height="400"
              :img-width="525"
              :slider="homepageSlider[2]"
              class="grid-item-swipper"
            />
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
          <ProductCard
            v-for="product in LatestProducts"
            :key="product.id"
            :product="product"
            class="grid-item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'swiper/css'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import AppModule from '@/state/app/AppModule'
import { getModule } from 'vuex-module-decorators'
import SliderModel from '@/state/slider/SliderModel'
import SliderModule from '@/state/slider/SliderModule'
import ProductModel from '@/state/product/ProductModel'
import ProductModule from '@/state/product/ProductModule'
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
  appModule = getModule(AppModule)
  productModule = getModule(ProductModule)
  sliderModule = getModule(SliderModule)

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
    return this.appModule.isMobile
  }

  get LatestProducts(): Array<ProductModel> {
    return this.productModule.getLatestProductData
  }

  get homepageSlider(): Array<SliderModel> {
    return this.sliderModule.getSlidersData
  }

  beforeCreate(): void {
    Promise.all([
      this.productModule.fetchLatestProductsFromRemote(),
      this.sliderModule.fetchSlidersFromRemote,
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Home';
</style>
