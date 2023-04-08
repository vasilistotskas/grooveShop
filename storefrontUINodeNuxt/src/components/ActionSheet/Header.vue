<script lang="ts" setup>
defineProps({
	text: {
		type: String,
		default: ''
	}
})
</script>

<template>
	<div class="text-gray-700 dark:text-gray-200 text-xs font-bold text-center mb-2">
		<slot>{{ text }}</slot>
	</div>
</template>
