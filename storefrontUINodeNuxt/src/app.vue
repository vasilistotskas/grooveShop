<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import { AppSetup } from '~/utils/app'
import { ITheme } from '~/utils/theme'
AppSetup()
const theme = useState<ITheme>('theme.current')
const app = useAppConfig() as AppConfigInput
const config = useRuntimeConfig()

const { t } = useI18n()
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
