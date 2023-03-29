<script lang="ts" setup>
interface IMenuItem {
	type: 'link' | 'button'
	text: string
	href?: any
	route?: any
}

const { t } = useLang()
const consoleLogImageLoaded = () => {
	// Image loaded
}
const menus = computed((): IMenuItem[] => [
	{ type: 'link', text: t('pages.testing.blank.nav'), route: { name: 'testing-blank' } },
	{ type: 'link', text: t('pages.testing.test.nav'), route: { name: 'testing-test' } },
	{
		type: 'link',
		text: t('pages.testing.setting.nav'),
		route: { name: 'testing-setting' }
	},
	{
		type: 'button',
		text: t('pages.testing.nav'),
		route: { name: 'testing' }
	}
])
</script>

<template>
	<BuilderNavbar>
		<template #menu>
			<nav class="text-sm leading-6 font-semibold text-gray-700 dark:text-gray-200">
				<ul class="flex items-center space-x-8">
					<li></li>
					<li v-for="(item, i) in menus" :key="i">
						<Anchor
							v-if="item.type === 'link'"
							:to="item.route ? item.route : undefined"
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
			<div class="relative hidden lg:flex items-center ml-auto">
				<div class="flex items-center justify-center">
					<nuxt-img
						preload
						placeholder
						loading="lazy"
						provider="mediaStream"
						class="rounded-full"
						:style="{ objectFit: 'contain' }"
						:src="`static/images/websiteLogo`"
						:width="150"
						:height="42"
						:fit="'contain'"
						:position="'entropy'"
						:background="'transparent'"
						:trim-threshold="5"
						:format="'png'"
						sizes="sm:75vw md:125vw lg:275px"
						alt="Avatar of Jonathan Reinink"
						@load="consoleLogImageLoaded"
					/>
					<span class="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
						>Alfian</span
					>
					<span class="text-gray-700 dark:text-gray-200"><IconUil:angle-down /></span>
				</div>
				<div
					class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]"
				>
					<LanguageSwitcher />
					<ThemeSwitcher />
					<Anchor
						:text="'Github'"
						class="hover:no-underline hover:text-slate-900 hover:dark:text-white text-lg flex self-center items-center text-gray-700 dark:text-gray-200"
						href="https://github.com/vasilistotskas/grooveShop/storefrontUINodeNuxt"
						title="Github"
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
					<nav class="leading-6 font-semibold text-gray-700 dark:text-gray-200">
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
				</ActionSheetBody>
				<Button
					type="secondary"
					title="Github"
					href="https://github.com/vasilistotskas/grooveShop/storefrontUINodeNuxt"
				>
					<IconMdi:github-face />
					<span class="ml-1 text-gray-700 dark:text-gray-200">Github</span>
				</Button>
				<Button text="Close" type="secondary" @click.prevent="toggleOptions(false)" />
			</ActionSheet>
		</template>
		<template #drawer>
			<slot name="drawer" />
		</template>
	</BuilderNavbar>
</template>
