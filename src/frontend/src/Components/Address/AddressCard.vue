<template>
	<div v-if="address && Object.keys(address).length > 0">
		{{ address }}
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Address } from '@/Zod/Address/ZodAddress'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'AddressCard',
	props: {
		address: Object as PropType<Address>
	}
})
export default class AddressCard extends Vue {
	address!: Address
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Address/AddressCard.scss';
</style>
