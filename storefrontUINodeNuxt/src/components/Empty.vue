<script lang="ts" setup>
const props = defineProps({
	text: {
		type: String,
		required: true
	}
})

const { text } = toRefs(props)
</script>

<template>
	<div class="flex flex-col items-center justify-center">
		<p class="text-center text-gray-700 dark:text-gray-200">
			{{ text }}
		</p>
	</div>
</template>
