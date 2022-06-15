<template>
  <img
    v-if="useMediaStream"
    :alt="alt"
    :src="mediaStreamImage(pathType, imgType, fileName, imgWidth, imgHeight, imgFit, imgPosition, imgTrimThreshold, imgFormat)"
    :class="imgClass"
    :height="imgHeight"
    :width="imgWidth"
    :loading="loading"
  />
  <img v-else :alt="alt" :src="source" :class="imgClass" :height="imgHeight" :width="imgWidth" :loading="loading" />
</template>

<script lang="ts">
import { Options as Component, Vue } from 'vue-class-component'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import { HtmlImageLoadingOptions } from '@/components/Sliders/Enums/SliderEnum'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions, ImageFormatOptions, ImagePathOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Component({
  name: 'GrooveImage',
  props: {
    useMediaStream: {
      type: Boolean,
      required: false,
      default: true,
    },
    source: {
      type: String,
      required: false,
      default: 'backend/static/images/no_photo.jpg',
    },
    alt: {
      type: String,
      required: false,
      default: 'no alt',
    },
    loading: {
      type: String,
      required: false,
      default: HtmlImageLoadingOptions.lazy,
    },
    imgClass: {
      type: String,
      required: false,
      default: 'img-fluid',
    },
    pathType: {
      type: String,
      required: false,
      default: ImagePathOptions.media,
    },
    imgType: {
      type: String,
      required: false,
    },
    fileName: {
      type: String,
      required: false,
    },
    imgWidth: {
      type: Number,
      required: true,
      default: 1200,
    },
    imgHeight: {
      type: Number,
      required: true,
      default: 250,
    },
    imgFit: {
      type: String,
      required: false,
      default: ImageFitOptions.outside,
    },
    imgPosition: {
      type: String,
      required: false,
      default: ImagePositionOptions.center,
    },
    imgTrimThreshold: {
      type: Number,
      required: false,
      default: 5,
    },
    imgFormat: {
      type: String,
      required: false,
      default: ImageFormatOptions.jpg,
    },
  },
})
export default class GrooveImage extends Vue {
  ImagePathOptions = ImagePathOptions

  useMediaStream!: boolean
  source!: string
  alt!: string
  loading!: string
  imgClass!: string
  pathType!: ImagePathOptions
  imgType!: ImageTypeOptions
  fileName!: string
  imgHeight!: number
  imgWidth!: number
  imgFit!: ImageFitOptions
  imgPosition!: ImagePositionOptions
  imgTrimThreshold!: number
  imgFormat!: ImageFormatOptions

  imageUrl = ''

  public mediaStreamImage(
    pathType: ImagePathOptions,
    imageType: ImageTypeOptions,
    fileName: string,
    width: number,
    height: number,
    fit?: ImageFitOptions,
    position?: ImagePositionOptions,
    trimThreshold?: number,
    format?: ImageFormatOptions
  ): string | (() => string) {
    const mediaStreamImageData: ImageUrlInterface = {
      pathType: pathType,
      imageType: imageType,
      fileName: fileName,
      width: width,
      height: height,
      fit: fit,
      position: position,
      trimThreshold: trimThreshold,
      format: format,
    }

    const imageModel = new ImageUrlModel(mediaStreamImageData)

    imageModel.buildMediaStreamImageUrl().then((finalUrl: string) => {
      this.imageUrl = finalUrl
    })

    return this.imageUrl
  }
}
</script>
