<template>
	<div
		id="registration-complete-view"
		class="registration-complete-message container mt-8"
	>
		<div class="registration-complete-message-content">
			<span>Please enter the email with which you registered</span>
			<form class="mb-3 mt-3">
				<div class="form-group">
					<div class="input-group-w-addon">
						<span class="input-group-addon">
							<font-awesome-icon :icon="envelopeIcon" />
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
				title="Activation Email Resend"
				@click="activationEmailResend(email)"
			>
				send email
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import SignUpModule from '@/State/Auth/SignUp/SignUpModule'
import { Options as Component, Vue } from 'vue-class-component'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'

@Component({
	name: 'VerifyEmailResendInput',
	props: {
		activationEmailAtLocalStorage: {
			type: Boolean,
			default: false
		}
	}
})
export default class VerifyEmailResendInput extends Vue {
	signupModule = getModule(SignUpModule)
	activationEmailAtLocalStorage = false
	email = ''
	envelopeIcon = faEnvelope

	activationEmailResend(email: string): void {
		let finalEmail
		const emailFromLocalStorage = this.signupModule.getRegistrationEmail
		if (emailFromLocalStorage) {
			finalEmail = emailFromLocalStorage
			this.activationEmailAtLocalStorage = true
		} else {
			finalEmail = email
		}

		this.signupModule.activationEmailResend(finalEmail)
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Pages/Auth/VerifyEmailResendInput';
</style>
