<script lang="ts" setup>
import { ITheme } from '~/utils/theme'
import { GlobalEvents } from '~/events/global'

const theme = useState<ITheme>('theme.current')
const config = useRuntimeConfig()

const route = useRoute()
const { t } = useI18n()
const title = computed(() =>
	t('layouts.title', { title: (route.meta.title as string) ?? config.public.appTitle })
)
const themeClass = computed(() => (theme.value === 'dark' ? 'dark' : 'light'))

const bus = useEventBus<string>(GlobalEvents.ON_LANGUAGE_SWITCHED)
bus.on((event: string, payload) => {
	console.log('ON_LANGUAGE_SWITCHED - Event', event, payload)
})
const i18nHead = useLocaleHead({
	addDirAttribute: true,
	addSeoAttributes: true,
	identifierAttribute: 'id'
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
	</Html>
</template>
