<script lang="ts" setup>
// components
const PageWrapper = resolveComponent('PageWrapper')

// compiler macro
const props = defineProps({
	code: {
		type: Number,
		default: 400
	},
	wrap: {
		type: Boolean,
		default: false
	}
})

const { code, wrap } = toRefs(props)

// computed
const errorsMap: {
	[key: string]: string
} = {
	'400': 'Bad Request',
	'401': 'Unauthorized',
	'403': 'Forbidden',
	'404': 'Not Found'
}
const error = computed(() => {
	const { code } = props
	return {
		code,
		message: errorsMap[code.toString()] || 'Unknown Error'
	}
})
</script>

<template>
	<component
		:is="wrap ? PageWrapper as string : 'div'"
		:class="
			wrap
				? 'flex flex-col items-center justify-center'
				: 'grid items-center justify-center gap-4'
		"
	>
		<h1 class="text-center mb-6 leading-3 text-gray-700 dark:text-gray-200">
			<span class="text-gray-700 dark:text-gray-200 font-bold text-8xl block">{{
				error.code
			}}</span>
			<span class="text-gray-700 dark:text-gray-200 block italic">{{
				error.message
			}}</span>
		</h1>
		<Button text="Home" to="/" size="sm" />
	</component>
</template>
