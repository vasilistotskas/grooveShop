<template>
	<div id="password-reset-confirm-view" class="container mt-7 mb-5">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<div class="card password-reset-card">
			<div class="card-body card-body-border-top">
				<div>
					<font-awesome-icon :icon="lockIcon" size="4x" />
				</div>
				<h1>Reset Password Confirm</h1>
				<template v-if="resetLoading"> loading... </template>
				<template v-else-if="!resetCompleted">
					<form
						@submit="myContext.onSubmit"
						class="_form"
						id="userPasswordForm"
						name="userPasswordForm"
					>
						<div class="grid-account-password-fields">
							<div class="new_password">
								<label for="new_password" class="label mb-2">New Password</label>
								<div class="_container">
									<input
										v-model="myContext.new_password"
										id="new_password"
										name="new_password"
										type="password"
										class="_input"
										placeholder="New Password"
										autocomplete="new_password"
									/>
								</div>
								<span class="validation-errors">{{ myContext.errors.new_password }}</span>
							</div>
							<div class="re_new_password">
								<label for="re_new_password" class="label mb-2"
									>Retype New Password</label
								>
								<div class="_container">
									<input
										v-model="myContext.re_new_password"
										id="re_new_password"
										name="re_new_password"
										type="password"
										class="_input"
										placeholder="Retype New Password"
										autocomplete="re_new_password"
									/>
								</div>
								<span class="validation-errors">{{
									myContext.errors.re_new_password
								}}</span>
							</div>
							<div class="button">
								<button
									v-if="!myContext.isTooManyAttempts"
									class="btn btn-outline-primary-one green-bg"
									:title="submitButtonText"
								>
									{{ submitButtonText }}
								</button>
								<span v-else>Too many attempts try again later</span>
							</div>
						</div>
					</form>

					<span v-show="resetError" class="error">
						A error occurred while processing your request.
					</span>
				</template>
				<template v-else>
					<span>Your password has been reset.</span>
					<RouterLink aria-label="Log In" title="Log In" to="/log-in">
						return to login page
					</RouterLink>
				</template>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import * as zod from 'zod'
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { useRoute } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { useField, useForm } from 'vee-validate'
import zodPassword from '@/Helpers/Zod/Password'
import { getModule } from 'vuex-module-decorators'
import { toFormValidator } from '@vee-validate/zod'
import PasswordModule from '@/State/Auth/Password/PasswordModule'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'
import ResetPasswordInputApi from '@/State/Auth/Interface/ResetPasswordInputApi'

@Component({
	name: 'PasswordRestConfirm',
	components: {
		Breadcrumbs
	}
})
export default class PasswordRestConfirm extends Vue {
	passwordModule = getModule(PasswordModule)
	submitButtonText = 'Reset Password'
	lockIcon = faLock

	get breadCrumbPath() {
		return router.currentRoute.value.meta.breadcrumb
	}

	get resetCompleted(): boolean {
		return this.passwordModule.getResetCompleted
	}

	get resetError(): boolean {
		return this.passwordModule.getResetError
	}

	get resetLoading(): boolean {
		return this.passwordModule.getResetLoading
	}

	myContext = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: 'Password Reset Confirm',
				description: 'Password Reset Confirm'
			}))
		)

		const router = useRoute()
		const validationSchema = toFormValidator(
			zod.object({
				new_password: zodPassword,
				password2: zodPassword
			})
		)
		const { handleSubmit, errors, submitCount } = useForm({
			validationSchema
		})

		const { value: new_password } = useField('new_password')
		const { value: re_new_password } = useField('re_new_password')

		const isTooManyAttempts = computed(() => {
			return submitCount.value >= 10
		})

		const onSubmit = handleSubmit(async () => {
			try {
				const apiData: ResetPasswordInputApi = {
					new_password: new_password.value,
					re_new_password: re_new_password.value,
					uid: router.params.uid,
					token: router.params.token
				}

				await this.passwordModule.resetPasswordConfirm(apiData)
			} catch (e) {
				console.log(e)
			}
		})

		return {
			validationSchema,
			onSubmit,
			errors,
			new_password,
			re_new_password,
			isTooManyAttempts,
			meta
		}
	})

	clearResetStatus(): void {
		this.passwordModule.clearResetStatus()
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Components/Form/FormProvider';
@import '@/Assets/Styles/Components/Form/FormBaseTextarea';
@import '@/Assets/Styles/Components/Form/FormBaseInput';
@import '@/Assets/Styles/Pages/Auth/PasswordResetConfirm';
</style>
