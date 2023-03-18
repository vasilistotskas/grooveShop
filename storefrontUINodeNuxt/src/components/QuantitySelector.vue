<script lang="ts" setup>
import { GlobalEvents } from '~/events/global'

const props = defineProps({
	quantity: { type: Number, required: true, default: 1 },
	max: { type: Number, required: true, default: 1 },
	cartItemId: { type: Number, required: true }
})
const bus = useEventBus<string>(GlobalEvents.QUANTITY_SELECTOR)
const { quantity, max, cartItemId } = toRefs(props)

const decreaseQuantityEvent = () => {
	if (quantity.value <= 1) return
	bus.emit('update', {
		quantity: quantity.value - 1,
		cartItemId: cartItemId.value
	})
}
const increaseQuantityEvent = () => {
	if (quantity.value >= max.value) return
	bus.emit('update', {
		quantity: quantity.value + 1,
		cartItemId: cartItemId.value
	})
}
const changeQuantityEvent = (event: Event) => {
	if (!(event.target instanceof HTMLSelectElement)) return
	const value = parseInt(event.target.value)
	bus.emit('update', {
		quantity: value,
		cartItemId: cartItemId.value
	})
}
</script>

<template>
	<div class="quantity-selector">
		<button
			:disabled="quantity <= 1"
			:aria-label="'decrease'"
			type="button"
			@click="decreaseQuantityEvent"
		>
			<icon-fa-solid:minus />
		</button>
		<select :value="quantity" :aria-label="'quantity'" @change="changeQuantityEvent">
			<option v-for="i in max" :key="i" :value="i" :selected="i === quantity">
				{{ i }}
			</option>
		</select>

		<button
			:disabled="quantity >= max"
			:aria-label="'increase'"
			type="button"
			@click="increaseQuantityEvent"
		>
			<icon-fa-solid:plus />
		</button>
	</div>
</template>
