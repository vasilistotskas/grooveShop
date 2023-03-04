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
		<p>
			<slot>
				{{ text }}
			</slot>
		</p>
	</div>
</template>
