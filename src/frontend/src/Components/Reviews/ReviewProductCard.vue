<template>
	<div v-if="review && Object.keys(review).length > 0" :class="reviewProductCardClass">
		<div
			:style="{ backgroundImage: reviewBackgroundImage(review) }"
			class="user-review-product-image"
		/>
		<div class="user-review-product-head">
			<div class="user-review-product-name">
				<RouterLink
					:title="review.product.name"
					:to="'/Product' + review.product.absolute_url"
					aria-label="Product"
				>
					<span> {{ getReviewTitle }}</span>
				</RouterLink>
			</div>
			<div class="user-review-product-content">
				<div class="user-review-product-stars">
					<svg
						v-for="(star, i) of backgroundStars(review.rate)"
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
				</div>
				<div class="user-review-product-count">
					<span>({{ review.rate }}/10)</span>
				</div>
			</div>
			<div class="user-review-product-date">
				<span>At : {{ review.updated_at }} </span>
				<span>
					<font-awesome-icon
						:icon="checkCircleIcon"
						:style="{ color: '#53e24aeb' }"
						size="sm"
					/>
					Verified Review
				</span>
			</div>
		</div>
		<div class="user-review-product-body">
			<div class="user-review-product-comment">
				<span> {{ review.comment }} </span>
			</div>
		</div>
		<div v-if="review.userprofile.id === userId" class="user-review-product-actions">
			<a
				:title="`Review Settings of ${review.product.name}`"
				class="user-review-product-settings"
				@click="openReviewActions"
			/>
			<div
				v-if="reviewActionsOpen"
				ref="userReviewsActionTarget"
				class="user-review-actions-menu"
			>
				<div class="user-review-actions-controls">
					<div class="user-review-actions-edit">
						<RouterLink
							:title="review.product.name"
							:to="'/Product' + review.product.absolute_url"
							aria-label="Product"
						>
							<span>Update</span>
						</RouterLink>
					</div>
					<div class="user-review-actions-delete">
						<a
							:title="`Delete Review of ${review.product.name}`"
							data-method="delete"
							rel="nofollow"
							@click="deleteReview(review.userprofile.id, review.product_id)"
							>Delete</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { Emitter } from 'mitt'
import { inject, PropType } from 'vue'
import { constant, times } from 'lodash'
import { onClickOutside } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import { getModule } from 'vuex-module-decorators'
import { Options as Component } from 'vue-class-component'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import { ProductEvents } from '@/Emitter/Type/Product/Events'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import ProductReviewModel from '@/State/Product/Review/ProductReviewModel'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import ProductReviewModule from '@/State/Product/Review/ProductReviewModule'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

const toast = useToast()

const starSvg =
	'<path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg =
	'<path fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

@Component({
	name: 'ReviewProductCard',
	props: {
		review: {
			type: Object as PropType<ProductReviewModel>,
			required: false
		},
		userId: {
			type: Number,
			required: false
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
export default class ReviewProductCard
	extends PaginatedComponent<ProductReviewModel>
	implements PaginatedComponentInterface<ProductReviewModel>
{
	declare $refs: {
		userReviewsActionTarget: HTMLElement
	}
	productReviewModule = getModule(ProductReviewModule)
	MainRouteNames = MainRouteNames
	review!: ProductReviewModel
	userId = 0
	reviewActionsOpen = false
	isAuthenticated = false
	checkCircleIcon = faCheckCircle
	emitter: Emitter<ProductEvents> | undefined = inject('emitter')
	productReviewModuleNamespace!: PaginationNamespaceTypesEnum

	updated(): void {
		onClickOutside(this.$refs.userReviewsActionTarget, () => {
			this.reviewActionsOpen = false
		})
	}

	get reviewProductCardClass(): string {
		return this.review.userprofile.id === this.userId ? 'current-user-review-card' : ''
	}

	get getReviewTitle(): string {
		if (router.currentRoute.value.name === MainRouteNames.PRODUCT) {
			if (
				this.review.userprofile.first_name === null &&
				this.review.userprofile.last_name === null
			) {
				return 'Anonymous'
			}
			const reviewUserName =
				this.review.userprofile.first_name + ' ' + this.review.userprofile.last_name

			return `Review of ${reviewUserName}`
		}
		if (router.currentRoute.value.name === MainRouteNames.USER_ACCOUNT_REVIEWS) {
			return `Review of ${this.review.product.name}`
		}
		return ''
	}

	public isOddNumber(num: number) {
		return num % 2
	}

	public openReviewActions() {
		this.reviewActionsOpen = true
	}

	public reviewBackgroundImage(review: ProductReviewModel): string {
		const imageNameFileTypeRemove =
			review.product.main_image_filename.substring(
				0,
				review.product.main_image_filename.lastIndexOf('.')
			) || review.product.main_image_filename

		if (router.currentRoute.value.name === MainRouteNames.PRODUCT) {
			return 'url(' + review.userprofile.main_image_absolute_url + ')'
		}

		if (router.currentRoute.value.name === MainRouteNames.USER_ACCOUNT_REVIEWS) {
			return (
				'url(' +
				process.env.VITE_APP_BASE_URL +
				'/mediastream/media/uploads/' +
				'products' +
				'/' +
				imageNameFileTypeRemove +
				'/' +
				'100' +
				'/' +
				'100' +
				')'
			)
		}

		return ''
	}

	public backgroundStars(productRate: number): string[] {
		const stars: string[] = times(productRate / 2, constant(starSvg)) as string[]

		if (this.isOddNumber(productRate)) {
			stars.push(starHalfSvg)
		}

		return stars
	}

	public async deleteReview(userId: number, productId: number): Promise<void> {
		const data = {
			userId,
			productId
		}

		if (confirm('Are you sure you want to delete your rating?')) {
			this.productReviewModule.deleteCurrentProductReview(data).then(() => {
				let path = ''
				if (router.currentRoute.value.name === 'Product') {
					path = 'product'
				}
				if (router.currentRoute.value.name === 'Reviews') {
					path = 'user'
				}
				const paginationQuery: PaginationModel = PaginationModel.createPaginationModel({
					endpointUrl: `reviews/${path}/${data.productId}`,
					queryParams: {
						page: this.paginationModule.getCurrentPageNumber(
							this.productReviewModuleNamespace
						),
						query: this.paginationModule.getCurrentQuery(
							this.productReviewModuleNamespace
						)
					},
					method: ApiBaseMethods.GET
				})

				this.paginationModule.fetchPaginatedResults({
					params: paginationQuery,
					namespace: this.productReviewModuleNamespace
				})
				toast.success('Your Review has been deleted')
			})
		}
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Components/Reviews/ReviewProductCard';
</style>
