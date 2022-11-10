<template>
	<div class="home">
		<div class="container mt-9 mb-5">
			<div class="home-top-grid-content">
				<HomePageMainSlider
					v-if="
						sliderModule.getSlidersData &&
						sliderModule.getSlidersData[0] &&
						Object.keys(sliderModule.getSlidersData[0]).length > 0
					"
					:img-height="760"
					:img-width="1200"
					:slider="sliderModule.getSlidersData[0]"
					:backend-base-url="appModule.backendBaseUrl"
					class="grid-item-swipper"
				/>

				<div class="grid-item-right">
					<div class="grid-item-content-one">
						<HomePageMainSlider
							v-if="
								sliderModule.getSlidersData &&
								sliderModule.getSlidersData[1] &&
								Object.keys(sliderModule.getSlidersData[1]).length > 0
							"
							:img-height="400"
							:img-width="525"
							:slider="sliderModule.getSlidersData[1]"
							:backend-base-url="appModule.backendBaseUrl"
							class="grid-item-swipper"
						/>
					</div>
					<div class="grid-item-content-two">
						<HomePageMainSlider
							v-if="
								sliderModule.getSlidersData &&
								sliderModule.getSlidersData[2] &&
								Object.keys(sliderModule.getSlidersData[2]).length > 0
							"
							:img-height="400"
							:img-width="525"
							:slider="sliderModule.getSlidersData[2]"
							:backend-base-url="appModule.backendBaseUrl"
							class="grid-item-swipper"
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="home-usp-grid-container">
			<div class="home-usp-grid-content mb-5">
				<div class="grid-usp-item">
					<font-awesome-icon v-if="appModule.isMobile" :icon="phoneIcon" />
					<font-awesome-icon v-else :icon="phoneIcon" size="3x" />
					<span
						>Lorem Ipsum
						<span>Lorem Ipsum</span>
					</span>
				</div>
				<div class="grid-usp-item">
					<font-awesome-icon v-if="appModule.isMobile" :icon="envelopeIcon" />
					<font-awesome-icon v-else :icon="envelopeIcon" size="3x" />
					<span
						>Lorem Ipsum
						<span>Lorem Ipsum</span>
					</span>
				</div>
				<div class="grid-usp-item">
					<font-awesome-icon v-if="appModule.isMobile" :icon="commentIcon" />
					<font-awesome-icon v-else :icon="commentIcon" size="3x" />
					<span
						>Lorem Ipsum
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
						v-for="product in productModule.getLatestProductData"
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
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import AppModule from '@/State/App/AppModule'
import { getModule } from 'vuex-module-decorators'
import SliderModule from '@/State/Slider/SliderModule'
import ProductModule from '@/State/Product/ProductModule'
import ProductCard from '@/Components/Product/ProductCard.vue'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import HomePageMainSlider from '@/Components/Sliders/VueHorizontal/HomePageMainSlider.vue'

@Component({
	name: 'Home',
	components: {
		ProductCard,
		HomePageMainSlider
	}
})
export default class Home extends Vue {
	appModule = getModule(AppModule)
	productModule = getModule(ProductModule)
	sliderModule = getModule(SliderModule)

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: 'Deep Web Homepage',
				description: 'Deep Web Homepage'
			}))
		)
		return { meta }
	})

	phoneIcon = faPhone
	envelopeIcon = faEnvelope
	commentIcon = faComment
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Home';
</style>
