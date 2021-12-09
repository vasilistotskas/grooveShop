<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row mb-5">
        <swiper v-if="homepageSlider && Object.keys(homepageSlider).length > 0"
            :style="mainSliderStyle"
            :navigation="true"
            :mousewheel="false"
            :keyboard="true"
            :grabCursor="true"
            :pagination='{
              "clickable": true,
              "dynamicBullets": false
            }'
            class="mySwiper">

          <swiper-slide v-if="homepageSlider[0].video">
            <video ref="mainSliderVideoRef"></video>
          </swiper-slide>

          <swiper-slide v-for="slide in homepageSlider[0].slides">
            <img v-bind:src="axiosBaseUrl + slide.image" :alt="slide.title">
          </swiper-slide>

        </swiper>
      </div>
    </div>
    <div class="container mb-5">
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
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Options, Vue } from "vue-class-component"
import SliderModel from '@/state/slider/SliderModel'
import ProductModel from "@/state/product/ProductModel"
import ProductCard from "@/components/Product/ProductCard.vue"
SwiperCore.use([Navigation,Pagination,Mousewheel,Keyboard])
import SwiperCore, { Navigation,Pagination,Mousewheel,Keyboard } from 'swiper'

@Options({
  name: "Home",
  components: {
    ProductCard,
    Swiper,
    SwiperSlide
  }
})

export default class Home extends Vue {
  $refs!: {
    mainSliderVideoRef: HTMLVideoElement
  }

  mainSliderStyle = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff'
  }

  get axiosBaseUrl(): boolean {
    return store.getters['app/axiosBaseUrl']
  }

  get LatestProducts(): [ProductModel] {
    return store.getters['product/getLatestProductData']
  }

  get homepageSlider(): [SliderModel] {
    return store.getters['slider/getSlidersData']
  }

  private mainSliderVideoInit(): void {
    if (this.homepageSlider && Object.keys(this.homepageSlider).length > 0) {
      this.$refs.mainSliderVideoRef.src = this.axiosBaseUrl + this.homepageSlider[0].video
      this.$refs.mainSliderVideoRef.loop = true
      this.$refs.mainSliderVideoRef.autoplay = true
      this.$refs.mainSliderVideoRef.playsInline = true
      this.$refs.mainSliderVideoRef.muted = true
      this.$refs.mainSliderVideoRef.play()
    }
  }

  async beforeCreate(): Promise<void> {
    await Promise.all([
      await store.dispatch('product/latestProductsFromRemote'),
      await store.dispatch('slider/slidersFromRemote'),
      await this.mainSliderVideoInit()
    ])
  }

}
</script>

<style lang="scss">
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: 100% !important;
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img, video {
  display: block;
  width: 100%;
  max-height: 500px;
  height: 100%;
  object-fit: cover;
}
.swiper-pagination-bullet {
  background-color: black;
  opacity: 0.35;
  width: 16px;
  height: 16px;
}
.swiper-pagination-bullet-active {
  opacity: 1;
}

</style>
