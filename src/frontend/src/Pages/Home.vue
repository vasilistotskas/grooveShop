<template>
	<div class="home">
		<div class="container mt-9 mb-5">
			<div class="home-top-grid-content">
				<div class="grid-item-right">
					<div class="grid-item-content-one"></div>
					<div class="grid-item-content-two"></div>
				</div>
			</div>
		</div>

		<div class="home-usp-grid-container">
			<div class="home-usp-grid-content mb-5">
				<div class="grid-usp-item">
					<FontAwesomeIcon v-if="appModule.isMobile" :icon="phoneIcon" />
					<FontAwesomeIcon v-else :icon="phoneIcon" size="3x" />
					<span
						>Lorem Ipsum
						<span>Lorem Ipsum</span>
					</span>
				</div>
				<div class="grid-usp-item">
					<FontAwesomeIcon v-if="appModule.isMobile" :icon="envelopeIcon" />
					<FontAwesomeIcon v-else :icon="envelopeIcon" size="3x" />
					<span
						>Lorem Ipsum
						<span>Lorem Ipsum</span>
					</span>
				</div>
				<div class="grid-usp-item">
					<FontAwesomeIcon v-if="appModule.isMobile" :icon="commentIcon" />
					<FontAwesomeIcon v-else :icon="commentIcon" size="3x" />
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
				<div class="grid-content-six"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import AppCore from '@/Core/AppCore'
import ProductCard from '@/Components/Product/ProductCard.vue'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { mixins, Options as Component } from 'vue-class-component'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import HomePageMainSlider from '@/Components/Sliders/VueHorizontal/HomePageMainSlider.vue'

@Component({
	name: 'Home',
	mixins: [AppCore],
	components: {
		ProductCard,
		HomePageMainSlider
	}
})
export default class Home extends mixins(AppCore) {
	phoneIcon = faPhone
	envelopeIcon = faEnvelope
	commentIcon = faComment
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Home.scss';
</style>
