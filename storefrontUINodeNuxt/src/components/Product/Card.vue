<script lang="ts" setup>
import { Product } from '~/zod/product/product'

const { contentShorten } = useText()

const props = defineProps({
	product: { type: Object as PropType<Product>, required: true, default: null }
})

const imageFilename = computed(() => {
	if (!props.product?.mainImageFilename) return undefined
	return props.product.mainImageFilename.split('.').slice(0, -1).join('.')
})
const resolveImageFileExtension = computed(() => {
	if (!props.product?.mainImageFilename) return undefined
	return props.product.mainImageFilename.split('.').pop()
})
</script>

<template>
	<li v-if="product" class="product_card">
		<Anchor
			:to="`/product${product?.absoluteUrl}`"
			:href="product?.absoluteUrl"
			:text="product?.name"
		>
			<div
				class="container p-5 bg-white text-white dark:bg-slate-800 dark:text-black rounded-lg"
			>
				<div class="card grid gap-2">
					<div class="card-image">
						<div class="card-thumb">
							<div class="card-thumb-container">
								<div class="card-thumb-image">
									<nuxt-img
										preload
										placeholder
										loading="lazy"
										provider="mediaStream"
										class="product_img"
										:width="250"
										:height="230"
										:fit="'contain'"
										:position="'entropy'"
										:background="'transparent'"
										:trim-threshold="5"
										:format="resolveImageFileExtension"
										sizes="sm:100vw md:50vw lg:250px"
										:src="
											`media/uploads/products/${imageFilename}` ||
											'/images/placeholder.png'
										"
										:alt="product?.name"
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="card-body">
						<h2 class="card-title text-gray-700 dark:text-gray-200">
							{{ product?.name }}
						</h2>
						<p class="card-description text-gray-700 dark:text-gray-200 text-muted">
							{{ contentShorten(product?.description, 0, 100) }}
						</p>
						<div class="card-prices">
							<div class="card-price d-flex justify-content-between">
								<p class="text-gray-700 dark:text-gray-200">
									<span class="text-gray-700 dark:text-gray-200">{{
										$t('components.product.card.price')
									}}</span
									><span>{{ product?.price }}</span>
								</p>
							</div>
							<div class="card-vat-percent d-flex justify-content-between">
								<p class="text-gray-700 dark:text-gray-200">
									<span class="text-gray-700 dark:text-gray-200">{{
										$t('components.product.card.vat_percent')
									}}</span
									><span>{{ product?.vatPercent }}</span>
								</p>
							</div>
						</div>
						<div
							class="card-final-price d-flex justify-content-between total font-weight-bold mt-4"
						>
							<p class="text-gray-700 dark:text-gray-200">
								<span class="text-gray-700 dark:text-gray-200">{{
									$t('components.product.card.total_price')
								}}</span
								><span>{{ product?.finalPrice }}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Anchor>
	</li>
</template>

<style lang="scss" scoped>
.product_card {
	display: flex;
	flex-direction: column;
	min-height: 380px;
	.card-body {
		transition: transform 0.3s ease, -webkit-transform 0.3s ease;
		will-change: transform;
		display: flex;
		position: relative;
		flex: 1;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
	}
	.card-image {
		flex: 0 0 100%;
		max-width: 100%;
	}
	.card-description {
		font-size: 0.875rem;
		line-height: 1.5;
		min-height: 3.75rem;
	}
	.card-thumb {
		display: block;
		width: 100%;
	}
	.card-thumb-container {
		position: relative;
		width: 100%;
		padding-bottom: 100%;
	}
	.card-thumb-image {
		border: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		background: #fff;
		::v-deep(.product_img) {
			transition: all 300ms ease-in-out;
			font-size: 9px;
			line-height: 1.2;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			max-height: 100%;
			max-width: 100%;
		}
	}
}
</style>
