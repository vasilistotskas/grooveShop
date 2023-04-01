<script lang="ts" setup>
import { GlobalEvents } from '~/events/global'
import { useCartStore } from '~/stores/cart'

const config = useRuntimeConfig()
const { t } = useLang()
const toast = useToast()
const navbarModal = ref(null)
const bus = useEventBus<string>(GlobalEvents.GENERIC_MODAL)
const store = useCartStore()

const { cart } = storeToRefs(store)

const openModal = () => {
	bus.emit('modal-open-navbarModal')
}
bus.on((event: string) => {
	if (event === 'modal-opened-navbarModal') {
		toast.success('Modal opened')
	}
	if (event === 'modal-closed-navbarModal') {
		toast.error('Modal closed')
	}
})
</script>

<template>
	<GenericModal
		ref="navbarModal"
		unique-id="navbarModal"
		exit-modal-icon-class="fa fa-times"
		modal-open-trigger-handler-id="modal-open-navbarModal"
		modal-close-trigger-handler-id="modal-close-navbarModal"
		modal-opened-trigger-handler-id="modal-opened-navbarModal"
		modal-closed-trigger-handler-id="modal-closed-navbarModal"
		max-width="700px"
		max-height="100%"
		width="auto"
		height="auto"
	>
		<template #header>
			<div>
				<h2 class="text-gray-700 dark:text-gray-200 text-2xl font-bold">Header</h2>
			</div>
		</template>
		<template #body>
			<div>
				<p class="text-gray-700 dark:text-gray-200">Body</p>
			</div>
		</template>
		<template #footer>
			<div>
				<p class="text-gray-700 dark:text-gray-200">Footer</p>
			</div>
		</template>
	</GenericModal>

	<BuilderNavbar>
		<template v-if="false" #banner>
			<div class="text-white text-xs text-center py-1 px-4 lg:px-8 capitalize">
				<span class="mr-1 text-gray-700 dark:text-gray-200">
					{{ $t('banners.welcome', { app_name: config.public.appTitle }) }}
				</span>
			</div>
		</template>
		<template #menu>
			<div class="relative hidden lg:flex items-center ml-auto">
				<nav class="text-sm leading-6 font-semibold text-gray-700 dark:text-gray-200">
					<ul class="flex items-center space-x-8">
						<li class="flex w-full gap-4">
							<Anchor
								:to="'products'"
								:text="'products'"
								class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize"
								>{{ $t('pages.products.title') }}</Anchor
							>
							<!-- button that opens the modal  -->
							<button
								type="button"
								class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize"
								@click="openModal"
							>
								Open Modal
							</button>
							<Anchor
								:to="'testing'"
								:text="'testing'"
								class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize"
								>{{ $t('pages.testing.title') }}</Anchor
							>
						</li>
					</ul>
				</nav>
				<ul
					class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2] text-gray-700 dark:text-gray-200"
				>
					<li class="relative">
						<LanguageSwitcher />
					</li>
					<li class="relative">
						<ThemeSwitcher />
					</li>
					<li class="relative">
						<span class="cart-items-count" :data-count="cart?.totalItems"></span>
						<Anchor
							class="hover:no-underline hover:text-slate-900 hover:dark:text-white text-lg flex self-center items-center"
							:to="'cart'"
							title="Cart"
							:text="'Cart'"
						>
							<icon-fa6-solid:cart-shopping />
						</Anchor>
					</li>
				</ul>
			</div>
		</template>
		<template #options="{ toggleOptions }">
			<ActionSheet @on-close="toggleOptions(false)">
				<ActionSheetBody>
					<ActionSheetHeader text="Menu" />
					<nav class="leading-6 font-semibold text-gray-700 dark:text-gray-200">
						<ul class="flex flex-col">
							<li
								class="flex w-full pb-2 mb-2 border-b border-gray-900/10 dark:border-gray-50/[0.2] link"
							>
								<Anchor
									:to="'products'"
									:text="'products'"
									class="flex-1 hover:no-underline capitalize"
									>{{ $t('pages.products.title') }}</Anchor
								>
								<Anchor
									:to="'testing'"
									:text="'testing'"
									class="flex-1 hover:no-underline capitalize"
									>{{ $t('pages.testing.title') }}</Anchor
								>
							</li>
						</ul>
					</nav>
					<div class="text-gray-700 dark:text-gray-200 mt-6 text-sm font-bold capitalize">
						{{ $t('components.theme_switcher.change_theme') }}
					</div>
					<div class="mt-2">
						<ThemeSwitcher type="select-box" />
					</div>
					<div class="text-gray-700 dark:text-gray-200 mt-6 text-sm font-bold capitalize">
						{{ $t('components.language_switcher.change_language') }}
					</div>
					<div class="mt-2">
						<LanguageSwitcher type="select-box" />
					</div>
					<Anchor
						class="text-gray-700 dark:text-gray-200 hover:no-underline hover:text-slate-900 hover:dark:text-white text-lg flex self-center items-center justify-center gap-2 mt-4"
						:to="'cart'"
						title="Cart"
						:text="'Cart'"
					>
						<icon-fa6-solid:cart-shopping />
						<span class="ml-1 text-gray-700 dark:text-gray-200">Cart</span>
					</Anchor>
				</ActionSheetBody>
				<Button text="Close" type="secondary" @click.prevent="toggleOptions(false)" />
			</ActionSheet>
		</template>
	</BuilderNavbar>
</template>

<style lang="scss" scoped>
.cart-items-count {
	&::before {
		content: attr(data-count);
		display: grid;
		position: absolute;
		top: -5px;
		align-items: center;
		justify-content: center;
		width: 70%;
		height: 70%;
		border-radius: 50%;
		background: #eb2e2b;
		cursor: pointer;
		color: #fff;
		font-size: 10px;
		pointer-events: none;
		right: -5px;
		z-index: 10;
	}
}
</style>
