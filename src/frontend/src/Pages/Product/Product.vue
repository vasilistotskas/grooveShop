<template>
	<div class="container min-height-container mt-7">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<div
			v-if="product && Object.keys(product).length > 0"
			class="product-page-grid-container mb-5"
		>
			<div class="product-page-grid-image">
				<figure
					v-for="image in product.images"
					:key="image.id"
					:class="{ 'image-main': image.is_main }"
					class="image"
				>
					<GrooveImage
						:alt="product.name"
						:file-name="image.product_image_filename"
						:use-media-stream="true"
						:img-type="ImageTypeOptions.PRODUCTS"
						:img-width="330"
						:img-height="420"
					/>
				</figure>
			</div>
			<div class="product-page-grid-right">
				<div class="product-page-grid-info-part-one">
					<div class="product-page-grid-info">
						<h1 class="title mb-2">
							{{ product.name }}
						</h1>
						<h5 class="mb-4">
							<strong>Product ID: </strong>
							<span>{{ product.id }}</span>
						</h5>
						<!-- Product Review -->
						<p class="description mb-4" v-html="product.description" />
					</div>

					<div class="product-page-grid-price mb-4">
						<p class="mb-2 product-page-grid-price-save">
							<strong>Product Save Percent: </strong>
							<span>{{ product.price_save_percent }}%</span>
						</p>
						<p class="mb-2 product-page-grid-price-starting">
							<strong>Starting Price: </strong>
							<span>${{ product.price }}</span>
						</p>
						<p class="product-page-grid-price-final">
							<strong>Final Price: </strong>
							<span>${{ product.final_price }}</span>
						</p>
					</div>

					<div class="product-page-information mb-4">
						<div v-if="product.stock > 0" class="product-page-information-availability">
							<font-awesome-icon
								:icon="cubesIcon"
								:style="{ color: '#53e24aeb' }"
								size="lg"
							/>
							<span>Immediately available</span>
						</div>
						<div v-else class="product-page-information-availability unavailable">
							<font-awesome-icon
								:icon="warningTriangleIcon"
								:style="{ color: '#FD0002e0' }"
								size="lg"
							/>
							<span>Out of stock</span>
						</div>
						<div class="product-page-information-delivery">
							<font-awesome-icon
								:icon="truckPickupIcon"
								:style="{ color: '#1f8dfd' }"
								size="lg"
							/>
							<span>Instant delivery</span>
						</div>
					</div>

					<div class="product-page-grid-buttons">
						<input v-model="quantity" class="input" min="1" type="number" />
						<button
							:class="{ disabled: disabled }"
							:title="`Add to cart ${product.name}`"
							class="btn-outline-primary-one addToCartButton"
							type="button"
							@click="addToCart()"
						>
							<font-awesome-icon
								:icon="shoppingBagIcon"
								:style="{ color: '#53e24aeb' }"
								size="lg"
							/>
							<span>{{ addToCartButtonText }}</span>
						</button>
						<FavouriteButton
							:model="product"
							:module="productFavouriteModule"
							:getter-type="'getIsCurrentProductInUserFavourites'"
							:getter-params="{ productId: product.id }"
							:dispatch-type="'toggleFavourite'"
							:dispatch-params="{ productId: product.id, userId: userId }"
							:use-store="true"
						/>
					</div>
				</div>
				<div class="product-page-grid-info-part-two">
					<div class="product-page-grid-modal">
						<ProductReview
							:is-authenticated="isAuthenticated"
							:user-has-already-reviewed-product="userHasAlreadyReviewedProduct"
							:user-to-product-review="userToProductReview"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<ProductReviews
		v-if="product?.id"
		:product="product"
		:user-id="userId"
		:user-to-product-review="userToProductReview"
		:product-reviews-average="productReviewsAverage"
		:product-reviews-counter="productReviewsCounter"
		:is-authenticated="isAuthenticated"
		:product-review-module-namespace="productReviewModuleNamespace"
	/>
</template>

