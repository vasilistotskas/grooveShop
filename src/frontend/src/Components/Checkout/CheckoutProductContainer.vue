<template>
	<div v-if="cart && Object.keys(cart).length > 0" class="checkout-grid-order-info">
		<div class="checkout-grid-title">
			<h2 class="title">Your Items</h2>
		</div>
		<div class="checkout-grid-head">
			<CheckoutProductCard v-for="item in cart" :key="item.product.id" :item="item" />
		</div>
		<div class="checkout-product-container-extra_costs">
			<span class="checkout-product-container-extra_costs-shipping">
				<span class="checkout-product-container-extra_costs-shipping-title"
					>Shipping costs</span
				>
				<span class="checkout-product-container-extra_costs-shipping-price">3€</span>
			</span>
			<span class="checkout-product-container-extra_costs-pay_way">
				<span class="checkout-product-container-extra_costs-pay_way-title"
					>Payment costs</span
				>
				<span class="checkout-product-container-extra_costs-pay_way-price">{{
					payWayExtraCost()
				}}</span>
			</span>
		</div>
		<div class="checkout-grid-head-part-three">
			<span>Total:</span>
			<span>${{ cartTotalPriceForPayWay.toFixed(2) }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { getModule } from 'vuex-module-decorators'
import PayWayModel from '@/State/Payway/PayWayModel'
import CartItemModel from '@/State/Cart/CartItemModel'
import PayWayModule from '@/State/Payway/PayWayModule'
import { Options as Component, Vue } from 'vue-class-component'
import CheckoutProductCard from '@/Components/Checkout/CheckoutProductCard.vue'

@Component({
	name: 'CheckoutProductContainer',
	components: {
		CheckoutProductCard
	},
	props: {
		cart: Array as PropType<Array<CartItemModel>>,
		cartTotalLength: Number,
		cartTotalPriceForPayWay: Number,
		cartTotalPrice: Number
	}
})
export default class CheckoutProductContainer extends Vue {
	payWayModule = getModule(PayWayModule)
	cart!: Array<CartItemModel>
	cartTotalLength = 0
	cartTotalPrice = 0
	cartTotalPriceForPayWay = 0

	get getSelectedPayWay(): PayWayModel {
		return this.payWayModule.getSelectedPayWay
	}

	public payWayExtraCost(): string {
		const payWay = this.getSelectedPayWay

		if (
			payWay.free_for_order_amount < this.cartTotalPrice ||
			Object.keys(payWay).length <= 0
		) {
			return 'Free'
		}
		return payWay.cost + '€'
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Checkout/Checkout';
</style>
