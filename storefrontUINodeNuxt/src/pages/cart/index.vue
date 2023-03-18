<script lang="ts" setup>
import { useCartStore } from '~/stores/cart'
import { GlobalEvents } from '~/events/global'

const { t } = useI18n()
const config = useRuntimeConfig()
const store = useCartStore()

const { pending, refresh } = await useAsyncData('cart', () => store.initCart())
const { cart, error } = storeToRefs(store)

definePageMeta({
	layout: 'page',
	middleware: ['breadcrumbs']
})
useHead(() => ({
	title: t('pages.cart.title'),
	meta: [
		{
			name: 'description',
			content: t('pages.cart.description')
		},
		{
			name: 'keywords',
			content: t('pages.cart.keywords')
		}
	]
}))
useServerSeoMeta({
	title: t('pages.cart.title'),
	description: t('pages.cart.description')
})

const bus = useEventBus<string>(GlobalEvents.QUANTITY_SELECTOR)

bus.on((event, payload: { cartItemId: number; quantity: number }) => {
	switch (event) {
		case 'update':
			store.updateCartItem(payload.cartItemId, { quantity: String(payload.quantity) })
			refresh()
			break
		case 'delete':
			store.deleteCartItem(payload.cartItemId)
			refresh()
			break
	}
})
</script>

<template>
	<PageWrapper>
		<section>
			<PageTitle :text="$t('pages.cart.title')" class="capitalize" />
			<PageBody>
				<PageError v-if="error" :error="error"></PageError>
				<LoadingSkeleton
					:card-height="'300px'"
					:class="pending ? 'block' : 'hidden'"
					:loading="pending"
					:replicas="3"
				></LoadingSkeleton>
				<template v-if="cart?.cartItems.length">
					<CartItemCard
						v-for="(cartItem, index) in cart.cartItems"
						:key="index"
						:cart-item="cartItem"
					/>
				</template>
				<template v-else>
					<div class="flex flex-col items-center justify-center">
						<p class="text-center text-gray-700 dark:text-gray-200">
							{{ $t('pages.cart.empty') }}
						</p>
					</div>
				</template>
			</PageBody>
		</section>
	</PageWrapper>
</template>
