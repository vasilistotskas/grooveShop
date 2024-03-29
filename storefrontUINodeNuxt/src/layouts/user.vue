<script lang="ts" setup>
defineSlots<{
	default(props: {}): any
	main(props: {}): any
	header(props: {}): any
	footer(props: {}): any
	'app-before'(props: {}): any
	'app-after'(props: {}): any
}>()

const { t } = useLang()
const route = useRoute()

const userStore = useUserStore()

const { account, favourites, reviews, orders, pending, error } = storeToRefs(userStore)
</script>

<template>
	<div class="relative">
		<slot name="app-before" />
		<div id="app-before"></div>
		<main class="relative flex-1 flex flex-col w-full h-full">
			<div class="flex flex-col min-h-screen">
				<slot name="header">
					<UserNavbar>
						<template #drawer>
							<UserSidebar mode="mobile" />
						</template>
						<template v-if="account" #image>
							<UserAvatar :user-account="account" :img-width="40" :img-height="40" />
						</template>
					</UserNavbar>
				</slot>
				<slot name="main">
					<div class="mx-auto w-full container">
						<UserAccountInfo
							v-if="account"
							:account="account"
							:orders-count="orders?.length"
							:favourites-count="favourites?.length"
							:reviews-count="reviews?.length"
						/>
						<div class="relative mb-12 md:mb-20">
							<div class="flex-1 w-full flex flex-col md:gap-4">
								<div
									:class="[
										'relative flex-1 flex flex-col lg:flex-row mx-auto w-full h-full',
										{ 'flex-col': route.path === '/account' }
									]"
								>
									<div
										class="lg:pl-8 md:py-4 md:w-auto md:grid"
										:class="[
											{
												'grid w-full': route.path === '/account',
												hidden: route.path !== '/account'
											}
										]"
									>
										<UserSidebar />
									</div>
									<div class="flex flex-col w-full">
										<slot />
									</div>
								</div>
							</div>
						</div>
					</div>
				</slot>
				<slot name="footer">
					<PageFooter />
				</slot>
			</div>
		</main>
		<slot name="app-after" />
		<div id="app-after"></div>
		<Pwa />
	</div>
</template>
