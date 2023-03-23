<script lang="ts" setup>
import { useCartStore } from '~/stores/cart'
import { GlobalEvents } from '~/events/global'

const { t } = useLang()
const config = useRuntimeConfig()
const store = useCartStore()
const toast = useToast()
const cartBus = useEventBus<string>(GlobalEvents.ON_CART_UPDATED)

const { cart, error, pending } = storeToRefs(store)

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

const querySelectorBus = useEventBus<string>(GlobalEvents.CART_QUANTITY_SELECTOR)

querySelectorBus.on((event, payload: { cartItemId: number; quantity: number }) => {
	switch (event) {
		case 'update':
			store
				.updateCartItem(payload.cartItemId, { quantity: String(payload.quantity) })
				.then(() => {
					toast.success(t('pages.cart.updated'))
					cartBus.emit(GlobalEvents.ON_CART_UPDATED)
				})
				.catch(() => {
					toast.error(t('pages.cart.update_error'))
				})
			break
		case 'delete':
			store
				.deleteCartItem(payload.cartItemId)
				.then(() => {
					toast.success(t('pages.cart.deleted'))
					cartBus.emit(GlobalEvents.ON_CART_UPDATED)
				})
				.catch(() => {
					toast.error(t('pages.cart.delete_error'))
				})
			break
	}
})
</script>

<template>
	<PageWrapper>
		<PageTitle :text="$t('pages.cart.title')" class="capitalize" />
		<PageBody>
			<PageError v-if="error" :error="error"></PageError>
			<h2>
				<Anchor
					:to="'checkout'"
					:text="'checkout'"
					class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize"
					>{{ $t('pages.cart.checkout') }}</Anchor
				>
			</h2>
			<LoadingSkeleton
				:card-height="'130px'"
				:class="
					pending ? 'block grid grid-rows-repeat-auto-fill-mimax-100-130 gap-4' : 'hidden'
				"
				:loading="pending"
				:direction="'row'"
				:columns-md="1"
				:columns-lg="1"
				:cart-body-paragraphs="5"
				:replicas="cart?.cartItems.length || 1"
			></LoadingSkeleton>
			<template v-if="cart?.cartItems.length">
				<div class="grid grid-rows-repeat-auto-fill-mimax-100-130 gap-4">
					<CartItemCard
						v-for="(cartItem, index) in cart.cartItems"
						:key="index"
						:cart-item="cartItem"
					/>
				</div>
			</template>
			<template v-else>
				<div class="flex flex-col items-center justify-center">
					<p class="text-center text-gray-700 dark:text-gray-200">
						{{ $t('pages.cart.empty') }}
					</p>
				</div>
			</template>
		</PageBody>
	</PageWrapper>
</template>
