<script lang="ts" setup>
defineProps({
	text: {
		type: String,
		default: ''
	}
})
</script>

<template>
	<div class="text-2xl font-semibold mb-2">
		<slot
			><p>{{ text }}</p></slot
		>
	</div>
</template>
