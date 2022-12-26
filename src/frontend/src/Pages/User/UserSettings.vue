<template>
	<form
		v-if="myContext.userData && Object.keys(myContext.userData).length > 0"
		@submit="myContext.onSubmit"
		class="_form"
		id="SignUpForm"
		name="SignUpForm"
	>
		<div class="grid-account-setting-fields">
			<div class="first_name">
				<label for="first_name" class="label mb-2">First Name</label>
				<div class="_container">
					<input
						v-model="myContext.first_name"
						id="first_name"
						name="first_name"
						type="text"
						class="_input"
						placeholder="First Name"
						autocomplete="first_name"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.first_name }}</span>
			</div>

			<div class="last_name">
				<label for="last_name" class="label mb-2">Last Name</label>
				<div class="_container">
					<input
						v-model="myContext.last_name"
						id="last_name"
						name="last_name"
						type="text"
						class="_input"
						placeholder="Last Name"
						autocomplete="last_name"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.last_name }}</span>
			</div>

			<div class="phone">
				<label for="phone" class="label mb-2">Phone</label>
				<div class="_container">
					<input
						v-model="myContext.phone"
						id="phone"
						name="phone"
						type="number"
						class="_input"
						placeholder="Phone"
						autocomplete="phone"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.phone }}</span>
			</div>

			<div class="city">
				<label for="city" class="label mb-2">City</label>
				<div class="_container">
					<input
						v-model="myContext.city"
						id="city"
						name="city"
						type="text"
						class="_input"
						placeholder="City"
						autocomplete="city"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.city }}</span>
			</div>

			<div class="zipcode">
				<label for="zipcode" class="label mb-2">ZipCode</label>
				<div class="_container">
					<input
						v-model="myContext.zipcode"
						id="zipcode"
						name="zipcode"
						type="text"
						class="_input"
						placeholder="ZipCode"
						autocomplete="zipcode"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.zipcode }}</span>
			</div>

			<div class="address">
				<label for="address" class="label mb-2">Address</label>
				<div class="_container">
					<input
						v-model="myContext.address"
						id="address"
						name="address"
						type="text"
						class="_input"
						placeholder="Address"
						autocomplete="address"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.address }}</span>
			</div>

			<div class="place">
				<label for="place" class="label mb-2">Place</label>
				<div class="_container">
					<input
						v-model="myContext.place"
						id="place"
						name="place"
						type="text"
						class="_input"
						placeholder="Place"
						autocomplete="place"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.place }}</span>
			</div>

			<div class="country">
				<label class="form-label" for="inputCountry">Country</label>
				<select
					id="inputCountry"
					v-model="myContext.country"
					class="form-select"
					name="country"
					@change="restRegions"
				>
					<option disabled value="choose">Choose...</option>
					<option
						v-for="country in countryModule.getCountries"
						:key="country.alpha_2"
						:value="country.alpha_2"
					>
						{{ country.name }}
					</option>
				</select>
			</div>

			<div class="region">
				<label class="form-label" for="inputRegion">Region</label>
				<select
					id="inputRegion"
					v-model="myContext.region"
					class="form-select"
					name="region"
				>
					<option disabled value="choose">Choose...</option>
					<option
						v-for="region in countryModule.getRegionsBasedOnAlpha"
						:key="region.alpha"
						:value="region.alpha"
					>
						{{ region.name }}
					</option>
				</select>
			</div>

			<div class="button">
				<button class="btn btn-outline-primary-one green-bg" :title="submitButtonText">
					{{ submitButtonText }}
				</button>
			</div>
		</div>
	</form>
</template>

<script lang="ts">
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import { toFormValidator } from '@vee-validate/zod'
import { ZodUserSettings } from '@/Zod/User/ZodUser'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import UserModule from '@/State/User/Profile/UserModule'
import CountryModule from '@/State/Country/CountryModule'
import { FieldContext, useField, useForm } from 'vee-validate'
import { HTMLElementEvent } from '@/State/Common/Types/HelpingTypes'
import { Options as Component, setup, Vue } from 'vue-class-component'
import UserProfileApiData from '@/State/User/Interface/UserProfileApiData'

@Component({
	name: 'UserSettings'
})
export default class UserSettings extends Vue {
	authModule = getModule(AuthModule)
	countryModule = getModule(CountryModule)
	submitButtonText = 'Update'

	myContext = setup(() => {
		const countryModule = getModule(CountryModule)
		const userModule = getModule(UserModule)

		countryModule.fetchCountriesFromRemote()
		countryModule.findRegionsBasedOnAlphaForLoggedCustomer(userModule.getUserProfile)

		const userData = userModule.getUserProfile

		const meta = useMeta(
			computed(() => ({
				title: userData?.first_name + ' ' + userData?.last_name + ' | Settings',
				description: userData?.first_name + ' ' + userData?.last_name + ' | Settings'
			}))
		)

		const validationSchema = toFormValidator(ZodUserSettings)
		const { handleSubmit, errors, submitCount } = useForm({
			validationSchema,
			initialValues: {
				first_name: userData.first_name,
				last_name: userData.last_name,
				phone: userData.phone,
				place: userData.place,
				city: userData.city,
				zipcode: userData.zipcode,
				address: userData.address,
				country: userData.country,
				region: userData.region
			}
		})

		const { value: first_name }: FieldContext<string> = useField('first_name')
		const { value: last_name }: FieldContext<string> = useField('last_name')
		const { value: phone }: FieldContext<number> = useField('phone')
		const { value: city }: FieldContext<string> = useField('city')
		const { value: zipcode }: FieldContext<string> = useField('zipcode')
		const { value: address }: FieldContext<string> = useField('address')
		const { value: place }: FieldContext<string> = useField('place')
		const { value: country }: FieldContext<string> = useField('country')
		const { value: region }: FieldContext<string> = useField('region')

		const isTooManyAttempts = computed(() => {
			return submitCount.value >= 10
		})

		const onSubmit = handleSubmit(async () => {
			try {
				const apiData: UserProfileApiData = {
					user_id: userData.id,
					first_name: first_name.value,
					last_name: last_name.value,
					phone: phone.value,
					place: place.value,
					city: city.value,
					zipcode: zipcode.value,
					address: address.value,
					country: country.value,
					region: region.value
				}

				await userModule.updateUserProfile(apiData)
			} catch (e) {
				console.log(e)
			}
		})

		return {
			validationSchema,
			onSubmit,
			errors,
			userData,
			first_name,
			last_name,
			phone,
			city,
			zipcode,
			address,
			place,
			country,
			region,
			isTooManyAttempts,
			meta
		}
	})

	restRegions(e: HTMLElementEvent<HTMLTextAreaElement>): void {
		const countryAlpha2Key = e.target?.value
		this.countryModule.findRegionsBasedOnAlphaFromInput(countryAlpha2Key)
		this.myContext.userData.region = 'choose'
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Form/FormProvider.scss';
@import '@/Assets/Styles/Components/Form/FormBaseTextarea.scss';
@import '@/Assets/Styles/Components/Form/FormBaseInput.scss';
@import '@/Assets/Styles/Pages/User/UserSettings.scss';
</style>
