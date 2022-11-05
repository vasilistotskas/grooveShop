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
						<ProductReview />
					</div>
				</div>
			</div>
		</div>
	</div>
	<ProductReviews v-if="product.id" :product="product" />
</template>

<script lang="ts">
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import AppModule from '@/State/App/AppModule'
import CartModule from '@/State/Cart/CartModule'
import { getModule } from 'vuex-module-decorators'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import ProductModel from '@/State/Product/ProductModel'
import UserModule from '@/State/User/Profile/UserModule'
import ProductModule from '@/State/Product/ProductModule'
import FavouriteButton from '@/Utilities/FavouriteButton.vue'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import ProductReview from '@/Components/Product/ProductReview.vue'
import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes'
import ProductReviews from '@/Components/Product/ProductReviews.vue'
import { ImageTypeOptions } from '@/Helpers/MediaStream/ImageUrlEnum'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { RouteMetaBreadcrumbFunction } from '@/Routes/Type/BreadcrumbItemType'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons/faShoppingBag'
import { faShippingFast } from '@fortawesome/free-solid-svg-icons/faShippingFast'
import ProductFavouriteModule from '@/State/Product/Favourite/ProductFavouriteModule'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'

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
	appModule = getModule(AppModule)
	userModule = getModule(UserModule)
	productModule = getModule(ProductModule)
	cartModule = getModule(CartModule)
	productFavouriteModule = getModule(ProductFavouriteModule)

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

	get product(): ProductModel {
		return this.productModule.getProductData
	}

	get userId(): number | undefined {
		return this.userModule.getUserId
	}

	get addToCartButtonText(): string {
		return this.productModule.addToCartButtonText
	}

	get disabled(): boolean {
		return this.product.active === 'False' || this.product.stock <= 0
	}

	created(): void {
		this.productModule.fetchProductFromRemote().then(() => {
			this.productModule.updateProductHits()
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
