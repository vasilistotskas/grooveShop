<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
	// The text to display
	text: {
		type: String,
		required: true
	},
	// The number of characters to display before truncating
	maxChars: {
		type: Number,
		default: 100
	}
})

const { text, maxChars } = toRefs(props)

const uuid = uuidv4()
const { t } = useLang()
const showFullText = useState<boolean>(`${uuid}-read-more`, () => false)
const trimmedText =
	text.value.length > maxChars.value ? `${text.value.slice(0, maxChars.value)}...` : text

const toggleFullText = () => {
	showFullText.value = !showFullText.value
}
</script>

<template>
	<div class="relative">
		<div
			v-if="!showFullText"
			class="overflow-hidden text-gray-700 dark:text-gray-200"
			v-html="trimmedText"
		></div>
		<div
			v-else
			class="overflow-hidden text-gray-700 dark:text-gray-200"
			v-html="text"
		></div>
		<div class="absolute bottom-0 right-0">
			<button
				class="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100"
				@click="toggleFullText"
			>
				{{ showFullText ? t('readLess') : t('readMore') }}
			</button>
		</div>
	</div>
</template>
