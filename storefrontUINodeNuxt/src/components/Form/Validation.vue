<script lang="ts" setup>
import { FieldContext, useField, useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { z } from 'zod'

const ZodLogin = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

const validationSchema = toFormValidator(ZodLogin)
const { handleSubmit, errors, submitCount } = useForm({
	validationSchema
})

const { value: email }: FieldContext<string> = useField('email')
const { value: password }: FieldContext<string> = useField('password')

const tooManyAttempts = computed(() => {
	return submitCount.value >= 10
})

const onSubmit = handleSubmit((e) => {
	e.preventDefault()
	console.log('event', e)
})
</script>

<template>
	<form id="logInForm" class="_form" name="logInForm" @submit="onSubmit">
		<div class="grid">
			<label class="text-gray-700 dark:text-gray-200 mb-2" for="email">{{
				$t('components.form.validation.email')
			}}</label>
			<div>
				<FormTextInput
					id="email"
					v-model="email"
					class="text-gray-700 dark:text-gray-200 mb-2"
					name="email"
					type="email"
					:placeholder="$t('components.form.validation.email')"
					autocomplete="email"
				/>
			</div>
			<span class="text-gray-700 dark:text-gray-200">{{ errors.email }}</span>
		</div>
		<div>
			<label class="text-gray-700 dark:text-gray-200 mb-2" for="password">{{
				$t('components.form.validation.password')
			}}</label>
			<div>
				<FormTextInput
					id="password"
					v-model="password"
					class="text-gray-700 dark:text-gray-200 mb-2"
					name="password"
					type="password"
					:placeholder="$t('components.form.validation.password')"
					autocomplete="current-password"
				/>
			</div>
			<span class="text-gray-700 dark:text-gray-200">{{ errors.password }}</span>
		</div>
		<Button v-if="!tooManyAttempts" type="submit">
			{{ $t('components.form.validation.submit') }}
		</Button>
		<Button v-else type="button" disabled>
			{{ $t('components.form.validation.too_many_attempts') }}
		</Button>
	</form>
</template>
