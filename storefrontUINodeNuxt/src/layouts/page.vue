<template>
	<div class="relative bg-gray-50 dark:bg-gray-900">
		<slot name="app-before" />
		<div id="app-before"></div>
		<slot name="header">
			<PageHeader>
				<PageNavbar />
			</PageHeader>
		</slot>
		<div class="relative flex-1 flex flex-col mx-auto max-w-8xl w-full h-full">
			<PageMain>
				<Breadcrumbs />
				<section class="flex flex-col min-h-screen">
					<div class="flex-1 w-full flex flex-col">
						<slot />
					</div>
				</section>
			</PageMain>
		</div>
		<slot name="footer">
			<PageFooter />
		</slot>
		<slot name="app-after" />
		<div id="app-after"></div>
		<Pwa></Pwa>
	</div>
</template>
