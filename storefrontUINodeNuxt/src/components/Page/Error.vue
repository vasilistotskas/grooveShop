<script lang="ts" setup>
import { FetchError } from 'ofetch'

defineProps({
	error: {
		type: Object as PropType<FetchError>,
		required: true,
		default: null
	}
})
</script>

<template>
	<div v-if="error" class="error">
		<p class="text-gray-700 dark:text-gray-200">
			<slot>{{ error }}</slot>
		</p>
	</div>
	<div v-else style="display: none">
		<slot />
	</div>
</template>
