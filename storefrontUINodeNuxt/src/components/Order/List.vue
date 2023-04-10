<script lang="ts" setup>
import { PropType } from 'vue'
import { Order } from '~/zod/order/order'

const props = defineProps({
	orders: {
		type: Array as PropType<Order[]>,
		required: true
	}
})

const { t } = useLang()
</script>

<template>
	<div class="order__list">
		<div class="order__list__header"></div>
		<div class="order__list__body">
			<OrderCard v-for="order in orders" :key="order.id" :order="order" />
		</div>
		<div class="order__list__footer"></div>
	</div>
</template>

<style lang="scss" scoped>
.order__list {
	width: 100%;
	display: grid;
	@media screen and (min-width: 1200px) {
		max-width: 1070px;
		margin: 0 auto;
	}
	&__header {
		display: grid;
		gap: 1rem;
	}
	&__header__item {
		display: grid;
		gap: 0.5rem;
		justify-items: start;
	}
	&__body {
		display: grid;
		gap: 1rem;
	}
	&__footer {
		display: grid;
		gap: 1rem;
	}
	&__footer__item {
		display: grid;
		gap: 0.5rem;
		justify-items: start;
	}
}
</style>
