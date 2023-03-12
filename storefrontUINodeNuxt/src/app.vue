<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import { AppSetup } from '~/utils/app'
import { ITheme } from '~/utils/theme'
import { GlobalEvents } from '~/events/global'

AppSetup()
const theme = useState<ITheme>('theme.current')
const app = useAppConfig() as AppConfigInput
const config = useRuntimeConfig()
const route = useRoute()
const { t } = useI18n()
const { locale, locales } = useI18n()

const title = computed(() => (route.meta.title as string) || config.public.appTitle)
const description = computed(
	() => (route.meta.description as string) || config.public.appDescription
)
const themeClass = computed(() => (theme.value === 'dark' ? 'dark' : 'light'))
const themeColor = computed(() => (theme.value === 'dark' ? '#1a202c' : '#ffffff'))

const bus = useEventBus<string>(GlobalEvents.ON_LANGUAGE_SWITCHED)
bus.on((event: string, payload) => {
	// ON_LANGUAGE_SWITCHED event
})
const i18nHead = useLocaleHead({
	addDirAttribute: true,
	addSeoAttributes: true,
	identifierAttribute: 'id'
})
useHead({
	htmlAttrs: {
		lang: i18nHead.value.htmlAttrs!.lang,
		class: () => themeClass.value,
		dir: i18nHead.value.htmlAttrs?.dir
	},
	link: [...(i18nHead.value.link || [])],
	meta: [...(i18nHead.value.meta || [])]
})
useServerSeoMeta({
	title: () => title.value,
	description: () => description.value,
	colorScheme: () => (theme.value === 'dark' ? 'dark' : 'light'),
	themeColor: () => themeColor.value,
	applicationName: () => config.public.appTitle,
	author: () => config.public.author.name,
	creator: () => config.public.author.name,
	publisher: () => config.public.author.name,
	ogLocale: () => locale.value
})
</script>

<template>
	<Body class="bg-white text-white dark:bg-black dark:text-black">
		<VitePwaManifest />
		<NuxtLoadingIndicator />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</Body>
</template>
