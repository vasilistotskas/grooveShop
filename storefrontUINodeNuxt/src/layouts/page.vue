<template>
	<div class="relative bg-gray-50 dark:bg-gray-900">
		<slot name="app-before" />
		<div id="app-before"></div>
		<div class="flex flex-col min-h-screen">
			<slot name="header">
				<PageNavbar />
			</slot>
			<div class="flex-1 w-full flex flex-col">
				<div class="relative flex-1 flex flex-col mx-auto max-w-8xl w-full h-full">
					<slot />
				</div>
			</div>
			<slot name="footer">
				<PageFooter />
			</slot>
		</div>
		<slot name="app-after" />
		<div id="app-after"></div>
		<ClientOnly>
			<div v-if="$pwa?.offlineReady || $pwa?.needRefresh" class="pwa-toast" role="alert">
				<div class="message">
					<span v-if="$pwa.offlineReady"> App ready to work offline </span>
					<span v-else> New content available, click on reload button to update. </span>
				</div>
				<button v-if="$pwa.needRefresh" @click="$pwa.updateServiceWorker()">
					Reload
				</button>
				<button @click="$pwa.cancelPrompt()">Close</button>
			</div>
			<div
				v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
				class="pwa-toast"
				role="alert"
			>
				<div class="message">
					<span> Install PWA </span>
				</div>
				<button @click="$pwa.install()">Install</button>
				<button @click="$pwa.cancelInstall()">Cancel</button>
			</div>
		</ClientOnly>
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
