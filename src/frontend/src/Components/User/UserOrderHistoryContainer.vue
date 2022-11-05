<template>
	<div
		v-if="order && Object.keys(order).length > 0"
		class="card-body card-body-order-history"
	>
		<h3 class="is-size-4 mb-3">Order #{{ order.id }}</h3>
		<div class="order-history-grid-head">
			<span />
			<span>Product</span>
			<span>Price</span>
			<span>Quantity</span>
			<span>Total</span>
		</div>
		<UserOrderHistoryCard
			v-for="item in order.items"
			:key="item.product.id"
			:product="item.product"
			:order-total="orderTotal"
			:quantity="item.quantity"
			class="order-history-grid-body"
		/>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { forEach } from 'lodash'
import UserOrderModel from '@/State/User/Order/UserOrderModel'
import OrderItemModel from '@/State/User/Order/OrderItemModel'
import { Options as Component, Vue } from 'vue-class-component'
import Pagination from '@/Components/Pagination/Pagination.vue'
import UserOrderHistoryCard from '@/Components/User/UserOrderHistoryCard.vue'

@Component({
	name: 'UserOrderHistoryContainer',
	components: {
		Pagination,
		UserOrderHistoryCard
	},
	props: {
		order: Object as PropType<UserOrderModel>
	}
})
export default class UserOrderHistoryContainer extends Vue {
	order!: UserOrderModel

	get orderTotal(): number {
		let total = 0
		forEach(this.order.items, (item: OrderItemModel) => {
			total += item.quantity * item.product.price
		})
		return total
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/User/UserOrderHistory';
</style>
