<script lang="ts" setup>
const consoleLogImageLoaded = () => {
	console.log('Image loaded')
}
</script>

<template>
	<BuilderNavbar>
		<template #menu>
			<div class="relative hidden lg:flex items-center ml-auto">
				<div class="flex items-center justify-center">
					<nuxt-img
						preload
						loading="lazy"
						class="rounded-full"
						src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
						alt="Avatar of Jonathan Reinink"
						sizes="sm:100vw md:50vw lg:1.5vw"
						format="webp"
						@load="consoleLogImageLoaded"
					/>
					<span class="ml-2 text-sm font-semibold">Alfian</span>
					<IconUil:angle-down />
				</div>
				<div
					class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]"
				>
					<LanguageSwitcher />
					<ThemeSwitcher />
					<Anchor
						class="hover:no-underline hover:text-slate-900 hover:dark:text-white text-lg flex self-center items-center"
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
		<template #drawer>
			<slot name="drawer" />
		</template>
	</BuilderNavbar>
</template>