<script lang="ts">
import { inject } from 'vue'
import router from '@/Routes'
import { Emitter } from 'mitt'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import { useToast } from 'vue-toastification'
import CartModule from '@/State/Cart/CartModule'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import ProductModel from '@/State/Product/ProductModel'
import UserModule from '@/State/User/Profile/UserModule'
import ProductModule from '@/State/Product/ProductModule'
import { ProductEvents } from '@/Emitter/Type/Product/Events'
import FavouriteButton from '@/Utilities/FavouriteButton.vue'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import ProductReview from '@/Components/Product/ProductReview.vue'
import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes'
import ProductReviews from '@/Components/Product/ProductReviews.vue'
import { ImageTypeOptions } from '@/Helpers/MediaStream/ImageUrlEnum'
import { Options as Component, setup, Vue } from 'vue-class-component'
import ProductReviewModel from '@/State/Product/Review/ProductReviewModel'
import ProductReviewModule from '@/State/Product/Review/ProductReviewModule'
import { RouteMetaBreadcrumbFunction } from '@/Routes/Type/BreadcrumbItemType'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons/faShoppingBag'
import { faShippingFast } from '@fortawesome/free-solid-svg-icons/faShippingFast'
import ProductFavouriteModule from '@/State/Product/Favourite/ProductFavouriteModule'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'

const toast = useToast()

@Component({
	name: 'Product',
	components: {
		FavouriteButton,
		ProductReview,
		ProductReviews,
		Breadcrumbs,
		GrooveImage
	},
	props: {
		category_slug: {
			type: String
		},
		product_slug: {
			type: String
		}
	}
})
export default class Product extends Vue {
	userModule = getModule(UserModule)
	productModule = getModule(ProductModule)
	cartModule = getModule(CartModule)
	productFavouriteModule = getModule(ProductFavouriteModule)
	productReviewModule = getModule(ProductReviewModule)
	authModule = getModule(AuthModule)
	emitter: Emitter<ProductEvents> | undefined = inject('emitter')

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: this.product?.name ?? '',
				description: this.product?.description ?? ''
			}))
		)
		return { meta }
	})

	quantity = 1

	cubesIcon = faCubes
	shoppingBagIcon = faShoppingBag
	truckPickupIcon = faShippingFast
	warningTriangleIcon = faExclamationTriangle

	ImageTypeOptions = ImageTypeOptions

	get breadCrumbPath() {
		const currentRouteMetaBreadcrumb = router.currentRoute.value.meta
			.breadcrumb as RouteMetaBreadcrumbFunction
		return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
	}

	get isAuthenticated(): boolean {
		return this.authModule.isAuthenticated
	}

	get productReviewModuleNamespace() {
		return this.productReviewModule.getNamespace
	}

	get product(): ProductModel {
		return this.productModule.getProductData
	}

	get addToCartButtonText(): string {
		return this.productModule.addToCartButtonText
	}

	get disabled(): boolean {
		return this.product?.active === 'False' || this.product?.stock <= 0
	}

	get userId(): number | undefined {
		return this.userModule.getUserId
	}

	get userToProductReview(): ProductReviewModel {
		return this.productReviewModule.getUserToProductReview
	}

	get productReviewsAverage(): number {
		return this.productReviewModule.getProductReviewsAverage
	}

	get productReviewsCounter(): number {
		return this.productReviewModule.getProductReviewsCounter
	}

	get userHasAlreadyReviewedProduct(): boolean {
		return this.productReviewModule.getUserHasAlreadyReviewedProduct
	}

	unmounted() {
		this.productModule.setProduct(new ProductModel())
		this.productReviewModule.setUserToProductReview(new ProductReviewModel())
	}

	created(): void {
		this.productModule.fetchProductFromRemote().then(() => {
			this.productModule.updateProductHits()
			this.productReviewModule.fetchUserToProductReviewFromRemote({
				productId: this.productModule.getProductData.id,
				userId: this.userModule.getUserId
			})
		})
		this.emitter?.on('setProductReviewsAverage', (e) => {
			this.productReviewModule.setProductReviewsAverage(e)
		})
		this.emitter?.on('setProductReviewsCounter', (e) => {
			this.productReviewModule.setProductReviewsCounter(e)
		})
		this.emitter?.on('unsetUserToProductReview', () => {
			this.productReviewModule.unsetUserToProductReview()
		})
		this.emitter?.on('unsetProductReviews', () => {
			this.productReviewModule.unsetProductReviews()
		})
		this.emitter?.on('toggleReview', (e) => {
			this.productReviewModule.toggleReview({
				FormData: e,
				IsAuthenticated: this.authModule.isAuthenticated,
				productId: this.productModule.getProductData.id,
				userId: this.userModule.getUserId
			})
		})
		this.emitter?.on('deleteCurrentProductReview', (e) => {
			this.productReviewModule.deleteCurrentProductReview(e).then(() => {
				toast.success('Your Review has been deleted')
			})
		})
	}

	public addToCart(): void {
		if (isNaN(this.quantity) || this.quantity < 1) {
			this.quantity = 1
		}

		const item = {
			product: this.product,
			quantity: this.quantity
		}

		this.cartModule.addToCart(item)
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Product/Product';
</style>
