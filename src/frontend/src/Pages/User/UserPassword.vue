<template>
	<form
		id="userPasswordForm"
		@submit="myContext.onSubmit"
		class="_form"
		name="userPasswordForm"
	>
		<div class="grid-account-password-fields">
			<div class="current_password">
				<label for="current_password" class="label mb-2">Current Password</label>
				<div class="_container">
					<input
						v-model="myContext.current_password"
						id="current_password"
						name="current_password"
						type="password"
						class="_input"
						placeholder="Current Password"
						autocomplete="current_password"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.current_password }}</span>
			</div>
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
				<label for="re_new_password" class="label mb-2">Retype New Password</label>
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
				<span class="validation-errors">{{ myContext.errors.re_new_password }}</span>
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

	<button
		class="btn btn-outline-primary-two"
		title="Log Out from all devices"
		@click="clearAllAccountSessions"
	>
		Log Out from all devices
	</button>
</template>

<script lang="ts">
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import { toFormValidator } from '@vee-validate/zod'
import { ZodUserPassword } from '@/Zod/User/ZodUser'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import UserModule from '@/State/User/Profile/UserModule'
import CountryModule from '@/State/Country/CountryModule'
import { FieldContext, useField, useForm } from 'vee-validate'
import PasswordModule from '@/State/Auth/Password/PasswordModule'
import { Options as Component, setup, Vue } from 'vue-class-component'
import ProductReviewModule from '@/State/Product/Review/ProductReviewModule'
import UpdatePasswordInputApi from '@/State/Auth/Interface/UpdatePasswordInputApi'
import ProductFavouriteModule from '@/State/Product/Favourite/ProductFavouriteModule'

@Component({
	name: 'UserPassword'
})
export default class UserPassword extends Vue {
	authModule = getModule(AuthModule)
	passwordModule = getModule(PasswordModule)
	productFavouriteModule = getModule(ProductFavouriteModule)
	productReviewModule = getModule(ProductReviewModule)
	countryModule = getModule(CountryModule)
	userModule = getModule(UserModule)
	submitButtonText = 'Update'

	myContext = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: `${this.userModule.getUserProfile?.first_name} ${this.userModule.getUserProfile?.last_name} | Password`,
				description: `${this.userModule.getUserProfile?.first_name} ${this.userModule.getUserProfile?.last_name} | Password`
			}))
		)

		const validationSchema = toFormValidator(ZodUserPassword)
		const { handleSubmit, errors, submitCount } = useForm({
			validationSchema
		})

		const { value: current_password }: FieldContext<string> = useField('current_password')
		const { value: new_password }: FieldContext<string> = useField('new_password')
		const { value: re_new_password }: FieldContext<string> = useField('re_new_password')

		const isTooManyAttempts = computed(() => {
			return submitCount.value >= 10
		})

		const onSubmit = handleSubmit(async () => {
			try {
				const apiData: UpdatePasswordInputApi = {
					current_password: current_password.value,
					new_password: new_password.value,
					re_new_password: re_new_password.value
				}

				await this.passwordModule.updateUserPassword(apiData)
			} catch (e) {
				console.log(e)
			}
		})

		return {
			validationSchema,
			onSubmit,
			errors,
			current_password,
			new_password,
			re_new_password,
			isTooManyAttempts,
			meta
		}
	})

	clearAllAccountSessions(): void {
		this.authModule.clearAllAccountSessions().then(() => {
			this.productFavouriteModule.unsetFavourites()
			this.productFavouriteModule.unsetUserFavourites()
			this.productReviewModule.unsetUserToProductReview()
			this.productReviewModule.unsetUserReviews()
			this.countryModule.unsetUserCountryData()
		})
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Form/FormProvider.scss';
@import '@/Assets/Styles/Components/Form/FormBaseTextarea.scss';
@import '@/Assets/Styles/Components/Form/FormBaseInput.scss';
@import '@/Assets/Styles/Pages/User/UserPassword.scss';
</style>
