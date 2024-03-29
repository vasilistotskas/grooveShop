<script lang="ts" setup>
import { PropType } from 'vue'
import { ButtonSize, ButtonStyle, ButtonType } from '~/zod/global/button'

const props = defineProps({
	text: {
		type: String,
		default: ''
	},
	type: {
		type: String as PropType<ButtonType>,
		default: 'button',
		validator: (value: string) =>
			['button', 'link', 'submit', 'reset', 'input'].includes(value)
	},
	style: {
		type: String as PropType<ButtonStyle>,
		default: 'primary',
		validator: (value: string) =>
			['primary', 'secondary', 'opposite', 'success', 'danger', 'info'].includes(value)
	},
	size: {
		type: String as PropType<ButtonSize>,
		default: 'md',
		validator: (value: string) => ['lg', 'md', 'sm', 'xs'].includes(value)
	},
	to: {
		type: [String, Object],
		default: undefined
	},
	href: {
		type: String,
		default: undefined
	}
})

defineSlots<{
	default(props: {}): any
	icon(props: {}): any
}>()

const localePath = useLocalePath()

// state:styles
const defaultStyle = `
  cursor-pointer
  border transition-color duration-300
  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:dark:ring-offset-gray-50 focus:dark:ring-gray-400 focus:ring-gray-600/[0.6] focus:ring-offset-gray-800/[0.6]
  flex items-center justify-center font-semibold;
`
const styles = reactive<{
	[key: string]: string
}>({
	none: '',
	primary:
		'primary-btn text-gray-700 dark:text-gray-200 hover:bg-primary-400 border-primary-500',
	secondary:
		'secondary-btn text-gray-700 dark:text-gray-200 bg-gray-200 border-gray-200 hover:bg-gray-300 dark:border-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700',
	opposite:
		'opposite-btn text-gray-700 dark:text-gray-700 bg-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-900  dark:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:border-white',
	success:
		'success-btn text-white dark:text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700',
	danger:
		'danger-btn text-white dark:text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700',
	info: 'info-btn text-white dark:text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
})
const sizes = reactive<{
	[key: string]: string
}>({
	lg: 'h-13 px-8 py-2 text-lg rounded-lg',
	md: 'h-10 px-6 text-base rounded',
	sm: 'h-9 px-4 text-sm rounded',
	xs: 'h-6 px-3 text-xs rounded'
})

// state
const selectedStyle = computed(() =>
	styles[props.style] ? styles[props.style] : styles.primary
)
const selectedSize = computed(() => sizes[props.size] || sizes.lg)

// methods
const onClick = (event: MouseEvent) => {
	const router = useRouter()
	if (props.to) {
		router.push(props.to)
	}
	if (!props.href) {
		event.preventDefault()
	}
}
</script>

<template>
	<NuxtLink
		v-if="to && type === 'link'"
		tag="a"
		:aria-label="text"
		:to="localePath(to)"
		:class="`${defaultStyle} ${selectedStyle} ${selectedSize}`"
		:title="text"
	>
		<slot>{{ text }}</slot>
		<slot name="icon"></slot>
	</NuxtLink>
	<button
		v-else-if="type === 'button' || type === 'submit' || type === 'reset'"
		:type="type"
		:class="`${defaultStyle} ${selectedStyle} ${selectedSize}`"
		:aria-label="text"
		:title="text"
		@click="onClick"
	>
		<slot>{{ text }}</slot>
		<slot name="icon"></slot>
	</button>
	<input
		v-else-if="type === 'input'"
		type="submit"
		:value="text"
		:name="text"
		:class="`${defaultStyle} ${selectedStyle} ${selectedSize}`"
		:title="text"
	/>
	<a
		v-else
		:class="`${defaultStyle} ${selectedStyle} ${selectedSize}`"
		:href="href"
		:aria-label="text"
		:title="text"
		@click="onClick"
	>
		<slot>{{ text }}</slot>
		<slot name="icon"></slot>
	</a>
</template>
