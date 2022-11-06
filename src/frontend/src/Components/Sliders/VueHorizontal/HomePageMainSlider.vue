<template>
	<div @mousedown.left="onMouseDown">
		<VueHorizontal
			v-if="slider && Object.keys(slider).length > 0"
			responsive
			class="home-page-main-slider-vue_horizontal horizontal"
			ref="horizontal"
			@scroll="onScroll"
		>
			<section v-if="slider.video" :key="slider.id" class="instagram-gallery-image">
				<video width="1200" height="755" ref="mainSliderVideoRef" />
			</section>
			<section
				v-for="slide in slider.slides"
				:key="slide.id"
				class="instagram-gallery-item slider-item"
			>
				<GrooveImage
					:alt="slide.title ? slide.title : 'no-alt'"
					:file-name="slide.main_image_filename"
					:use-media-stream="true"
					:img-type="ImageTypeOptions.SLIDES"
					:img-fit="ImageFitOptions.outside"
					:img-position="ImagePositionOptions.center"
					:img-height="imgHeight"
					:img-width="imgWidth"
					:img-class="'home-page-main-Slider-image img-fluid'"
				/>
			</section>
		</VueHorizontal>
	</div>
</template>

<script lang="ts">
import {
	ImageFitOptions,
	ImagePositionOptions,
	ImageTypeOptions
} from '@/Helpers/MediaStream/ImageUrlEnum'
import { PropType } from 'vue'
import VueHorizontal from 'vue-horizontal'
import SliderModel from '@/State/Slider/SliderModel'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'HomePageMainSlider',
	components: {
		GrooveImage,
		VueHorizontal
	},
	props: {
		slider: {
			type: Object as PropType<SliderModel>,
			required: true
		},
		imgHeight: {
			type: Number,
			required: true
		},
		imgWidth: {
			type: Number,
			required: true
		},
		backendBaseUrl: {
			type: String,
			default: ''
		}
	}
})
export default class HomePageMainSlider extends Vue {
	declare $refs: {
		mainSliderVideoRef: HTMLVideoElement
		horizontal: any
	}
	slider!: SliderModel
	imgHeight!: number
	imgWidth!: number
	ImageTypeOptions = ImageTypeOptions
	ImageFitOptions = ImageFitOptions
	ImagePositionOptions = ImagePositionOptions
	left = 0
	originX = 0
	originLeft = 0
	backendBaseUrl = ''

	mounted(): void {
		try {
			this.mainSliderVideoInit()
		} catch (err) {
			console.log(err)
		}
	}

	unmounted(): void {
		this.onMouseUp()
	}

	public mainSliderVideoInit(): void {
		if (
			this.slider &&
			Object.keys(this.slider).length > 0 &&
			this.$refs.mainSliderVideoRef
		) {
			this.$refs.mainSliderVideoRef.src = this.backendBaseUrl + this.slider.video
			this.$refs.mainSliderVideoRef.crossOrigin = 'anonymous'
			this.$refs.mainSliderVideoRef.loop = false
			this.$refs.mainSliderVideoRef.autoplay = true
			this.$refs.mainSliderVideoRef.playsInline = true
			this.$refs.mainSliderVideoRef.muted = true
			this.$refs.mainSliderVideoRef.play()
		}
	}

	public onScroll({ left }): void {
		this.left = left
	}

	public onMouseDown(e): void {
		this.originX = e.pageX
		this.originLeft = this.left

		window.addEventListener('mouseup', this.onMouseUp)
		window.addEventListener('mousemove', this.onMouseMove)
	}

	public onMouseUp(): void {
		window.removeEventListener('mouseup', this.onMouseUp)
		window.removeEventListener('mousemove', this.onMouseMove)
	}

	public onMouseMove(e): void {
		const offset = e.pageX - this.originX
		const left = this.originLeft - offset
		this.$refs.horizontal.scrollToLeft(left, 'auto')
	}
}
</script>

<style lang="scss" scoped>
.home-page-main-slider-image {
	height: 100%;
	user-select: none;
	pointer-events: none;
}
.horizontal {
	cursor: grab;
	user-select: none;
}
</style>
