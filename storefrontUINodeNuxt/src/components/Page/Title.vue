<script lang="ts" setup>
defineProps({
	text: {
		type: String,
		default: ''
	}
})
</script>

<template>
	<div class="text-4xl font-bold">
		<h1>
			<slot>{{ text }}</slot>
		</h1>
	</div>
</template>
