<script lang="ts" setup>
defineProps({
	text: {
		type: String,
		default: ''
	}
})
</script>

<template>
	<div class="text-xl font-semibold mb-2">
		<p class="text-gray-700 dark:text-gray-200">
			<slot>
				{{ text }}
			</slot>
		</p>
	</div>
</template>
