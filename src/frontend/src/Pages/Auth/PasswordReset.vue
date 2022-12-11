<template>
	<div id="password-reset-view" class="container mt-7 mb-5">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<div class="card password-reset-card">
			<div class="card-body card-body-border-top">
				<div>
					<FontAwesomeIcon :icon="lockIcon" size="4x" />
				</div>
				<h1>Forgot Password?</h1>
				<p>You can reset your password here.</p>
				<template v-if="emailLoading"> loading... </template>
				<template v-else-if="!emailCompleted">
					<form>
						<div class="form-group">
							<div class="input-group-w-addon">
								<span class="input-group-addon">
									<FontAwesomeIcon :icon="envelopeIcon" />
								</span>
								<input
									id="email"
									v-model="email"
									class="form-control"
									name="email"
									placeholder="email"
									type="email"
								/>
							</div>
						</div>
					</form>
					<button
						class="btn btn-outline-primary-two"
						title="Send Password Reset Email"
						@click="sendResetEmail(email)"
					>
						send email
					</button>
					<span v-show="emailError" class="error">
						A error occurred while processing your request.
					</span>
				</template>
				<template v-else>
					<div class="password-reset-message">
						<span
							>Check your inbox for a link to reset your password. If an email doesn't
							appear within a few minutes, check your spam folder.</span
						>
					</div>
					<RouterLink aria-label="Log In" title="Log In" to="/log-in">
						return to login page
					</RouterLink>
				</template>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useMeta } from 'vue-meta'
import { useRouter } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import PasswordModule from '@/State/Auth/Password/PasswordModule'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'

@Component({
	name: 'PasswordReset',
	components: {
		Breadcrumbs
	}
})
export default class PasswordReset extends Vue {
	router = useRouter()
	passwordModule = getModule(PasswordModule, this.$store)
	email = ''
	lockIcon = faLock
	envelopeIcon = faEnvelope

	myContext = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: 'Reset Password',
				description: 'Reset Password'
			}))
		)
		return { meta }
	})

	get breadCrumbPath() {
		return this.router.currentRoute.value.meta.breadcrumb
	}

	get emailCompleted(): boolean {
		return this.passwordModule.getEmailCompleted
	}

	get emailError(): boolean {
		return this.passwordModule.getEmailError
	}

	get emailLoading(): boolean {
		return this.passwordModule.getEmailLoading
	}

	unmounted(): void {
		this.passwordModule.clearEmailStatus()
	}

	sendResetEmail(email: string): void {
		this.passwordModule.sendPasswordResetEmail(email)
	}

	clearEmailStatus(): void {
		this.passwordModule.clearEmailStatus()
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Pages/Auth/PasswordReset.scss';
</style>
