<script lang="ts" setup>
import { Product } from '~/zod/product/product'

const { contentShorten } = useText()

const props = defineProps({
	product: Object as PropType<Product>
})
</script>

<template>
	<li class="product_card">
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
									<nuxt-picture
										preload
										preset="productCard"
										placeholder="blur"
										class="product_img"
										format="webp"
										fit="cover"
										loading="lazy"
										background="#fff"
										:src="product?.mainImageAbsoluteUrl"
										:alt="product?.name"
										:img-attrs="{ id: product?.id }"
										:width="250"
										:height="230"
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
									<span>price</span><span>{{ product?.price }}</span>
								</p>
							</div>
							<div class="card-vat-percent d-flex justify-content-between">
								<p class="text-gray-700 dark:text-gray-200">
									<span>vatPercent</span><span>{{ product?.vatPercent }}</span>
								</p>
							</div>
						</div>
						<div
							class="card-final-price d-flex justify-content-between total font-weight-bold mt-4"
						>
							<p class="text-gray-700 dark:text-gray-200">
								<span>Total</span><span>{{ product?.finalPrice }}</span>
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
		.product_img {
			::v-deep(img) {
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
}
</style>