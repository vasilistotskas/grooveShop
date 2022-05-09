<template>
  <img
    v-if="useMediaStream"
    :alt="alt"
    :src="mediaStreamImage(imgType, fileName, imgWidth, imgHeight)"
    :class="imgClass"
    :height="imgHeight"
    :width="imgWidth"
    :loading="loading"
  >
  <img
    v-else
    :alt="alt"
    :src="source"
    :class="imgClass"
    :height="imgHeight"
    :width="imgWidth"
    :loading="loading"
  >
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import { ImageFitOptions, ImagePositionOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Options({
  name: 'GrooveImage',
  props: {
    useMediaStream: {
      type: Boolean,
      default: true,
      required: false
    },
    source: {
      type: String,
      default: 'backend/static/images/no_photo.jpg',
      required: false
    },
    alt: {
      type: String,
      default: 'no alt',
      required: false
    },
    loading: {
      type: String,
      required: false,
      default: 'lazy'
    },
    imgClass: {
      type: String,
      required: false,
      default: 'img-fluid'
    },
    fileName: {
      type: String,
      required: false
    },
    imgType: {
      type: String,
      required: false
    },
    imgFit: {
      type: String,
      required: false,
      default: 'contain'
    },
    imgPosition: {
      type: String,
      required: false,
      default: 'center'
    },
    imgHeight: {
      type: Number,
      required: true
    },
    imgWidth: {
      type: Number,
      required: true
    }
  }
})

export default class GrooveImage extends Vue {

  useMediaStream!: boolean
  source!: string
  alt!: string
  loading!: string
  fileName!: string
  imgClass!: string
  imgHeight!: number
  imgWidth!: number

  imgType!: string
  imgFit!: string
  imgPosition!: string

  imageUrl: string = ''

  public mediaStreamImage(
      imageType: string,
      imageName: string,
      width?: string,
      height?: string,
      fit?: ImageFitOptions,
      position?: ImagePositionOptions,
      trimThreshold?: number
  ): string | (() => string) {
    const mediaStreamImageData: ImageUrlInterface = {
      'imageType': imageType,
      'imageName': imageName,
      'width': width,
      'height': height,
      'fit': fit,
      'position': position,
      'trimThreshold': trimThreshold
    }

    const imageModel = new ImageUrlModel(mediaStreamImageData)

    imageModel.buildMediaStreamImageUrl()
        .then((finalUrl: string) => {
          this.imageUrl = finalUrl
        })

    return this.imageUrl

  }

}
</script>