<template>
	<div v-if="asyncImageState" class="groove-image-container">
		<div v-if="imageLoading" class="groove-image-loading-container">
			<span> Loading... </span>
		</div>

		<div v-else class="groove-image-ready-container">
			<img
				v-if="useMediaStream"
				:alt="alt"
				:src="
					myContext.mediaStreamImage(
						pathType,
						imgType,
						fileName,
						imgWidth,
						imgHeight,
						imgFit,
						imgPosition,
						imgTrimThreshold,
						imgFormat
					).imageUrl
				"
				:class="imgClass"
				:height="imgHeight"
				:width="imgWidth"
				:loading="loading"
				:fetchpriority="fetchPriority"
			/>
			<img
				v-else
				:alt="alt"
				:src="source"
				:class="imgClass"
				:height="imgHeight"
				:width="imgWidth"
				:loading="loading"
				:fetchpriority="fetchPriority"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import {
	ImageFitOptions,
	ImagePositionOptions,
	ImageTypeOptions,
	ImageFormatOptions,
	ImagePathOptions
} from '@/Helpers/MediaStream/ImageUrlEnum'
import { PropType } from 'vue'
import { useImage } from '@vueuse/core'
import ImageUrlModel from '@/Helpers/MediaStream/ImageUrlModel'
import { Options as Component, setup, Vue } from 'vue-class-component'
import ImageUrlInterface from '@/Helpers/MediaStream/ImageUrlInterface'
import { HtmlImageLoadingOptions } from '@/Components/Sliders/Enums/SliderEnum'

@Component({
	name: 'GrooveImage',
	props: {
		useMediaStream: {
			type: Boolean,
			required: false,
			default: true
		},
		source: {
			type: String,
			required: false,
			default: 'backend/static/images/no_photo.jpg'
		},
		alt: {
			type: String,
			required: false,
			default: 'no alt'
		},
		loading: {
			type: String as PropType<HtmlImageLoadingOptions>,
			required: false,
			default: HtmlImageLoadingOptions.lazy
		},
		imgClass: {
			type: String,
			required: false,
			default: 'img-fluid'
		},
		pathType: {
			type: String as PropType<ImagePathOptions>,
			required: false,
			default: ImagePathOptions.media
		},
		imgType: {
			type: String as PropType<ImageTypeOptions>,
			required: false
		},
		fileName: {
			type: String,
			required: false
		},
		imgWidth: {
			type: Number,
			required: true,
			default: 1200
		},
		imgHeight: {
			type: Number,
			required: true,
			default: 250
		},
		imgFit: {
			type: String as PropType<ImageFitOptions>,
			required: false,
			default: ImageFitOptions.outside
		},
		imgPosition: {
			type: String as PropType<ImagePositionOptions>,
			required: false,
			default: ImagePositionOptions.center
		},
		imgTrimThreshold: {
			type: Number,
			required: false,
			default: 5
		},
		imgFormat: {
			type: String as PropType<ImageFormatOptions>,
			required: false,
			default: ImageFormatOptions.jpg
		},
		fetchPriority: {
			type: String,
			required: false,
			default: 'low'
		}
	}
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
	fetchPriority!: string
	imageUrl = ''

	myContext = setup(() => {
		const mediaStreamImage = (
			pathType: ImagePathOptions,
			imageType: ImageTypeOptions,
			fileName: string,
			width: number,
			height: number,
			fit?: ImageFitOptions,
			position?: ImagePositionOptions,
			trimThreshold?: number,
			format?: ImageFormatOptions
		) => {
			const mediaStreamImageData: ImageUrlInterface = {
				pathType: pathType,
				imageType: imageType,
				fileName: fileName,
				width: width,
				height: height,
				fit: fit,
				position: position,
				trimThreshold: trimThreshold,
				format: format
			}

			const imageModel = new ImageUrlModel(mediaStreamImageData)

			imageModel.buildMediaStreamImageUrl().then((finalUrl: string) => {
				this.imageUrl = finalUrl
			})

			return { imageUrl: this.imageUrl }
		}
		return { mediaStreamImage }
	})

	get asyncImageState() {
		return useImage({ src: this.imageUrl })
	}

	get imageLoading() {
		return this.asyncImageState.isLoading.value
	}
}
</script>

<style lang="scss" scoped>
.groove-image {
	&-container {
		position: relative;
	}
	&-loading {
		&-container {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #fff;
			z-index: 1;
		}
	}

	&-ready {
		&-container {
		}
	}
}
</style>
