<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import { AppSetup } from '~/utils/app'
import { ITheme } from '~/utils/theme'
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
	t('layouts.title', { title: (route.meta.title as string) ?? config.public.appTitle })
)
</script>

<template>
	<div>
		<VitePwaManifest />
		<NuxtLoadingIndicator />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
