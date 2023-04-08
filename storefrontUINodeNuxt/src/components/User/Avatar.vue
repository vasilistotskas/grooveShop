<script lang="ts" setup>
import { Account } from '~/zod/user/account'

const props = withDefaults(
	defineProps<{
		userAccount?: Account | null
		showName?: boolean
		imgWidth?: number | string
		imgHeight?: number | string
	}>(),
	{
		userAccount: null,
		showName: true,
		imgWidth: 100,
		imgHeight: 100
	}
)

const { resolveImageFilenameNoExt, resolveImageFileExtension, resolveImageSrc } =
	useImageResolver()

const imageExtension = computed(() => {
	return resolveImageFileExtension(props.userAccount?.mainImageFilename)
})
const imageSrc = computed(() => {
	return resolveImageSrc(
		props.userAccount?.mainImageFilename,
		`media/uploads/users/${resolveImageFilenameNoExt(
			props.userAccount?.mainImageFilename
		)}`
	)
})
</script>

<template>
	<div class="flex items-center" :class="[showName ? 'gap-2' : 'gap-0']">
		<div
			class="user__avatar"
			:style="{
				width: typeof imgWidth === 'number' ? imgWidth + 'px' : imgWidth,
				height: typeof imgHeight === 'number' ? imgHeight + 'px' : imgHeight
			}"
		>
			<nuxt-img
				preload
				placeholder
				loading="lazy"
				provider="mediaStream"
				class="rounded-full"
				:style="{ objectFit: 'contain' }"
				:width="imgWidth || 100"
				:height="imgHeight || 100"
				:fit="'contain'"
				:position="'entropy'"
				:background="'transparent'"
				:trim-threshold="5"
				:format="imageExtension"
				sizes="`sm:100vw md:50vw lg:auto`"
				:src="imageSrc"
				:alt="userAccount?.firstName + ' ' + userAccount?.lastName"
			/>
		</div>
		<div v-if="showName" class="flex flex-col">
			<span class="text-gray-700 dark:text-gray-200">{{ userAccount?.firstName }}</span>
		</div>
	</div>
</template>
