<script lang="ts" setup>
import { ITheme } from '~/utils/theme'

const theme = useState<ITheme>('theme.current')
const config = useRuntimeConfig()

const route = useRoute()
const { t } = useI18n()
const i18nHead = useLocaleHead({
	addDirAttribute: true,
	identifierAttribute: 'id',
	addSeoAttributes: true
})
const title = computed(() =>
	t('layouts.title', { title: (route.meta.title as string) ?? config.public.appTitle })
)
const themeClass = computed(() => (theme.value === 'dark' ? 'dark' : 'light'))

useHead({
	title: title.value,
	htmlAttrs: {
		class: themeClass,
		lang: i18nHead.value.htmlAttrs!.lang,
		dir: i18nHead.value.htmlAttrs!.dir
	},
	link: [...(i18nHead.value.link || [])],
	meta: [...(i18nHead.value.meta || [])]
})
</script>

<template>
	<Body class="bg-white text-white dark:bg-black dark:text-black">
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
			<Pwa></Pwa>
		</div>
	</Body>
</template>
