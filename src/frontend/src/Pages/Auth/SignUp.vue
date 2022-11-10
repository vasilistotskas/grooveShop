<template>
	<div class="page-sign-up mt-7 mb-5">
		<div class="container">
			<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
			<template v-if="signupModule.getRegistrationLoading"> loading... </template>
			<template v-else-if="!signupModule.getRegistrationCompleted">
				<div class="card sign-up-card">
					<div class="card-body card-body-border-top">
						<h1 class="plr-15 mb-3 mt-3">Sign Up</h1>
						<form
							@submit="myContext.onSubmit"
							class="_form"
							id="SignUpForm"
							name="SignUpForm"
						>
							<div class="container">
								<div class="email mb-3">
									<label for="email" class="label mb-2">Email</label>
									<div class="_container">
										<input
											v-model="myContext.email"
											id="email"
											name="email"
											type="email"
											class="_input"
											placeholder="Email"
											autocomplete="email"
										/>
									</div>
									<span class="validation-errors">{{ myContext.errors.email }}</span>
								</div>
								<div class="password mb-3">
									<label for="password" class="label mb-2">Password</label>
									<div class="_container">
										<input
											v-model="myContext.password"
											id="password"
											name="password"
											type="password"
											class="_input"
											placeholder="Password"
											autocomplete="current-password"
										/>
									</div>
									<span class="validation-errors">{{ myContext.errors.password }}</span>
								</div>

								<div class="confirm-password mb-4">
									<label for="password" class="label mb-2">Confirm Password</label>
									<div class="_container">
										<input
											v-model="myContext.confirmPassword"
											id="confirmPassword"
											name="confirmPassword"
											type="password"
											class="_input"
											placeholder="Confirm Password"
											autocomplete="new-password"
										/>
									</div>
									<span class="validation-errors">{{
										myContext.errors.confirmPassword
									}}</span>
								</div>
								<span v-show="signupModule.getRegistrationError" class="error">
									An error occurred while processing your request.
								</span>
								<button
									v-if="!myContext.isTooManyAttempts"
									class="btn btn-outline-primary-one green-bg"
									title="Sign Up"
								>
									Sign Up
								</button>
								<span v-else>Too many attempts try again later</span>
							</div>
							<p class="register-login-field mt-4 mb-4">
								Or
								<RouterLink aria-label="Log In" title="Log In" to="/log-in">
									click here
								</RouterLink>
								to log in!
							</p>
						</form>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="registration-complete-message container mt-5">
					<div class="registration-complete-message-content">
						<span>
							Registration complete. You should receive an email shortly with instructions
							on how to activate your account.
						</span>
						<p class="mt-3">
							If you cant find email check your spam folder , if its not there click
							<span class="registration-resend-action" @click="activationEmailResend"
								>Here</span
							>
							to receive new activation email.
						</p>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import * as zod from 'zod'
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import { useField, useForm } from 'vee-validate'
import zodPassword from '@/Helpers/Zod/Password'
import { getModule } from 'vuex-module-decorators'
import { toFormValidator } from '@vee-validate/zod'
import SignUpModule from '@/State/Auth/SignUp/SignUpModule'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import SignUpInputApi from '@/State/Auth/Interface/SignUpInputApi'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import VerifyEmailResendInput from '@/Pages/Auth/VerifyEmailResendInput.vue'

@Component({
	name: 'Register',
	components: {
		Breadcrumbs,
		VerifyEmailResendInput
	}
})
export default class Register extends Vue {
	signupModule = getModule(SignUpModule)
	activationEmailAtLocalStorage = false

	myContext = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: 'Register',
				description: 'Register'
			}))
		)

		const validationSchema = toFormValidator(
			zod
				.object({
					email: zod.string().email(),
					password: zodPassword,
					confirmPassword: zodPassword
				})
				.superRefine(({ confirmPassword, password }, ctx) => {
					if (confirmPassword !== password) {
						ctx.addIssue({
							code: 'custom',
							message: 'The passwords did not match',
							path: ['confirmPassword']
						})
					}
				})
		)
		const { handleSubmit, errors, submitCount } = useForm({
			validationSchema
		})

		const { value: email } = useField('email')
		const { value: password } = useField('password')
		const { value: confirmPassword } = useField('confirmPassword')

		const isTooManyAttempts = computed(() => {
			return submitCount.value >= 10
		})

		const onSubmit = handleSubmit(async () => {
			try {
				const apiData: SignUpInputApi = {
					first_name: 'who',
					last_name: 'me',
					email: email.value,
					password: password.value,
					re_password: confirmPassword.value
				}
				await this.signupModule.setRegistrationEmail(apiData.email)
				await this.signupModule.createAccount(apiData as FormData)
			} catch (e) {
				console.log(e)
			}
		})

		return {
			validationSchema,
			onSubmit,
			errors,
			email,
			password,
			confirmPassword,
			isTooManyAttempts,
			meta
		}
	})

	get breadCrumbPath() {
		return router.currentRoute.value.meta.breadcrumb
	}

	updated(): void {
		const emailFromLocalStorage = this.signupModule.getRegistrationEmail
		if (emailFromLocalStorage) this.activationEmailAtLocalStorage = true
	}

	activationEmailResend(): void {
		const email = localStorage.getItem('registrationEmail')

		if (email) {
			this.signupModule.activationEmailResend(email)
		} else {
			router.push('/accounts/activate/verify_mail_resend')
		}
	}

	beforeRouteLeave(
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) {
		this.signupModule.clearRegistrationStatus()
		next()
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Form/FormProvider';
@import '@/Assets/Styles/Components/Form/FormBaseTextarea';
@import '@/Assets/Styles/Components/Form/FormBaseInput';
@import '@/Assets/Styles/Pages/Auth/SignUp';
</style>
