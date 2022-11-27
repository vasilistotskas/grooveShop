<template>
	<div v-if="address && Object.keys(address).length > 0">
		{{ address }}
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options as Component, Vue } from 'vue-class-component'
import AddressModel from '@/State/Address/AddressModel'

@Component({
	name: 'AddressCard',
	props: {
		address: Object as PropType<AddressModel>
	}
})
export default class AddressCard extends Vue {
	address!: AddressModel
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Address/AddressCard';
</style>
