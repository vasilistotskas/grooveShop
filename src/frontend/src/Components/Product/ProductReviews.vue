<template>
	<div
		v-if="product && Object.keys(product).length > 0"
		class="product-reviews-container"
	>
		<div class="product-reviews-stats">
			<div class="container-small product-reviews-stats-container">
				<span class="product-reviews-title">
					<span class="content">Reviews</span>
				</span>
				<span class="product-reviews-average">
					<span class="product-reviews-average-title">Review Average</span>
					<span class="product-reviews-average-stars" />
					<svg
						v-for="(star, i) of backgroundStars(productReviewsAverage)"
						:key="i"
						aria-hidden="true"
						class="star star-background"
						data-icon="star"
						data-prefix="fas"
						focusable="false"
						role="img"
						viewBox="0 0 576 512"
						xmlns="http://www.w3.org/2000/svg"
						v-html="star"
					/>
					<span class="product-reviews-average-count"
						>({{ productReviewsAverage }}/10)</span
					>
				</span>
				<span class="product-reviews-average-total"
					>Total Reviews :
					<span>{{ productReviewsCounter }}</span>
				</span>
			</div>
		</div>
		<div class="container-small">
			<div
				v-if="shouldReviewsAppear"
				id="reviews-container"
				class="product-page-grid-review"
			>
				<div class="product-reviews-grid">
					<ReviewProductCard
						v-if="userToProductReview && Object.keys(userToProductReview).length > 0"
						:key="userToProductReview.id"
						:review="userToProductReview"
						:user-id="userId"
						:product-review-module-namespace="productReviewModuleNamespace"
						class="product-review-main-card"
					/>

					<ReviewProductCard
						v-for="review in allPaginatedResults"
						:key="review.id"
						:review="review"
						:class="{ 'current-user-review-card': review.user.id === userId }"
						:route="PaginationRoutesEnum.REVIEWS"
						:user-id="userId"
						:product-review-module-namespace="productReviewModuleNamespace"
						class="product-review-main-card"
					/>
				</div>
				<Pagination
					v-if="Object.keys(allPaginatedResults).length !== 0"
					:endpoint-url="buildEndPointUrlForPaginatedResults()"
					:max-visible-buttons="3"
					:route="'Product'"
					:router-replace="false"
					:total-pages="allPaginatedResultsTotalPages"
					:namespace="paginationNamespace"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { constant, times } from 'lodash'
import { getModule } from 'vuex-module-decorators'
import ProductModel from '@/State/Product/ProductModel'
import { Options as Component } from 'vue-class-component'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import Pagination from '@/Components/Pagination/Pagination.vue'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import ReviewProductCard from '@/Components/Reviews/ReviewProductCard.vue'
import ProductReviewModel from '@/State/Product/Review/ProductReviewModel'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import ProductReviewModule from '@/State/Product/Review/ProductReviewModule'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

const starSvg =
	'<path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg =
	'<path fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Component({
	name: 'ProductReviews',
	extends: PaginatedComponent,
	components: {
		ReviewProductCard,
		Pagination
	},
	props: {
		product: {
			type: Object as PropType<ProductModel>,
			required: true
		},
		userId: {
			type: Number,
			required: false
		},
		userToProductReview: {
			type: Object as PropType<ProductReviewModel>
		},
		productReviewsAverage: {
			type: Number,
			default: 0
		},
		productReviewsCounter: {
			type: Number,
			default: 0
		},
		isAuthenticated: {
			type: Boolean,
			default: false
		},
		productReviewModuleNamespace: {
			type: String as PropType<PaginationNamespaceTypesEnum>,
			required: false
		}
	}
})
export default class ProductReviews
	extends PaginatedComponent<ProductReviewModel>
	implements PaginatedComponentInterface<ProductReviewModel>
{
	productReviewModule = getModule(ProductReviewModule)
	clearPagination = true
	product!: ProductModel
	PaginationRoutesEnum = PaginationRoutesEnum
	paginationNamespace = PaginationNamespaceTypesEnum.PRODUCT_PAGE_REVIEWS
	userId!: number
	userToProductReview!: ProductReviewModel
	productReviewsAverage!: number
	productReviewsCounter!: number
	isAuthenticated = false
	productReviewModuleNamespace!: PaginationNamespaceTypesEnum

	get shouldReviewsAppear(): boolean {
		return (
			(this.allPaginatedResults && Object.keys(this.allPaginatedResults).length > 0) ||
			(this.userToProductReview && Object.keys(this.userToProductReview).length > 0)
		)
	}

	mounted(): void {
		this.fetchPaginationData<ProductReviewModel>().then(() => {
			this.productReviewModule.setProductReviewsAverage(this.product.review_average)
			this.productReviewModule.setProductReviewsCounter(this.product.review_counter)
		})
	}

	fetchPaginationData<T>(): Promise<void | PaginatedModel<T>> {
		const paginationQuery = PaginationModel.createPaginationModel({
			pageNumber: this.currentPageNumber,
			endpointUrl: this.buildEndPointUrlForPaginatedResults(),
			method: ApiBaseMethods.GET,
      queryParams: {
        product_id: this.product.id
      }
		})

		return this.paginationModule.fetchPaginatedResults({
			params: paginationQuery,
			namespace: this.paginationNamespace
		})
	}

	public buildEndPointUrlForPaginatedResults(): string {
		const product_id = this.product.id
		return `product/review/`
	}

	public isOddNumber(num: number) {
		return num % 2
	}

	public backgroundStars(productRate: number): string[] {
		const stars: string[] = times(productRate / 2, constant(starSvg)) as string[]

		if (this.isOddNumber(productRate)) {
			stars.push(starHalfSvg)
		}

		return stars
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Product/Product.scss';
</style>
