<script lang="ts" setup>
import { TransitionChild, TransitionRoot } from '@headlessui/vue'

export type IStyles = 'primary' | 'success' | 'warning' | 'danger'

const props = defineProps({
	title: {
		type: String,
		default: undefined
	},
	text: {
		type: String,
		default: undefined
	},
	type: {
		type: String,
		default: 'primary',
		validator: (value: string) =>
			['primary', 'success', 'warning', 'danger'].includes(value)
	}
})

defineSlots<{
	icon(props: {}): any
	title(props: {}): any
}>()

const styles = reactive<{
	[key: string]: string
}>({
	primary: '',
	success:
		'dark:from-green-500/50 via-gray-200 to-gray-200 dark:via-slate-800 dark:to-slate-800',
	warning:
		'dark:from-yellow-500/50 via-gray-200 to-gray-200 dark:via-slate-800 dark:to-slate-800',
	danger:
		'dark:from-red-500/50 via-gray-200 to-gray-200 dark:via-slate-800 dark:to-slate-800'
})
const textStyles = reactive<{
	[key: string]: string
}>({
	primary: 'text-white',
	success: 'text-green-500',
	warning: 'text-orange-500',
	danger: 'text-red-500'
})

const isDestroyed = ref<Boolean>(false)
const selectedType = computed<IStyles>((): IStyles => {
	if (!props.type) return 'primary'
	if (['primary', 'success', 'warning', 'danger'].includes(props.type))
		return props.type as IStyles
	return 'primary'
})
const selectedStyle = computed(() => styles[selectedType.value])
const selectedTextStyle = computed(() => textStyles[selectedType.value])

// actions
const close = () => {
	isDestroyed.value = true
}
</script>

<template>
	<TransitionRoot :show="!isDestroyed" appear>
		<TransitionChild
			as="template"
			enter="duration-300 ease-out"
			enter-from="opacity-0"
			enter-to="opacity-100"
			leave="duration-300 ease-in"
			leave-from="opacity-100"
			leave-to="opacity-0"
		>
			<div
				:class="`bg-gray-200 dark:bg-slate-800 bg-gradient-to-r shadow-white/50 dark:shadow-slate-900/50 px-6 py-6 rounded-md shadow-lg space-x-6 ${selectedStyle}`"
			>
				<div class="flex items-center justify-center">
					<slot name="icon">
						<IconMdi:checkCircle
							v-if="selectedType === 'success'"
							:class="`text-2xl ${selectedTextStyle}`"
						/>
						<IconClarity:timesCircleSolid
							v-if="selectedType === 'danger'"
							:class="`text-2xl ${selectedTextStyle}`"
						/>
						<IconBi:exclamationCircleFill
							v-if="selectedType === 'warning'"
							:class="`text-2xl ${selectedTextStyle}`"
						/>
					</slot>
				</div>
				<div class="flex-1">
					<div :class="`font-bold text-lg mb-0.5 ${selectedTextStyle}`">
						<slot name="title">{{ title }}</slot>
					</div>
					<div>
						<p class="text-gray-700 dark:text-gray-100">
							<slot name="title">{{ text }}</slot>
						</p>
					</div>
				</div>
				<div>
					<button
						type="button"
						class="text-slate-600 hover:text-red-500 dark:text-gray-400 font-bold"
						@click="close"
					>
						<span class="hidden">{{ title }}</span>
						<IconClarity:timesLine />
					</button>
				</div>
			</div>
		</TransitionChild>
	</TransitionRoot>
</template>
