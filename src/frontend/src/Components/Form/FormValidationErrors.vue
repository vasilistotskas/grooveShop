<template>
	<div v-if="errors.length > 0" class="errors">
		<p v-for="(error, i) in errors" :key="i">
			{{ error }}
		</p>
	</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		errors: {
			type: Array,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Form/FormValidationErrors.scss';
</style>
