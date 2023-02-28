<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import { AppSetup } from './utils/app'
import { ITheme } from './utils/theme'
AppSetup()
const theme = useState<ITheme>('theme.current')
const locale = useState<string>('locale.setting')
const app = useAppConfig() as AppConfigInput
const config = useRuntimeConfig()

const route = useRoute()
const { t } = useI18n()
const head = useLocaleHead({
	addDirAttribute: true,
	identifierAttribute: 'id',
	addSeoAttributes: true
})
const title = computed(() =>
	t('layouts.title', { title: t((route.meta.title as string) ?? config.public.appTitle) })
)
</script>

<template>
	<Html
		:class="`${theme === 'dark' ? 'dark' : ''}`"
		:lang="head.htmlAttrs?.lang"
		:dir="head.htmlAttrs?.dir"
	>
		<Head>
			<Title>{{ title }}</Title>
			<template v-for="link in head.link" :key="link.id">
				<Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
			</template>
			<template v-for="meta in head.meta" :key="meta.id">
				<Meta :id="meta.id" :property="meta.property" :content="meta.content" />
			</template>
		</Head>
		<Body class="bg-white text-white dark:bg-black dark:text-black">
			<NuxtLayout>
				<NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
				<NuxtPage />
			</NuxtLayout>
		</Body>
	</Html>
</template>
