<template>
	<div id="activate-account-view" class="container mt-7">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<h1 class="mb-3">Verify Email</h1>
		<template v-if="activationLoading"> loading... </template>
		<template v-else-if="activationError">
			<span class="activation-error-text"
				>An error occured, your account has been activated or link expired, resend
				activation link
				<span class="activation-error-action" @click="activationEmailResend">Here.</span>
			</span>
		</template>
		<template v-else-if="activationCompleted">
			<span class="activation-complete-text mb-3">Account activation successful.</span>
			<RouterLink v-if="!isAuthenticated" aria-label="Log In" title="Log In" to="/log-in">
				<span class="activation-complete-action">Click here to log in.</span>
			</RouterLink>
		</template>
		<template v-else-if="reActivationMailSent">
			<span class="re-activation-text mb-3"
				>A new activation link has been sent to your email.</span
			>
			<span class="re-activation-problem"
				>If the activation email still does not appear in the inbox or in the spam mails
				contact us.</span
			>
		</template>
	</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import SignUpModule from '@/State/Auth/SignUp/SignUpModule'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

@Component({
	name: 'VerifyEmail',
	components: {
		Breadcrumbs
	}
})
export default class VerifyEmail extends Vue {
	authModule = getModule(AuthModule)
	signupModule = getModule(SignUpModule)

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: 'Verify Email',
				description: 'Verify Email'
			}))
		)
		return { meta }
	})

	get breadCrumbPath() {
		return router.currentRoute.value.meta.breadcrumb
	}

	get isAuthenticated(): boolean {
		return this.authModule.isAuthenticated
	}

	get activationCompleted(): boolean {
		return this.signupModule.getActivationCompleted
	}

	get activationError(): boolean {
		return this.signupModule.getActivationError
	}

	get activationLoading(): boolean {
		return this.signupModule.getActivationLoading
	}

	get reActivationMailSent(): boolean {
		return this.signupModule.getReActivationMailSent
	}

	created(): void {
		this.activateAccount()
	}

	activateAccount(): void {
		this.signupModule.activateAccount()
	}

	clearActivationStatus(): void {
		this.signupModule.clearActivationStatus()
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
		this.clearActivationStatus()
		next()
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Pages/Auth/VerifyEmail';
</style>
