<script lang="ts" setup>
import { PropType, Ref } from 'vue'
import { Review } from '~/zod/product/review'
import { ProductReviewsListDisplayableImage } from '~/components/Product/Reviews/List.vue'
import { Product } from '~/zod/product/product'

const props = defineProps({
	review: {
		type: Object as PropType<Review>,
		required: true
	},
	displayImageOf: {
		type: String as PropType<ProductReviewsListDisplayableImage>,
		required: true,
		validator: (value: string) => ['user', 'product'].includes(value)
	}
})

const {
	review,
	displayImageOf
}: {
	review: Ref<Review>
	displayImageOf: Ref<ProductReviewsListDisplayableImage>
} = toRefs(props)

const product = computed(() => {
	if (typeof review.value.product === 'number') return undefined
	return review.value.product
})

const userAccount = computed(() => {
	if (typeof props.review?.user === 'number') return undefined
	return props.review?.user
})

const { resolveImageFilenameNoExt, resolveImageFileExtension, resolveImageSrc } =
	useImageResolver()
</script>

<template>
	<div class="reviews_list__item__content">
		<div class="reviews_list__item__content__header">
			<div class="reviews_list__item__content__header__user">
				<div class="reviews_list__item__content__header__avatar">
					<UserAvatar v-if="displayImageOf === 'user'" :user-account="userAccount" />
					<div v-if="displayImageOf === 'product' && product">
						<nuxt-img
							preload
							placeholder
							loading="lazy"
							provider="mediaStream"
							class="product_img"
							:style="{ objectFit: 'contain' }"
							:width="80"
							:height="80"
							:fit="'contain'"
							:position="'entropy'"
							:background="'transparent'"
							:trim-threshold="5"
							:format="resolveImageFileExtension(product.mainImageFilename)"
							sizes="sm:100vw md:50vw lg:80px"
							:src="
								resolveImageSrc(
									product.mainImageFilename,
									`media/uploads/products/${resolveImageFilenameNoExt(
										product.mainImageFilename
									)}`
								)
							"
							:alt="product.name"
						/>
					</div>
				</div>
				<div class="reviews_list__item__content__header__rate">
					<Rating :rate="review.rate" />
				</div>
			</div>
			<div class="reviews_list__item__content__body">
				<div class="reviews_list__item__content__body__comment">
					<span>{{ review.comment }}</span>
				</div>
			</div>
			<div class="reviews_list__item__content__footer">
				<div class="reviews_list__item__content__footer__date">
					<span>{{ review.createdAt }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.reviews_list__item__content {
	&__header {
		display: grid;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		@media screen and (min-width: 768px) {
			display: flex;
		}
		&__avatar {
			margin-right: 1rem;
		}
		&__rate {
			font-size: 1.5rem;
		}
	}
	&__body {
		&__comment {
			font-size: 1.2rem;
		}
	}
	&__footer {
		display: flex;
		justify-content: flex-end;
		&__date {
			font-size: 0.8rem;
		}
	}
}
</style>
