<template>
  <div class="home">
    <div class="container mt-9 mb-5">
      <div class="home-top-grid-content">
        <swiper v-if="homepageSlider[0] && Object.keys(homepageSlider[0]).length > 0"
            :style="mainSliderStyle"
            :navigation="!!(homepageSlider[0].video && Object.keys(homepageSlider[0].slides).length > 0)"
            :mousewheel="false"
            :keyboard="true"
            :grabCursor="true"
            :pagination='{
              "clickable": true,
              "dynamicBullets": false
            }'
            class="grid-item-swipper">

          <swiper-slide v-if="homepageSlider[0].video">
            <video ref="mainSliderVideoRef"></video>
          </swiper-slide>

          <swiper-slide v-for="slide in homepageSlider[0].slides">
            <img class="img-fluid" width="839" height="510"  v-bind:src="axiosBaseUrl + slide.image" :alt="slide.title ? slide.title : 'no-alt'">
          </swiper-slide>
        </swiper>

        <div class="grid-item-right">
          <div class="grid-item-content-one">
            <swiper v-if="homepageSlider[1] && Object.keys(homepageSlider[1]).length > 0"
                    :style="mainSliderStyle"
                    :navigation="false"
                    :mousewheel="false"
                    :bullets="false"
                    :keyboard="true"
                    :grabCursor="true"
                    class="grid-item-swipper">

              <swiper-slide v-if="homepageSlider[1].video">
                <video ref="mainSliderVideoRef"></video>
              </swiper-slide>

              <swiper-slide v-for="slide in homepageSlider[1].slides">
                <img class="img-fluid" width="500" height="275" v-bind:src="axiosBaseUrl + slide.image" :alt="slide.title ? slide.title : 'no-alt'">
              </swiper-slide>

            </swiper>
          </div>
          <div class="grid-item-content-two">
            <swiper v-if="homepageSlider[2] && Object.keys(homepageSlider[2]).length > 0"
                    :style="mainSliderStyle"
                    :navigation="false"
                    :mousewheel="false"
                    :keyboard="true"
                    :grabCursor="true"
                    class="grid-item-swipper">

              <swiper-slide v-if="homepageSlider[2].video">
                <video ref="mainSliderVideoRef"></video>
              </swiper-slide>

              <swiper-slide v-for="slide in homepageSlider[2].slides">
                <img class="img-fluid" width="500" height="275" v-bind:src="axiosBaseUrl + slide.image" :alt="slide.title ? slide.title : 'no-alt'">
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>

    <div class="home-usp-grid-container">
      <div class="home-usp-grid-content mb-5">

        <div class="grid-usp-item">
          <font-awesome-icon v-if="isMobile" :icon="phoneIcon" :style="{ color: '#080808' }"></font-awesome-icon>
          <font-awesome-icon v-else :icon="phoneIcon" size="3x" :style="{ color: '#080808' }"></font-awesome-icon>
          <span>Lorem Ipsum
            <span>Lorem Ipsum</span>
          </span>
        </div>
        <div class="grid-usp-item">
          <font-awesome-icon v-if="isMobile" :icon="envelopeIcon" :style="{ color: '#080808' }"></font-awesome-icon>
          <font-awesome-icon v-else :icon="envelopeIcon" size="3x" :style="{ color: '#080808' }"></font-awesome-icon>
          <span>Lorem Ipsum
            <span>Lorem Ipsum</span>
          </span>
        </div>
        <div class="grid-usp-item">
          <font-awesome-icon v-if="isMobile" :icon="commentIcon" :style="{ color: '#080808' }"></font-awesome-icon>
          <font-awesome-icon v-else :icon="commentIcon" size="3x" :style="{ color: '#080808' }"></font-awesome-icon>
          <span>Lorem Ipsum
            <span>Lorem Ipsum</span>
          </span>

        </div>
      </div>
    </div>


    <div class="product-listing-container">
      <div class="container mb-5">
          <div class="col-12">
            <h2 class="mb-2">{{ $t('eshop.test3') }}</h2>
          </div>
          <div class="grid-content-six">
            <ProductCard
                class="grid-item"
                v-for="product in LatestProducts"
                v-bind:key="product.id"
                v-bind:product="product"/>
          </div>
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
import SwiperCore, { Navigation,Pagination,Mousewheel,Keyboard } from 'swiper'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'


