<template>
	<form
		@submit="myContext.onSubmit"
		class="_form"
		id="UserAddressForm"
		name="UserAddressForm"
	>
		<div>
			<div class="title">
				<label for="title" class="label mb-2">Title</label>
				<div class="_container">
					<input
						v-model="myContext.title"
						id="title"
						name="title"
						type="text"
						class="_input"
						placeholder="Title"
						autocomplete="title"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.title }}</span>
			</div>

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

			<div class="street">
				<label for="street" class="label mb-2">Street</label>
				<div class="_container">
					<input
						v-model="myContext.street"
						id="street"
						name="street"
						type="text"
						class="_input"
						placeholder="Street"
						autocomplete="street"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.street }}</span>
			</div>

			<div class="street_number">
				<label for="street_number" class="label mb-2">Street Number</label>
				<div class="_container">
					<input
						v-model="myContext.street_number"
						id="street_number"
						name="street_number"
						type="text"
						class="_input"
						placeholder="Street Number"
						autocomplete="street_number"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.street_number }}</span>
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

			<div class="floor">
				<label for="floor" class="label mb-2">Floor</label>
				<select
					id="inputFloor"
					v-model="myContext.floor"
					class="form-select"
					name="country"
				>
					<option disabled value="choose">Choose...</option>
					<option
						v-for="(floor, index) in Object.values(myContext.floorChoicesList)"
						:key="index"
						:value="index"
					>
						{{ floor }}
					</option>
				</select>
				<span class="validation-errors">{{ myContext.errors.floor }}</span>
			</div>

			<div class="location_type">
				<label for="location_type" class="label mb-2">Location Type</label>
				<select
					id="inputLocationType"
					v-model="myContext.location_type"
					class="form-select"
					name="country"
				>
					<option disabled value="choose">Choose...</option>
					<option
						v-for="(location_type, index) in Object.values(myContext.locationChoicesList)"
						:key="index"
						:value="index"
					>
						{{ location_type }}
					</option>
				</select>
				<span class="validation-errors">{{ myContext.errors.location_type }}</span>
			</div>

			<div class="phone">
				<label for="phone" class="label mb-2">Phone</label>
				<div class="_container">
					<input
						v-model="myContext.phone"
						id="phone"
						name="phone"
						type="text"
						class="_input"
						placeholder="Phone"
						autocomplete="phone"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.phone }}</span>
			</div>

			<div class="mobile_phone">
				<label for="mobile_phone" class="label mb-2">Mobile Phone</label>
				<div class="_container">
					<input
						v-model="myContext.mobile_phone"
						id="mobile_phone"
						name="mobile_phone"
						type="text"
						class="_input"
						placeholder="Mobile Phone"
						autocomplete="mobile_phone"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.mobile_phone }}</span>
			</div>

			<div class="notes col-12">
				<label for="notes" class="label">Notes</label>
				<div class="_container">
					<textarea
						v-model="myContext.notes"
						:maxlength="10000"
						:rows="6"
						id="notes"
						name="notes"
						class="_input"
					/>
				</div>
				<span class="validation-errors">{{ myContext.errors.notes }}</span>
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
				<span class="validation-errors">{{ myContext.errors.country }}</span>
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
				<span class="validation-errors">{{ myContext.errors.region }}</span>
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
import { useRouter } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import { toFormValidator } from '@vee-validate/zod'
import { ZodAddress } from '@/Zod/Address/ZodAddress'
import UserModule from '@/State/User/Profile/UserModule'
import CountryModule from '@/State/Country/CountryModule'
import AddressModule from '@/State/Address/AddressModule'
import { FieldContext, useField, useForm } from 'vee-validate'
import { HTMLElementEvent } from '@/State/Common/Types/HelpingTypes'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { FloorChoicesEnum, LocationChoicesEnum } from '@/State/Address/Enum/AddressEnum'

@Component({
	name: 'UserAddressNew'
})
export default class UserAddressNew extends Vue {
	userModule = getModule(UserModule)
	addressModule = getModule(AddressModule)
	countryModule = getModule(CountryModule)
	submitButtonText = 'Create'

	myContext = setup(() => {
		const router = useRouter()
		const countryModule = getModule(CountryModule)
		countryModule.fetchCountriesFromRemote()

		const meta = useMeta(
			computed(() => ({
				title: `${this.userModule.getUserProfile?.first_name} ${this.userModule.getUserProfile?.last_name} | Address New`,
				description: `${this.userModule.getUserProfile?.first_name} ${this.userModule.getUserProfile?.last_name} | Address New`
			}))
		)
		const validationSchema = toFormValidator(ZodAddress)
		const { handleSubmit, errors } = useForm({
			validationSchema,
			initialValues: {
				title: '',
				first_name: '',
				last_name: '',
				street: '',
				street_number: '',
				city: '',
				zipcode: '',
				floor: null,
				location_type: null,
				phone: null,
				mobile_phone: null,
				notes: null,
				country: null,
				region: null
			}
		})

		const { value: title }: FieldContext<string> = useField('title')
		const { value: first_name }: FieldContext<string> = useField('first_name')
		const { value: last_name }: FieldContext<string> = useField('last_name')
		const { value: street }: FieldContext<string> = useField('street')
		const { value: street_number }: FieldContext<string> = useField('street_number')
		const { value: city }: FieldContext<string> = useField('city')
		const { value: zipcode }: FieldContext<string> = useField('zipcode')
		const { value: floor }: FieldContext<FloorChoicesEnum> = useField('floor')
		const { value: location_type }: FieldContext<LocationChoicesEnum> =
			useField('location_type')
		const { value: phone }: FieldContext<string> = useField('phone')
		const { value: mobile_phone }: FieldContext<string> = useField('mobile_phone')
		const { value: notes }: FieldContext<string> = useField('notes')
		const { value: country }: FieldContext<string> = useField('country')
		const { value: region }: FieldContext<string> = useField('region')

		const onSubmit = handleSubmit(async () => {
			try {
				const response = await this.addressModule.createAddress({
					title: title.value,
					first_name: first_name.value,
					last_name: last_name.value,
					street: street.value,
					street_number: street_number.value,
					city: city.value,
					zipcode: zipcode.value,
					floor: floor.value,
					location_type: location_type.value,
					phone: phone.value,
					mobile_phone: mobile_phone.value,
					notes: notes.value,
					user: this.userModule.getUserProfile?.id,
					country: country.value,
					region: region.value,
					is_main: false
				})
				if (response) {
					await router.push({
						name: 'Addresses'
					})
				}
			} catch (e) {
				console.log(e)
			}
		})

		const locationChoicesList = Object.keys(LocationChoicesEnum).filter((element) => {
			return isNaN(Number(element))
		})

		const floorChoicesList = Object.keys(FloorChoicesEnum).filter((element) => {
			return isNaN(Number(element))
		})

		return {
			meta,
			title,
			first_name,
			last_name,
			street,
			street_number,
			city,
			zipcode,
			floor,
			location_type,
			phone,
			mobile_phone,
			notes,
			country,
			region,
			validationSchema,
			errors,
			onSubmit,
			locationChoicesList,
			floorChoicesList
		}
	})

	restRegions(e: HTMLElementEvent<HTMLTextAreaElement>): void {
		const countryAlpha2Key = e.target?.value
		this.countryModule.findRegionsBasedOnAlphaFromInput(countryAlpha2Key)
		this.myContext.region = 'choose'
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/User/UserAddressNew.scss';
</style>
