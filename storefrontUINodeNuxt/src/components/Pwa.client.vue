<script lang="ts" setup>
const { $pwa } = useNuxtApp()
</script>
<template>
	<div id="pwa">
		<div v-if="$pwa?.offlineReady || $pwa?.needRefresh" class="pwa-toast" role="alert">
			<div class="message">
				<span v-if="$pwa.offlineReady" class="text-gray-700 dark:text-gray-200">
					App ready to work offline
				</span>
				<span v-else class="text-gray-700 dark:text-gray-200">
					New content available, click on reload button to update.
				</span>
			</div>
			<button v-if="$pwa.needRefresh" type="button" @click="$pwa.updateServiceWorker()">
				Reload
			</button>
			<button type="button" @click="$pwa.cancelPrompt()">Close</button>
		</div>
		<div
			v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
			class="pwa-toast"
			role="alert"
		>
			<div class="message">
				<span class="text-gray-700 dark:text-gray-200"> Install PWA </span>
			</div>
			<button type="button" @click="$pwa.install()">Install</button>
			<button type="button" @click="$pwa.cancelInstall()">Cancel</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.pwa-toast {
	position: fixed;
	right: 0;
	bottom: 0;
	margin: 16px;
	padding: 12px;
	border: 1px solid #8885;
	border-radius: 4px;
	z-index: 1;
	text-align: left;
	box-shadow: 3px 4px 5px 0 #8885;
}
.pwa-toast .message {
	margin-bottom: 8px;
}
.pwa-toast button {
	border: 1px solid #8885;
	outline: none;
	margin-right: 5px;
	border-radius: 2px;
	padding: 3px 10px;
}
</style>
