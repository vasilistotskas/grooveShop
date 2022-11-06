<template>
	<div class="container mt-7 mb-5 content-min-height">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<div class="cart-grid-container">
			<div v-if="cartTotalLength" class="grid-container-item-two">
				<div class="grid-container-table">
					<div>Product</div>
					<div>Price</div>
					<div>Quantity</div>
					<div>Total</div>
				</div>
				<div class="grid-container-table-items">
					<CartItem v-for="item in cart" :key="item.product.id" :item="item" />
				</div>
			</div>
			<div v-else class="cart-empty">
				<p>Your Cart is Empty...</p>
			</div>

			<div class="grid-container-item-three">
				<div class="grid-container-child-one">
					<h2 class="subtitle">Summary</h2>
					<strong>${{ cartTotalPrice.toFixed(2) }}</strong
					>, {{ cartTotalLength }} items
				</div>
				<div class="grid-container-child-two">
					<RouterLink
						aria-label="Checkout"
						class="btn-outline-primary-one"
						title="Checkout"
						to="/cart/checkout"
						type="button"
					>
						Proceed to checkout
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { inject } from 'vue'
import router from '@/Routes'
import { Emitter } from 'mitt'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import CartModule from '@/State/Cart/CartModule'
import { getModule } from 'vuex-module-decorators'
import CartItem from '@/Components/Cart/CartItem.vue'
import CartItemModel from '@/State/Cart/CartItemModel'
import { CartEvents } from '@/Emitter/Type/Cart/Events'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'

@Component({
	name: 'Cart',
	components: {
		CartItem,
		Breadcrumbs
	}
})
export default class Cart extends Vue {
	cartModule = getModule(CartModule)
	emitter: Emitter<CartEvents> | undefined = inject('emitter')

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: 'Cart',
				description: 'Cart'
			}))
		)
		return { meta }
	})

	created(): void {
		this.emitter?.on('decrementQuantity', (e) => {
			this.cartModule.decrementQuantity(e)
		})
		this.emitter?.on('incrementQuantity', (e) => {
			this.cartModule.incrementQuantity(e)
		})
		this.emitter?.on('removeFromCart', (e) => {
			this.cartModule.removeFromCart(e)
		})
	}

	get breadCrumbPath() {
		return router.currentRoute.value.meta.breadcrumb
	}

	get cart(): Array<CartItemModel> {
		return this.cartModule.getCart
	}

	get cartTotalLength(): number {
		return this.cartModule.getCartTotalLength
	}

	get cartTotalPrice(): number {
		return this.cartModule.getCartTotalPrice
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Cart/Cart';
</style>
