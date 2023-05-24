<script lang="ts" setup>
import { PropType } from 'vue'
import { CartItem } from '~/zod/cart/cart-item'

const props = defineProps({
	items: { type: Array as PropType<CartItem[]>, required: true },
	shippingPrice: { type: Number, required: true },
	totalDiscountValue: { type: Number, required: true },
	totalItems: { type: Number, required: true },
	totalItemsUnique: { type: Number, required: true },
	totalPrice: { type: Number, required: true },
	totalVatValue: { type: Number, required: true }
})
</script>

<template>
	<div class="sidebar grid gap-2 md:gap-4 relative">
		<slot name="pay-ways"></slot>
		<slot name="items"></slot>
		<div class="sidebar__container">
			<div class="sidebar__title hidden">
				<h3 class="text-gray-700 dark:text-gray-200">
					{{ $t('components.checkout.sidebar.title') }}
				</h3>
			</div>
			<div class="sidebar__list">
				<div class="sidebar__list__item">
					<div class="sidebar__list__item__title">
						<span class="text-gray-700 dark:text-gray-200">{{
							$t('components.checkout.sidebar.items')
						}}</span>
					</div>
					<div class="sidebar__list__item__value">
						<span class="text-gray-700 dark:text-gray-200">
							{{ props.totalItems }}
						</span>
					</div>
				</div>
				<div class="sidebar__list__item">
					<div class="sidebar__list__item__title">
						<span class="text-gray-700 dark:text-gray-200">
							{{ $t('components.checkout.sidebar.items_unique') }}
						</span>
					</div>
					<div class="sidebar__list__item__value">
						<span class="text-gray-700 dark:text-gray-200">
							{{ props.totalItemsUnique }}
						</span>
					</div>
				</div>
				<div class="sidebar__list__item">
					<div class="sidebar__list__item__title">
						<span class="text-gray-700 dark:text-gray-200">
							{{ $t('components.checkout.sidebar.shipping') }}
						</span>
					</div>
					<div class="sidebar__list__item__value">
						<span class="text-gray-700 dark:text-gray-200"
							>{{ props.shippingPrice }}€
						</span>
					</div>
				</div>
				<div class="sidebar__list__item">
					<div class="sidebar__list__item__title">
						<span class="text-gray-700 dark:text-gray-200">
							{{ $t('components.checkout.sidebar.discount') }}
						</span>
					</div>
					<div class="sidebar__list__item__value">
						<span class="text-gray-700 dark:text-gray-200"
							>{{ props.totalDiscountValue }}€</span
						>
					</div>
				</div>
				<div class="sidebar__list__item">
					<div class="sidebar__list__item__title">
						<span class="text-gray-700 dark:text-gray-200">
							{{ $t('components.checkout.sidebar.vat') }}
						</span>
					</div>
					<div class="sidebar__list__item__value">
						<span class="text-gray-700 dark:text-gray-200"
							>{{ props.totalVatValue }}€</span
						>
					</div>
				</div>
				<div class="sidebar__list__item">
					<div class="sidebar__list__item__title">
						<span class="text-gray-700 dark:text-gray-200">
							{{ $t('components.checkout.sidebar.total') }}
						</span>
					</div>
					<div class="sidebar__list__item__value">
						<span class="text-gray-700 dark:text-gray-200">{{ props.totalPrice }}€</span>
					</div>
				</div>
			</div>
		</div>
		<slot name="button"></slot>
	</div>
</template>

<style lang="scss" scoped>
.sidebar {
	grid-template-rows: 1fr auto auto;

	&__list {
		&__item {
			display: flex;
			gap: 5px;
		}
	}
}
</style>