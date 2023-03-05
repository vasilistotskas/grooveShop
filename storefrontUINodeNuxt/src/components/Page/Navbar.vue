<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import { GlobalEvents } from '~/events/global'

export interface IMenuItem {
	type: 'link' | 'button'
	text: string
	href?: any
	route?: any
}

const { t } = useLang()
const toast = useToast()
const app = useAppConfig() as AppConfigInput
const menus = computed((): IMenuItem[] => [
	{ type: 'link', text: t('pages.blank.nav'), route: { name: 'blank' } },
	{ type: 'link', text: t('pages.test.nav'), route: { name: 'test' } },
	{ type: 'link', text: t('pages.setting.nav'), route: { name: 'setting' } },
	{
		type: 'button',
		text: t('pages.dashboard.nav'),
		route: { name: 'dashboard' }
	}
])
const navbarModal = ref(null)
const bus = useEventBus<string>(GlobalEvents.GENERIC_MODAL)

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
				<h2 class="text-2xl font-bold">Header</h2>
			</div>
		</template>
		<template #body>
			<div>
				<p>Body</p>
			</div>
		</template>
		<template #footer>
			<div>
				<p>Footer</p>
			</div>
		</template>
	</GenericModal>

	<!-- button that opens the modal  -->
	<button type="button" class="text-white" @click="openModal">Open Modal</button>

	<BuilderNavbar>
		<template #banner>
			<div class="text-white text-xs text-center py-1 px-4 lg:px-8 capitalize">
				<span class="mr-1">
					{{ $t('banners.welcome', { app_name: app.name }) }}
				</span>
			</div>
		</template>
		<template #menu>
			<div class="relative hidden lg:flex items-center ml-auto">
				<nav class="text-sm leading-6 font-semibold text-gray-600 dark:text-gray-300">
					<ul class="flex items-center space-x-8">
						<li></li>
						<li v-for="(item, i) in menus" :key="i">
							<Anchor
								v-if="item.type === 'link'"
								:to="item.route ? item.route : undefined"
								:href="item.href ? item.href : undefined"
								:text="item.text"
								class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize"
								>{{ item.text }}</Anchor
							>
							<Button
								v-else-if="item.type === 'button'"
								:text="item.text"
								size="xs"
								class="font-extrabold capitalize"
								:to="item.route ? item.route : undefined"
								:href="item.href ? item.href : undefined"
							/>
						</li>
					</ul>
				</nav>
				<div
					class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2] text-gray-600 dark:text-gray-300"
				>
					<LanguageSwitcher />
					<ThemeSwitcher />
					<Anchor
						class="hover:no-underline hover:text-slate-900 hover:dark:text-white text-lg flex self-center items-center"
						href="https://github.com/vasilistotskas/grooveShop/storefrontUINodeNuxt"
						title="Github"
						:text="'Github'"
					>
						<IconMdi:github-face />
					</Anchor>
				</div>
			</div>
		</template>
		<template #options="{ toggleOptions }">
			<ActionSheet @on-close="toggleOptions(false)">
				<ActionSheetBody>
					<ActionSheetHeader text="Menu" />
					<nav class="leading-6 font-semibold text-gray-600 dark:text-gray-300">
						<ul class="flex flex-col">
							<li
								v-for="(item, i) in menus"
								:key="i"
								class="flex w-full"
								:class="{
									'pb-2 mb-2 border-b border-gray-900/10 dark:border-gray-50/[0.2]':
										item.type === 'link'
								}"
							>
								<Anchor
									v-if="item.type === 'link'"
									:to="item.route ? item.route : undefined"
									:href="item.href ? item.href : undefined"
									:text="item.text"
									class="flex-1 hover:no-underline capitalize"
									>{{ item.text }}</Anchor
								>
								<Button
									v-else-if="item.type === 'button'"
									:text="item.text"
									size="xs"
									class="flex-1 font-extrabold capitalize"
									:to="item.route ? item.route : undefined"
									:href="item.href ? item.href : undefined"
								/>
							</li>
						</ul>
					</nav>
					<div class="mt-6 text-sm font-bold capitalize">
						{{ $t('components.theme_switcher.change_theme') }}
					</div>
					<div class="mt-2">
						<ThemeSwitcher type="select-box" />
					</div>
					<div class="mt-6 text-sm font-bold capitalize">
						{{ $t('components.language_switcher.change_language') }}
					</div>
					<div class="mt-2">
						<LanguageSwitcher type="select-box" />
					</div>
				</ActionSheetBody>
				<Button
					type="secondary"
					title="Github"
					href="https://github.com/vasilistotskas/grooveShop/storefrontUINodeNuxt"
				>
					<IconMdi:github-face />
					<span class="ml-1">Github</span>
				</Button>
				<Button text="Close" type="secondary" @click.prevent="toggleOptions(false)" />
			</ActionSheet>
		</template>
	</BuilderNavbar>
</template>
