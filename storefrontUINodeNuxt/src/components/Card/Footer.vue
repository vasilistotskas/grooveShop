<script setup lang="ts">
defineSlots<{
	default(props: {}): any
}>()
</script>

<template>
	<div
		class="card-footer px-6 py-2 text-sm bg-white dark:bg-slate-800 border-t border-gray-900/10 dark:border-gray-50/[0.2]"
	>
		<slot />
	</div>
</template>
