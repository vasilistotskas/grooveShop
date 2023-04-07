<script lang="ts" setup>
import { PropType } from 'vue'
import { Account } from '~/zod/user/account'

const props = defineProps({
	userAccount: {
		type: Object as PropType<Account | undefined>,
		required: true
	}
})

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
	<div v-if="userAccount" class="flex items-center">
		<div class="w-10 h-10 mr-3">
			<nuxt-img
				preload
				placeholder
				loading="lazy"
				provider="mediaStream"
				class="rounded-full"
				:style="{ objectFit: 'contain' }"
				:width="100"
				:height="100"
				:fit="'contain'"
				:position="'entropy'"
				:background="'transparent'"
				:trim-threshold="5"
				:format="imageExtension"
				sizes="sm:100vw md:50vw lg:100px"
				:src="imageSrc"
				:alt="userAccount.firstName + ' ' + userAccount.lastName"
			/>
		</div>
		<div class="flex flex-col">
			<span class="text-gray-700 dark:text-gray-200">{{ userAccount.firstName }}</span>
		</div>
	</div>
</template>