SwiperCore.use([Navigation,Pagination,Mousewheel,Keyboard])

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

  get phoneIcon(): typeof faPhone {
    return faPhone
  }
  get envelopeIcon(): typeof faEnvelope {
    return faEnvelope
  }
  get commentIcon(): typeof faComment {
    return faComment
  }

  get isMobile(): boolean {
    return store.getters['app/isMobile']
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
    if (this.homepageSlider && Object.keys(this.homepageSlider).length > 0 && this.$refs.mainSliderVideoRef) {
      this.$refs.mainSliderVideoRef.src = this.axiosBaseUrl + this.homepageSlider[0].video
      this.$refs.mainSliderVideoRef.crossOrigin = "anonymous"
      this.$refs.mainSliderVideoRef.loop = false
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

  async mounted(): Promise<void> {
    document.title = 'DeepWeb'

    await store.dispatch('app/updateMetaTagElement', {
      'metaName': 'description',
      'metaAttribute': 'content',
      'newValue': 'test'
    })
  }

}
</script>

<style lang="scss" scoped>
  .home-usp-grid-container {
    background: white;
  }
  .home-usp-grid-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 20px;
    background: white;
    max-width: 1320px;
    margin: 0 auto;
    .grid-usp-item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-self: center;
      justify-self: center;
      gap: 20px;
      svg {
        width: 100%;
        border-right: 2px solid #e7e7e7;
      }
      span {
        display: grid;
        align-self: center;
        justify-self: center;
        width: 100%;
        height: 100%;
        font-size: 18px;
        font-weight: 500;
        &:first-child {
          font-size: 12px;
          font-weight: 300;
        }
        @media screen and (max-width: 767px) {
          font-size: 14px;
          &:first-child {
            font-size: 10px;
          }
        }
      }
    }
  }
  .home-top-grid-content {
    display: grid;
    grid-template-columns: 61.5% 35%;
    gap: 45px;
    @media screen and (max-width: 767px){
      gap: 10px;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    }
  }
  .grid-item-swipper {
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    img, video, .swiper-slide {
      border-radius: 8px;
    }
    &:hover {
      transition: all 0.3s ease-in-out;
    }
  }
  .grid-item-right {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
    max-height: 575px;
    gap: 10px;
    @media screen and (max-width: 767px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
    }
    .grid-item-content {
      position: relative;
      height: 275px !important;
      &-one {
        .swiper-container-initialized {
          height: 275px !important;
          width: 100%!important;
          margin: 0 auto;
          @media screen and (max-width: 767px) {
            height: 200px !important;
            width: 300px !important;
          }
          @media screen and (max-width: 576px) {
            height: 125px !important;
            width: 175px !important;
          }
          @media screen and (max-width: 380px) {
            height: 110px !important;
            width: 125px !important;
          }
        }
      }
      &-two {
        .swiper-container-initialized {
          height: 275px !important;
          width: 100%!important;
          margin: 0 auto;
          @media screen and (max-width: 767px) {
            height: 200px !important;
            width: 300px !important;
          }
          @media screen and (max-width: 576px) {
            height: 125px !important;
            width: 175px !important;
          }
          @media screen and (max-width: 380px) {
            height: 110px !important;
            width: 125px !important;
          }
        }
      }
    }
  }
  .grid-content-six {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-gap: 20px;
    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(3,1fr);
    }
    @media screen and (max-width: 767px) {
      grid-template-columns: repeat(2,1fr);
    }
  }

  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    width: 100% !important;
    text-align: center;
    font-size: 18px;
    background: $primary-color-4;

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

  .swiper-container {
    .swiper-slide {background-color: #191919}
    &.swiper-container-initialized{overflow-y: auto; max-height: none;}
  }

</style>
