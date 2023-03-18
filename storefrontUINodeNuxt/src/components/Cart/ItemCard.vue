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
const productId = computed(() => product.value.id)

const imageFilename = computed(() => {
	if (!cartItem.value?.product.mainImageFilename) return undefined
	return product.value.mainImageFilename.split('.').slice(0, -1).join('.')
})
const resolveImageFileExtension = computed(() => {
	if (!cartItem.value?.product.mainImageFilename) return undefined
	return product.value.mainImageFilename.split('.').pop()
})
const bus = useEventBus<string>(GlobalEvents.QUANTITY_SELECTOR)
</script>

<template>
	<div class="grid">
		<div class="image">
			<nuxt-img
				preload
				placeholder
				loading="lazy"
				provider="mediaStream"
				class="product_img"
				:width="60"
				:height="70"
				:fit="'contain'"
				:position="'entropy'"
				:background="'transparent'"
				:trim-threshold="5"
				:format="resolveImageFileExtension"
				sizes="sm:100vw md:50vw lg:60px"
				:src="`media/uploads/products/${imageFilename}` || '/images/placeholder.png'"
				:alt="product.name"
			/>
		</div>
		<div class="title">
			<h3>
				<Anchor
					:to="{
						name: 'product',
						params: {
							id: product.id,
							slug: product.slug
						}
					}"
					>{{ contentShorten(product.name, 50) }}</Anchor
				>
			</h3>
		</div>
		<div class="quantity">
			<QuantitySelector
				:quantity="cartItem.quantity"
				:max="product.stock"
				:cart-item-id="cartItem.id"
			/>
		</div>
		<div class="remove-from-cart">
			<button
				:title="`Remove from cart ${product.name}`"
				type="button"
				@click="bus.emit('delete', { cartItemId: cartItem.id })"
			>
				<icon-fa-solid:trash />
			</button>
		</div>
		<div class="price">
			<span>{{ product.finalPrice }}</span>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
