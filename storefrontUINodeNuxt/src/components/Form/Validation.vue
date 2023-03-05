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
		<div>
			<label for="email">Email</label>
			<div>
				<input
					id="email"
					v-model="email"
					name="email"
					type="email"
					placeholder="Email"
					autocomplete="email"
				/>
			</div>
			<span>{{ errors.email }}</span>
		</div>
		<div>
			<label for="password">Password</label>
			<div>
				<input
					id="password"
					v-model="password"
					name="password"
					type="password"
					placeholder="Password"
					autocomplete="current-password"
				/>
			</div>
			<span>{{ errors.password }}</span>
		</div>
		<button v-if="!tooManyAttempts" type="submit">Submit</button>
		<button v-else type="button" disabled>
			Too many attempts, please try again later.
		</button>
	</form>
</template>
