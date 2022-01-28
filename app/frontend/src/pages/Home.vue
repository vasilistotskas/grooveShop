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
                 :src="mediaStreamImage('slides', slide.main_image_filename, '880', '510')" class="img-fluid"
                 height="510"
                 width="880"
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
                     :src="mediaStreamImage('slides', slide.main_image_filename, '487', '282')" class="img-fluid"
                     height="282"
                     width="487"
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
                     :src="mediaStreamImage('slides', slide.main_image_filename, '487', '282')" class="img-fluid"
                     height="282"
                     width="487"
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
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper'

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

  phoneIcon: IconDefinition = faPhone
  envelopeIcon: IconDefinition = faEnvelope
  commentIcon: IconDefinition = faComment

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

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/'
    const imageNameFileTypeRemove = imageName.substring(0, imageName.lastIndexOf('.')) || imageName
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/' + imageNameFileTypeRemove + '/' + width + '/' + height
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
.home-usp-grid-container {
  background: var(--cp-palette-main-fourth);
}

.home-usp-grid-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
  background: var(--cp-palette-main-fourth);
  border-bottom: 1px solid var(--cp-palette-main-third);
  border-top: 1px solid var(--cp-palette-main-third);
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
      border-right: 2px solid var(--cp-palette-main-fifth);
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
  @media screen and (max-width: 767px) {
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
        width: 100% !important;
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
        width: 100% !important;
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
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
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
  background: var(--cp-palette-main-fifth);

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

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: 100% !important;
  text-align: center;
  font-size: 18px;
  background: #f00014;

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
}

.swiper-pagination-bullet {
  background-color: var(--cp-palette-main-primary);
  opacity: 0.35;
  width: 16px;
  height: 16px;
}

.swiper-pagination-bullet-active {
  opacity: 1;
}

.swiper-container {
  .swiper-slide {
    background-color: var(--cp-palette-main-primary);
  }

  &.swiper-container-initialized {
    overflow-y: auto;
    max-height: none;
  }
}

</style>
