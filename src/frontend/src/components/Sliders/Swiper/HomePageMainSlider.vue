<template>
  <swiper
    v-if="slider && Object.keys(slider).length > 0"
    :grab-cursor="grabCursor"
    :keyboard="keyboard"
    :mousewheel="mousewheel"
    :navigation="!!(slider.video && Object.keys(slider.slides).length > 0)"
    :pagination="pagination"
    :style="style"
    class="grid-item-swipper"
  >
    <swiper-slide v-if="slider.video">
      <video ref="mainSliderVideoRef" />
    </swiper-slide>

    <swiper-slide v-for="slide in slider.slides" :key="slide.id">
      <GrooveImage
        :alt="slide.title ? slide.title : 'no-alt'"
        :file-name="slide.main_image_filename"
        :use-media-stream="true"
        :img-type="ImageTypeOptions.SLIDES"
        :img-fit="ImageFitOptions.outside"
        :img-position="ImagePositionOptions.center"
        :img-height="imgHeight"
        :img-width="imgWidth"
      />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import 'swiper/css'
import store from '@/store'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SliderModel from '@/state/slider/SliderModel'
import { Options as Component, Vue } from 'vue-class-component'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper'
import {
  ImageFitOptions,
  ImagePositionOptions,
  ImageTypeOptions,
} from '@/helpers/MediaStream/ImageUrlEnum'

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard])

@Component({
  name: 'HomePageMainSlider',
  components: {
    GrooveImage,
    Swiper,
    SwiperSlide,
  },
  props: {
    slider: {
      type: Object,
      required: true,
    },
    style: {
      type: Object,
      required: false,
    },
    grabCursor: {
      type: Boolean,
      default: false,
      required: false,
    },
    keyboard: {
      type: Boolean,
      default: false,
      required: false,
    },
    mousewheel: {
      type: Boolean,
      default: false,
      required: false,
    },
    navigation: {
      type: Boolean,
      default: false,
      required: false,
    },
    pagination: {
      type: Object,
      required: false,
    },
    imgHeight: {
      type: Number,
      required: true,
    },
    imgWidth: {
      type: Number,
      required: true,
    },
  },
})
export default class HomePageMainSlider extends Vue {
  $refs!: {
    mainSliderVideoRef: HTMLVideoElement
  }

  slider!: SliderModel
  style!: object
  grabCursor!: boolean
  keyboard!: boolean
  mousewheel!: boolean
  navigation!: boolean
  pagination!: object
  imgHeight!: number
  imgWidth!: number

  ImageTypeOptions = ImageTypeOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions

  get axiosBaseUrl(): string | undefined {
    return store.getters['app/axiosBaseUrl']
  }

  mounted(): void {
    try {
      this.mainSliderVideoInit()
    } catch (err) {
      console.log(err)
    }
  }

  public mainSliderVideoInit(): void {
    if (this.slider && Object.keys(this.slider).length > 0 && this.$refs.mainSliderVideoRef) {
      this.$refs.mainSliderVideoRef.src = this.axiosBaseUrl + this.slider.video
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

<style lang="scss" scoped></style>
