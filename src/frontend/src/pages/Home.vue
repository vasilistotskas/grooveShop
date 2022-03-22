<template>
  <div class="home">
    <div class="container mt-9 mb-5">
      <div class="home-top-grid-content">
        <swiper v-if="homepageSlider[0] && Object.keys(homepageSlider[0]).length > 0"
                :grabCursor="true"
                :keyboard="true"
                :mousewheel="false"
                :navigation="!!(homepageSlider[0].video && Object.keys(homepageSlider[0].slides).length > 0)"
                :pagination='{
                  "clickable": true,
                  "dynamicBullets": false
                }'
                :style="mainSliderStyle"
                class="grid-item-swipper">
          <swiper-slide v-if="homepageSlider[0].video">
            <video ref="mainSliderVideoRef"></video>
          </swiper-slide>

          <swiper-slide v-for="slide in homepageSlider[0].slides" :key="slide.id">
            <img :alt="slide.title ? slide.title : 'no-alt'"
                 :src="mediaStreamImage(ImageTypeOptions.SLIDES, slide.main_image_filename, '880', '510')"
                 class="img-fluid"
                 height="510"
                 width="880"
                 loading="lazy"
            />
          </swiper-slide>
        </swiper>

        <div class="grid-item-right">
          <div class="grid-item-content-one">
            <swiper v-if="homepageSlider[1] && Object.keys(homepageSlider[1]).length > 0"
                    :bullets="false"
                    :grab-cursor="true"
                    :keyboard="true"
                    :mousewheel="false"
                    :navigation="false"
                    :style="mainSliderStyle"
                    class="grid-item-swipper"
            >
              <swiper-slide v-if="homepageSlider[1].video">
                <video ref="mainSliderVideoRef"></video>
              </swiper-slide>

              <swiper-slide v-for="slide in homepageSlider[1].slides" :key="slide.id">
                <img :alt="slide.title ? slide.title : 'no-alt'"
                     :src="mediaStreamImage(ImageTypeOptions.SLIDES, slide.main_image_filename, '487', '282')"
                     class="img-fluid"
                     height="282"
                     width="487"
                     loading="lazy"
                />
              </swiper-slide>
            </swiper>
          </div>
          <div class="grid-item-content-two">
            <swiper v-if="homepageSlider[2] && Object.keys(homepageSlider[2]).length > 0"
                    :grab-cursor="true"
                    :keyboard="true"
                    :mousewheel="false"
                    :navigation="false"
                    :style="mainSliderStyle"
                    class="grid-item-swipper"
            >
              <swiper-slide v-if="homepageSlider[2].video">
                <video ref="mainSliderVideoRef"></video>
              </swiper-slide>

              <swiper-slide v-for="slide in homepageSlider[2].slides" :key="slide.id">
                <img :alt="slide.title ? slide.title : 'no-alt'"
                     :src="mediaStreamImage(ImageTypeOptions.SLIDES, slide.main_image_filename, '487', '282')" class="img-fluid"
                     height="282"
                     width="487"
                     loading="lazy"
                />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>

    <div class="home-usp-grid-container">
      <div class="home-usp-grid-content mb-5">
        <div class="grid-usp-item">
          <font-awesome-icon v-if="isMobile" :icon="phoneIcon"/>
          <font-awesome-icon v-else :icon="phoneIcon" size="3x"/>
          <span>Lorem Ipsum
            <span>Lorem Ipsum</span>
          </span>
        </div>
        <div class="grid-usp-item">
          <font-awesome-icon v-if="isMobile" :icon="envelopeIcon"/>
          <font-awesome-icon v-else :icon="envelopeIcon" size="3x"/>
          <span>Lorem Ipsum
            <span>Lorem Ipsum</span>
          </span>
        </div>
        <div class="grid-usp-item">
          <font-awesome-icon v-if="isMobile" :icon="commentIcon"/>
          <font-awesome-icon v-else :icon="commentIcon" size="3x"/>
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Options, Vue } from 'vue-class-component'
import SliderModel from '@/state/slider/SliderModel'
import ProductModel from '@/state/product/ProductModel'
import ProductCard from '@/components/Product/ProductCard.vue'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard])

@Options({
  name: 'Home',
  components: {
    ProductCard,
    Swiper,
    SwiperSlide
  }
})

export default class Home extends Vue {

  $refs!: {
    mainSliderVideoRef: HTMLVideoElement;
  }

  mainSliderStyle = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff'
  }

  phoneIcon = faPhone
  envelopeIcon = faEnvelope
  commentIcon = faComment

  ImageTypeOptions: any = ImageTypeOptions
  ImageFitOptions: any = ImageFitOptions
  ImagePositionOptions: any = ImagePositionOptions

  get isMobile(): boolean {
    return store.getters['app/isMobile']
  }

  get axiosBaseUrl(): string | undefined {
    return store.getters['app/axiosBaseUrl']
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
    try {
      this.mainSliderVideoInit()
    } catch (err) {
      console.log(err)
    }
  }

  async mounted(): Promise<void> {
    document.title = 'DeepWeb'

    await store.dispatch('app/updateMetaTagElement', {
      'metaName': 'description',
      'metaAttribute': 'content',
      'newValue': 'test'
    })
  }

  public mediaStreamImage(
      imageType: string,
      imageName: string,
      width?: string,
      height?: string,
      fit?: ImageFitOptions,
      position?: ImagePositionOptions,
      trimThreshold?: number
  ): string {
    const mediaStreamImageData: ImageUrlInterface = {
      'imageType': imageType,
      'imageName': imageName,
      'width': width,
      'height': height,
      'fit': fit,
      'position': position,
      'trimThreshold': trimThreshold
    }
    return ImageUrlModel.buildMediaStreamImageUrl(mediaStreamImageData)
  }

  public mainSliderVideoInit(): void {
    if (this.homepageSlider && Object.keys(this.homepageSlider).length > 0 && this.$refs.mainSliderVideoRef) {
      this.$refs.mainSliderVideoRef.src = this.axiosBaseUrl + this.homepageSlider[0].video
      this.$refs.mainSliderVideoRef.crossOrigin = 'anonymous'
      this.$refs.mainSliderVideoRef.loop = false
      this.$refs.mainSliderVideoRef.autoplay = true
      this.$refs.mainSliderVideoRef.playsInline = true
      this.$refs.mainSliderVideoRef.muted = true
      this.$refs.mainSliderVideoRef.play()
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Home"

</style>
