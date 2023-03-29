<script lang="ts" setup>
import { PropType } from 'vue'
import { Product } from '~/zod/product/product'
import { useCartStore } from '~/stores/cart'
import { GlobalEvents } from '~/events/global'

const { t } = useLang()
const store = useCartStore()
const toast = useToast()

const cartBus = useEventBus<string>(GlobalEvents.ON_CART_UPDATED)

const props = defineProps({
	product: { type: Object as PropType<Product>, required: true, default: null },
	quantity: { type: Number, required: true, default: 1 },
	text: {
		type: String,
		required: true
	}
})
</script>

<template>
	<Button
		class="w-full md:w-auto"
		type="button"
		size="lg"
		:text="text"
		@click.prevent="
			store
				.addCartItem({
					product: String(product.id),
					quantity: String(quantity)
				})
				.then(() => {
					toast.success(t('components.add_to_cart_button.added_to_cart'))
					cartBus.emit(GlobalEvents.ON_CART_UPDATED)
				})
		"
	/>
</template>
