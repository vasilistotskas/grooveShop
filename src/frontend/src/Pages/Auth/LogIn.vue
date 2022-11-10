<template>
	<div class="page-log-in mt-7 mb-5">
		<div class="container">
			<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
			<div class="card login-card">
				<div class="card-body card-body-border-top">
					<h1 class="plr-15 mb-3 mt-3">Log In</h1>
					<form
						@submit="myContext.onSubmit"
						class="_form"
						id="logInForm"
						name="logInForm"
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
							<div class="password mb-4">
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
							<button
								v-if="!myContext.isTooManyAttempts"
								class="btn btn-outline-primary-one green-bg"
								title="Log In"
							>
								Log In
							</button>
							<span v-else>Too many attempts try again later</span>
						</div>

						<div class="login-grid-part-one mb-3">
							<div class="grid-item-one">
								<div class="form-check">
									<input
										id="form2Example3"
										checked
										class="form-check-input form-check-input-main"
										type="checkbox"
										value=""
									/>
									<label class="form-check-label" for="form2Example3">
										Remember me
									</label>
								</div>
							</div>
							<div class="grid-item-two">
								<RouterLink title="Password Reset" to="/password_reset">
									Forgot password?
								</RouterLink>
							</div>
						</div>
					</form>

					<!-- Register buttons -->
					<div class="login-register-field">
						<p class="mb-1">
							Not a member?
							<RouterLink aria-label="Sign Up" title="Sign Up" to="/sign-up">
								Register
							</RouterLink>
						</p>
						<p class="mb-3">or sign up with:</p>
					</div>

					<div class="login-grid-part-socials mb-3">
						<!-- Facebook -->
						<a
							class="btn btn-outline-primary btn-floating mx-1"
							href="#!"
							role="button"
							title="Sign Up with Facebook"
						>
							<font-awesome-icon
								:icon="facebookIcon"
								:style="{ color: '#4267B2' }"
								size="lg"
							/>
						</a>

						<!-- Google -->
						<a
							class="btn btn-outline-primary btn-floating mx-1"
							href="#!"
							role="button"
							title="Sign Up with Google"
						>
							<font-awesome-icon
								:icon="googleIcon"
								:style="{ color: '#DB4437' }"
								size="lg"
							/>
						</a>
					</div>
				</div>
			</div>
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
import AuthModule from '@/State/Auth/Auth/AuthModule'
import UserModule from '@/State/User/Profile/UserModule'
import LogInInputApi from '@/State/Auth/Interface/LogInInputApi'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'

@Component({
	name: 'LogIn',
	components: {
		Breadcrumbs
	}
})
export default class LogIn extends Vue {
	userModule = getModule(UserModule)
	authModule = getModule(AuthModule)
	googleIcon = faGoogle
	facebookIcon = faFacebook

	myContext = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: 'Log In',
				description: 'Log In'
			}))
		)

		const validationSchema = toFormValidator(
			zod.object({
				email: zod.string().email(),
				password: zodPassword
			})
		)
		const { handleSubmit, errors, submitCount } = useForm({
			validationSchema
		})

		const { value: email } = useField('email')
		const { value: password } = useField('password')

		const isTooManyAttempts = computed(() => {
			return submitCount.value >= 10
		})

		const onSubmit = handleSubmit(async () => {
			try {
				const apiData: LogInInputApi = {
					email: email.value,
					password: password.value
				}
				await this.authModule
					.login(apiData)
					.then(() => {
						this.userModule.fetchUserDataFromRemote()
					})
					.catch((error: Error) => {
						console.log(error)
					})
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
			isTooManyAttempts,
			meta
		}
	})

	get breadCrumbPath() {
		return router.currentRoute.value.meta.breadcrumb
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Form/FormProvider';
@import '@/Assets/Styles/Components/Form/FormBaseTextarea';
@import '@/Assets/Styles/Components/Form/FormBaseInput';
@import '@/Assets/Styles/Pages/Auth/LogIn';
</style>
