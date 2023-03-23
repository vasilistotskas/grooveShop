<script lang="ts" setup>
import { CartItem } from '~/zod/cart/cart-item'
import { useCartStore } from '~/stores/cart'
import { GlobalEvents } from '~/events/global'

const { contentShorten } = useText()
const store = useCartStore()

const props = defineProps({
	cartItem: { type: Object as PropType<CartItem>, required: true, default: null }
})
const { cartItem } = toRefs(props)

const product = computed(() => cartItem.value.product)

const imageFilename = computed(() => {
	if (!cartItem.value?.product.mainImageFilename) return undefined
	return product.value.mainImageFilename.split('.').slice(0, -1).join('.')
})
const resolveImageFileExtension = computed(() => {
	if (!cartItem.value?.product.mainImageFilename) return undefined
	return product.value.mainImageFilename.split('.').pop()
})
const bus = useEventBus<string>(GlobalEvents.CART_QUANTITY_SELECTOR)
const cartItemQuantity = useState<number>(
	`${cartItem.value.id}-quantity`,
	() => cartItem.value.quantity
)
</script>

<template>
	<div
		class="grid grid-cols-6 items-center gap-4 py-4 bg-white dark:bg-slate-800 border rounded-md border-gray-900/10 dark:border-gray-50/[0.2]"
	>
		<div class="image">
			<Anchor :to="`/product${product?.absoluteUrl}`" :title="product.name">
				<nuxt-img
					preload
					placeholder
					loading="lazy"
					provider="mediaStream"
					class="product_img"
					:width="262"
					:height="100"
					:fit="'contain'"
					:position="'entropy'"
					:background="'transparent'"
					:trim-threshold="5"
					:format="resolveImageFileExtension"
					sizes="sm:100vw md:50vw lg:262px"
					:src="`media/uploads/products/${imageFilename}` || '/images/placeholder.png'"
					:alt="product.name"
				/>
			</Anchor>
		</div>
		<div class="title">
			<h3 class="text-gray-700 dark:text-gray-200">
				<Anchor :to="`/product${product?.absoluteUrl}`" :title="product.name">{{
					contentShorten(product.name, 50)
				}}</Anchor>
			</h3>
		</div>
		<div class="quantity">
			<QuantitySelector
				:quantity="cartItemQuantity"
				:max="product.stock"
				:cart-item-id="cartItem.id"
			/>
		</div>
		<div class="price">
			<span class="text-gray-700 dark:text-gray-200">{{ product.finalPrice }}</span>
		</div>
		<div class="total-price">
			<span class="text-gray-700 dark:text-gray-200">{{ cartItem.totalPrice }}</span>
		</div>
		<div class="remove-from-cart">
			<button
				class="text-gray-700 dark:text-gray-200"
				:title="`Remove from cart ${product.name}`"
				type="button"
				@click="bus.emit('delete', { cartItemId: cartItem.id })"
			>
				<icon-fa-solid:trash />
			</button>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
