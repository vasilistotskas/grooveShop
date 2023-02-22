<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import { AppSetup } from './utils/app'
import { ITheme } from './utils/theme'
AppSetup()
const theme = useState<ITheme>('theme.current')
const locale = useState<string>('locale.setting')
const app = useAppConfig() as AppConfigInput

useHead({
	title: app.name,
	titleTemplate: '%s - Nuxt 3',
	meta: [
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{
			hid: 'description',
			name: 'description',
			content: 'Nuxt 3'
		}
	],
	link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
})
</script>

<template>
	<Html :class="`${theme === 'dark' ? 'dark' : ''}`" :lang="locale">
		<Body class="bg-white text-white dark:bg-black dark:text-black">
			<NuxtLayout>
				<NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
				<NuxtPage />
			</NuxtLayout>
		</Body>
	</Html>
</template>