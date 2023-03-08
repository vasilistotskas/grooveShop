<template>
	<div class="relative bg-gray-50 dark:bg-gray-900">
		<slot name="app-before" />
		<div id="app-before"></div>
		<main class="relative flex-1 flex flex-col mx-auto max-w-8xl w-full h-full">
			<div class="flex flex-col min-h-screen">
				<slot name="header">
					<PageNavbar />
				</slot>
				<div class="flex-1 w-full flex flex-col">
					<slot />
				</div>
				<slot name="footer">
					<PageFooter />
				</slot>
			</div>
		</main>
		<slot name="app-after" />
		<div id="app-after"></div>
		<Pwa></Pwa>
	</div>
</template>
