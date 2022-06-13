<template>
  <div class="home">
    <div class="container mt-9 mb-5">
      <div class="home-top-grid-content">
        <HomePageMainSlider
          v-if="homepageSlider[0] && Object.keys(homepageSlider[0]).length > 0"
          :slider="homepageSlider[0]"
          :grab-cursor="true"
          :keyboard="true"
          :mousewheel="false"
          :navigation="!!(homepageSlider[0].video && Object.keys(homepageSlider[0].slides).length > 0)"
          :pagination="{
            'clickable': true,
            'dynamicBullets' : false
          }"
          :style="mainSliderStyle"
          :img-height="510"
          :img-width="880"
          class="grid-item-swipper"
        />

        <div class="grid-item-right">
          <div class="grid-item-content-one">
            <HomePageMainSlider
              v-if="homepageSlider[1] && Object.keys(homepageSlider[1]).length > 0"
              :slider="homepageSlider[1]"
              :grab-cursor="true"
              :keyboard="true"
              :mousewheel="false"
              :navigation="!!(homepageSlider[1].video && Object.keys(homepageSlider[1].slides).length > 0)"
              :pagination="{
                'clickable': true,
                'dynamicBullets' : false
              }"
              :style="mainSliderStyle"
              :img-height="282"
              :img-width="487"
              class="grid-item-swipper"
            />
          </div>
          <div class="grid-item-content-two">
            <HomePageMainSlider
              v-if="homepageSlider[2] && Object.keys(homepageSlider[2]).length > 0"
              :slider="homepageSlider[2]"
              :grab-cursor="true"
              :keyboard="true"
              :mousewheel="false"
              :navigation="!!(homepageSlider[2].video && Object.keys(homepageSlider[2].slides).length > 0)"
              :pagination="{
                'clickable': true,
                'dynamicBullets' : false
              }"
              :style="mainSliderStyle"
              :img-height="282"
              :img-width="487"
              class="grid-item-swipper"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="home-usp-grid-container">
      <div class="home-usp-grid-content mb-5">
        <div class="grid-usp-item">
          <font-awesome-icon
            v-if="isMobile"
            :icon="phoneIcon"
          />
          <font-awesome-icon
            v-else
            :icon="phoneIcon"
            size="3x"
          />
          <span>Lorem Ipsum
            <span>Lorem Ipsum</span>
          </span>
        </div>
        <div class="grid-usp-item">
          <font-awesome-icon
            v-if="isMobile"
            :icon="envelopeIcon"
          />
          <font-awesome-icon
            v-else
            :icon="envelopeIcon"
            size="3x"
          />
          <span>Lorem Ipsum
            <span>Lorem Ipsum</span>
          </span>
        </div>
        <div class="grid-usp-item">
          <font-awesome-icon
            v-if="isMobile"
            :icon="commentIcon"
          />
          <font-awesome-icon
            v-else
            :icon="commentIcon"
            size="3x"
          />
          <span>Lorem Ipsum
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
import store from '@/store'
import 'swiper/swiper-bundle.css'
import SliderModel from '@/state/slider/SliderModel'
import ProductModel from '@/state/product/ProductModel'
import ProductCard from '@/components/Product/ProductCard.vue'
import { Options as Component, Vue } from 'vue-class-component'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import HomePageMainSlider from '@/components/Sliders/Swiper/HomePageMainSlider.vue'

@Component({
  name: 'Home',
  components: {
    ProductCard,
    HomePageMainSlider
  }
})

export default class Home extends Vue {

  mainSliderStyle = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff'
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
    await Promise.all([
      store.dispatch('product/fetchLatestProductsFromRemote'),
      store.dispatch('slider/fetchSlidersFromRemote')
    ])
  }

  async mounted(): Promise<void> {
    document.title = 'DeepWeb'

    await store.dispatch('app/updateMetaTagElement', {
      'metaName': 'description',
      'metaAttribute': 'content',
      'newValue': 'Deep Web Homepage'
    })
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Home"

</style>
