<script lang="ts" setup>
import { AppSetup } from '~/utils/app'
import { ITheme } from '~/utils/theme'
import { GlobalEvents } from '~/events/global'

AppSetup()
const theme = useState<ITheme>('theme.current')
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const { t, locale, locales } = useLang()
const cartStore = useCartStore()

try {
	await cartStore.fetchCart()
} catch (error) {
	//
}
const refreshCart = async () => await cartStore.fetchCart()

const title = computed(() => {
	if ('title' in route.meta) {
		return route.meta.title as string
	}
	return config.public.appTitle
})
const description = computed(() => {
	if ('description' in route.meta) {
		return route.meta.description as string
	}
	return config.public.appDescription
})
const themeClass = computed(() => (theme.value === 'dark' ? 'dark' : 'light'))
const themeColor = computed(() => (theme.value === 'dark' ? '#1a202c' : '#ffffff'))

const langBus = useEventBus<string>(GlobalEvents.ON_LANGUAGE_SWITCHED)
langBus.on((event: string, payload) => {
	// ON_LANGUAGE_SWITCHED event
})

const cartBus = useEventBus<string>(GlobalEvents.ON_CART_UPDATED)
cartBus.on((event: string, payload) => {
	refreshCart()
})

const i18nHead = useLocaleHead({
	addDirAttribute: true,
	addSeoAttributes: true,
	identifierAttribute: 'hid',
	route,
	router,
	i18n: useI18n()
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
useSchemaOrg([
	defineOrganization({
		name: config.public.appTitle,
		logo: config.public.appImage,
		sameAs: [
			'https://www.facebook.com/...',
			'https://twitter.com/...',
			'https://www.instagram.com/...'
		]
	}),
	defineWebSite({
		url: config.public.baseUrl,
		name: config.public.appTitle,
		description: config.public.appDescription,
		inLanguage: locales.value.map((l: any) => l.iso)
	}),
	defineWebPage()
])
useServerSeoMeta({
	title: () => title.value,
	description: () => description.value,
	colorScheme: () => (theme.value === 'dark' ? 'dark' : 'light'),
	themeColor: () => themeColor.value,
	applicationName: () => config.public.appTitle,
	author: () => config.public.author.name,
	creator: () => config.public.author.name,
	publisher: () => config.public.author.name,
	ogSiteName: () => config.public.appTitle,
	ogImage: () => config.public.appImage,
	ogLocale: () => locale.value,
	ogLocaleAlternate: () => locales.value.map((l: any) => l.iso),
	fbAppId: () => config.public.facebookAppId,
	twitterCard: () => 'summary_large_image',
	twitterTitle: () => title.value,
	twitterDescription: () => description.value,
	twitterImage: () => config.public.appImage,
	mobileWebAppCapable: () => 'yes',
	msapplicationTileImage: () => config.public.appImage,
	msapplicationTileColor: () => themeColor.value
})
defineOgImageScreenshot({
	// wait 2seconds for animations
	delay: 2000,
	mask: '.cookieControl'
})
</script>

<template>
	<Body>
		<VitePwaManifest />
		<NuxtLoadingIndicator />
		<NuxtLayout>
			<SeoKit :language="locale" />
			<NuxtPage />
		</NuxtLayout>
		<CookieControl />
	</Body>
</template>
