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

const title = computed(() =>
	t('layouts.title', { title: (route.meta.title as string) ?? config.public.appTitle })
)
const themeClass = computed(() => (theme.value === 'dark' ? 'dark' : 'light'))
const themeColor = computed(() => (theme.value === 'dark' ? '#1a202c' : '#ffffff'))

const bus = useEventBus<string>(GlobalEvents.ON_LANGUAGE_SWITCHED)
bus.on((event: string, payload) => {
	console.log('ON_LANGUAGE_SWITCHED - Event', event, payload)
})
const i18nHead = useLocaleHead({
	addDirAttribute: true,
	addSeoAttributes: true,
	identifierAttribute: 'id'
})
useServerSeoMeta({
	colorScheme: computed(() => (theme.value === 'dark' ? 'dark' : 'light')),
	applicationName: computed(() => config.public.appTitle),
	author: computed(() => config.public.author.name),
	creator: computed(() => config.public.author.name),
	publisher: computed(() => config.public.author.name),
	ogLocale: computed(() => locale.value)
})
</script>

<template>
	<Html
		:class="themeClass"
		:lang="i18nHead.htmlAttrs?.lang"
		:dir="i18nHead.htmlAttrs?.dir"
	>
		<Head>
			<Title>{{ title }}</Title>
			<template v-for="link in i18nHead.link" :key="link.id">
				<Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
			</template>
			<template v-for="meta in i18nHead.meta" :key="meta.id">
				<Meta :id="meta.id" :property="meta.property" :content="meta.content" />
			</template>
		</Head>
		<Body class="bg-white text-white dark:bg-black dark:text-black">
			<VitePwaManifest />
			<NuxtLoadingIndicator />
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</Body>
	</Html>
</template>
