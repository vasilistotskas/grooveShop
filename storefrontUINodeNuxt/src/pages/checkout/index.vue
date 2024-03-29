<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { FieldContext, useField, useForm } from 'vee-validate'
import { z } from 'zod'
import {
	defaultSelectOptionChoose,
	FloorChoicesEnum,
	floorChoicesList,
	LocationChoicesEnum,
	locationChoicesList
} from '~/zod/global/general'

const { t } = useLang()

const cartStore = useCartStore()
const countryStore = useCountryStore()
const regionStore = useRegionStore()

const { cart, getCartItems } = storeToRefs(cartStore)
const { countries } = storeToRefs(countryStore)
const { regions } = storeToRefs(regionStore)

try {
	await countryStore.fetchCountries()
} catch (error) {
	//
}

const cartItems = computed(() => cart.value?.cartItems || [])
const shippingPrice = ref(3)

const ZodCheckout = z.object({
	email: z.string().email(t('pages.checkout.validation.email.email')),
	firstName: z.string().min(3, t('pages.checkout.validation.first_name.min', { min: 3 })),
	lastName: z.string().min(3, t('pages.checkout.validation.last_name.min', { min: 3 })),
	street: z.string().min(3, t('pages.checkout.validation.street.min', { min: 3 })),
	streetNumber: z
		.string()
		.min(3, t('pages.checkout.validation.street_number.min', { min: 3 })),
	zipcode: z.string().min(3, t('pages.checkout.validation.zipcode.min', { min: 3 })),
	place: z.string().min(3, t('pages.checkout.validation.place.min', { min: 3 })),
	city: z.string().min(3, t('pages.checkout.validation.city.min', { min: 3 })),
	phone: z.string().min(3, t('pages.checkout.validation.phone.min', { min: 3 })),
	mobilePhone: z.string().nullish(),
	customerNotes: z.string().nullish(),
	floor: z.union([z.nativeEnum(FloorChoicesEnum), z.string()]).nullish(),
	locationType: z.union([z.nativeEnum(LocationChoicesEnum), z.string()]).nullish(),
	country: z.string().refine((value) => value !== defaultSelectOptionChoose, {
		message: t('common.validation.region.required')
	}),
	region: z.string().refine((value) => value !== defaultSelectOptionChoose, {
		message: t('common.validation.region.required')
	})
})

const validationSchema = toTypedSchema(ZodCheckout)
const { handleSubmit, errors, isSubmitting, submitCount } = useForm({
	validationSchema,
	initialValues: {
		country: defaultSelectOptionChoose,
		region: defaultSelectOptionChoose,
		floor: defaultSelectOptionChoose,
		locationType: defaultSelectOptionChoose
	}
})

const { value: email }: FieldContext<string> = useField('email')
const { value: firstName }: FieldContext<string> = useField('firstName')
const { value: lastName }: FieldContext<string> = useField('lastName')
const { value: street }: FieldContext<string> = useField('street')
const { value: streetNumber }: FieldContext<string> = useField('streetNumber')
const { value: zipcode }: FieldContext<string> = useField('zipcode')
const { value: place }: FieldContext<string> = useField('place')
const { value: city }: FieldContext<string> = useField('city')
const { value: phone }: FieldContext<string> = useField('phone')
const { value: mobilePhone }: FieldContext<string> = useField('mobilePhone')
const { value: customerNotes }: FieldContext<string> = useField('customerNotes')
const { value: floor }: FieldContext<string> = useField('floor')
const { value: locationType }: FieldContext<string> = useField('locationType')
const { value: country }: FieldContext<string> = useField('country')
const region = reactive(useField('region'))

const onCountryChange = (event: Event) => {
	if (!(event.target instanceof HTMLSelectElement)) return
	regionStore.fetchRegions({
		alpha2: event.target.value
	})
	region.value = defaultSelectOptionChoose
}

const tooManyAttempts = computed(() => {
	return submitCount.value >= 10
})

const onSubmit = handleSubmit((values) => {
	//
})

const submitButtonDisabled = computed(() => {
	return isSubmitting.value || Object.keys(errors.value).length > 0
})

definePageMeta({
	layout: 'page'
})
useHead(() => ({
	title: t('pages.checkout.title'),
	meta: [
		{
			name: 'description',
			content: t('pages.checkout.description')
		},
		{
			name: 'keywords',
			content: t('pages.checkout.keywords')
		}
	]
}))
useServerSeoMeta({
	title: t('pages.checkout.title'),
	description: t('pages.checkout.description')
})
</script>

<template>
	<PageWrapper class="container-x_small flex flex-col gap-4 mt-4">
		<PageTitle :text="$t('pages.checkout.title')" class="capitalize" />
		<PageBody>
			<template v-if="cart && getCartItems?.length">
				<form
					id="checkoutForm"
					class="_form grid gap-2 md:grid-cols-2fr-1fr md:gap-4"
					name="checkoutForm"
					@submit="onSubmit"
				>
					<div
						class="container p-2 md:p-10 bg-white text-white dark:bg-slate-800 dark:text-black rounded-lg"
					>
						<div class="grid md:grid-cols-2 md:gap-4">
							<div class="grid">
								<label class="text-gray-700 dark:text-gray-200 mb-2" for="firstName">{{
									$t('pages.checkout.form.first_name')
								}}</label>
								<div class="grid">
									<FormTextInput
										id="firstName"
										v-model="firstName"
										:placeholder="$t('pages.checkout.form.first_name')"
										autocomplete="firstName"
										class="text-gray-700 dark:text-gray-200 mb-2"
										name="firstName"
										type="text"
									/>
								</div>
								<span v-if="errors.firstName" class="text-sm text-red-600">{{
									errors.firstName
								}}</span>
							</div>

							<div class="grid">
								<label class="text-gray-700 dark:text-gray-200 mb-2" for="lastName">{{
									$t('pages.checkout.form.last_name')
								}}</label>
								<div class="grid">
									<FormTextInput
										id="lastName"
										v-model="lastName"
										:placeholder="$t('pages.checkout.form.last_name')"
										autocomplete="lastName"
										class="text-gray-700 dark:text-gray-200 mb-2"
										name="lastName"
										type="text"
									/>
								</div>
								<span v-if="errors.lastName" class="text-sm text-red-600">{{
									errors.lastName
								}}</span>
							</div>

							<div class="grid">
								<label class="text-gray-700 dark:text-gray-200 mb-2" for="email">{{
									$t('pages.checkout.form.email')
								}}</label>
								<div class="grid">
									<FormTextInput
										id="email"
										v-model="email"
										:placeholder="$t('pages.checkout.form.email')"
										autocomplete="email"
										class="text-gray-700 dark:text-gray-200 mb-2"
										name="email"
										type="email"
									/>
								</div>
								<span v-if="errors.email" class="text-sm text-red-600">{{
									errors.email
								}}</span>
							</div>

							<div class="grid">
								<label class="text-gray-700 dark:text-gray-200 mb-2" for="phone">{{
									$t('pages.checkout.form.phone')
								}}</label>
								<div class="grid">
									<FormTextInput
										id="phone"
										v-model="phone"
										:placeholder="$t('pages.checkout.form.phone')"
										autocomplete="phone"
										class="text-gray-700 dark:text-gray-200 mb-2"
										name="phone"
										type="text"
									/>
								</div>
								<span v-if="errors.phone" class="text-sm text-red-600">{{
									errors.phone
								}}</span>
							</div>

							<div class="grid">
								<label class="text-gray-700 dark:text-gray-200 mb-2" for="mobilePhone">{{
									$t('pages.checkout.form.mobile_phone')
								}}</label>
								<div class="grid">
									<FormTextInput
										id="mobilePhone"
										v-model="mobilePhone"
										:placeholder="$t('pages.checkout.form.mobile_phone')"
										autocomplete="mobilePhone"
										class="text-gray-700 dark:text-gray-200 mb-2"
										name="mobilePhone"
										type="text"
									/>
								</div>
								<span v-if="errors.mobilePhone" class="text-sm text-red-600">{{
									errors.mobilePhone
								}}</span>
							</div>

							<div class="grid">
								<label class="text-gray-700 dark:text-gray-200 mb-2" for="city">{{
									$t('pages.checkout.form.city')
								}}</label>
								<div class="grid">
									<FormTextInput
										id="city"
										v-model="city"
										:placeholder="$t('pages.checkout.form.city')"
										autocomplete="city"
										class="text-gray-700 dark:text-gray-200 mb-2"
										name="city"
										type="text"
									/>
								</div>
								<span class="text-gray-700 dark:text-gray-200">{{ errors.city }}</span>
							</div>

							<div class="grid">
								<label class="text-gray-700 dark:text-gray-200 mb-2" for="phone">{{
									$t('pages.checkout.form.phone')
								}}</label>
								<div class="grid">
									<FormTextInput
										id="phone"
										v-model="phone"
										:placeholder="$t('pages.checkout.form.phone')"
										autocomplete="phone"
										class="text-gray-700 dark:text-gray-200 mb-2"
										name="phone"
										type="text"
									/>
								</div>
								<span class="text-gray-700 dark:text-gray-200">{{ errors.phone }}</span>
							</div>

							<div class="grid">
								<label class="text-gray-700 dark:text-gray-200 mb-2" for="place">{{
									$t('pages.checkout.form.place')
								}}</label>
								<div class="grid">
									<FormTextInput
										id="place"
										v-model="place"
										:placeholder="$t('pages.checkout.form.place')"
										autocomplete="place"
										class="text-gray-700 dark:text-gray-200 mb-2"
										name="place"
										type="text"
									/>
								</div>
								<span class="text-gray-700 dark:text-gray-200">{{ errors.place }}</span>
							</div>

							<div class="grid content-evenly items-start">
								<label class="text-gray-700 dark:text-gray-200 mb-2" for="zipcode">{{
									$t('pages.checkout.form.zipcode')
								}}</label>
								<div class="grid">
									<FormTextInput
										id="zipcode"
										v-model="zipcode"
										:placeholder="$t('pages.checkout.form.zipcode')"
										autocomplete="zipcode"
										class="text-gray-700 dark:text-gray-200 mb-2"
										name="zipcode"
										type="text"
									/>
								</div>
								<span class="text-gray-700 dark:text-gray-200">{{ errors.zipcode }}</span>
							</div>

							<div class="grid">
								<label
									class="text-gray-700 dark:text-gray-200 mb-2"
									for="customerNotes"
									>{{ $t('pages.checkout.form.customer_notes') }}</label
								>
								<div class="grid">
									<textarea
										id="customerNotes"
										v-model="customerNotes"
										:placeholder="$t('pages.checkout.form.customer_notes')"
										class="w-full text-gray-700 dark:text-gray-200 bg-gray-100/[0.8] dark:bg-slate-800/[0.8] border border-gray-200"
										name="customerNotes"
										rows="4"
										type="text"
									/>
								</div>
							</div>
						</div>
						<div class="grid md:grid-cols-2 md:gap-4">
							<div class="grid content-evenly items-start gap-4">
								<div class="grid">
									<label class="text-gray-700 dark:text-gray-200 mb-2" for="floor">{{
										$t('pages.checkout.form.floor')
									}}</label>
									<select
										id="inputFloor"
										v-model="floor"
										class="form-select text-gray-700 dark:text-gray-300 bg-gray-100/[0.8] dark:bg-slate-800/[0.8] border border-gray-200"
										name="floor"
										title="floor"
									>
										<option disabled value="choose">
											{{ $t('common.choose') }}
										</option>
										<option
											v-for="(floorChoice, index) in floorChoicesList"
											:key="index"
											:value="index"
										>
											{{ floorChoice }}
										</option>
									</select>
									<span
										v-if="errors.floor"
										class="text-sm text-red-600 px-4 py-3 relative"
										>{{ errors.floor }}</span
									>
								</div>
								<div class="grid">
									<label
										class="text-gray-700 dark:text-gray-200 mb-2"
										for="locationType"
										>{{ $t('pages.checkout.form.location_type') }}</label
									>
									<select
										id="inputLocationType"
										v-model="locationType"
										class="form-select text-gray-700 dark:text-gray-300 bg-gray-100/[0.8] dark:bg-slate-800/[0.8] border border-gray-200"
										name="locationType"
										title="locationType"
									>
										<option disabled value="choose">
											{{ $t('common.choose') }}
										</option>
										<option
											v-for="(location, index) in locationChoicesList"
											:key="index"
											:value="index"
										>
											{{ location }}
										</option>
									</select>
									<span
										v-if="errors.locationType"
										class="text-sm text-red-600 px-4 py-3 relative"
										>{{ errors.locationType }}</span
									>
								</div>
							</div>

							<div class="grid content-evenly items-start gap-4">
								<div class="grid">
									<label class="text-gray-700 dark:text-gray-200 mb-2" for="country">{{
										$t('pages.checkout.form.country')
									}}</label>
									<div v-if="countries" class="grid">
										<select
											id="country"
											v-model="country"
											class="form-select text-gray-700 dark:text-gray-300 bg-gray-100/[0.8] dark:bg-slate-800/[0.8] border border-gray-200"
											name="country"
											title="country"
											@change="onCountryChange"
										>
											<option disabled value="choose">
												{{ $t('common.choose') }}
											</option>
											<option
												v-for="cntry in countries.results"
												:key="cntry.alpha2"
												:value="cntry.alpha2"
												class="text-gray-700 dark:text-gray-300"
											>
												{{ cntry.name }}
											</option>
										</select>
									</div>
									<span
										v-if="errors.country"
										class="text-sm text-red-600 px-4 py-3 relative"
										>{{ errors.country }}</span
									>
								</div>
								<div class="grid">
									<label class="text-gray-700 dark:text-gray-200 mb-2" for="region">{{
										$t('pages.checkout.form.region')
									}}</label>
									<div v-if="regions" class="grid">
										<select
											id="region"
											ref="regionSelectElement"
											v-model="region.value"
											class="form-select text-gray-700 dark:text-gray-300 bg-gray-100/[0.8] dark:bg-slate-800/[0.8] border border-gray-200"
											name="region"
											title="region"
										>
											<option disabled value="choose">
												{{ $t('common.choose') }}
											</option>
											<option
												v-for="rgn in regions.results"
												:key="rgn.alpha"
												:value="rgn.alpha"
												class="text-gray-700 dark:text-gray-300"
											>
												{{ rgn.name }}
											</option>
										</select>
									</div>
									<span
										v-if="errors.region"
										class="text-sm text-red-600 px-4 py-3 relative"
										>{{ errors.region }}</span
									>
								</div>
							</div>
						</div>
					</div>
					<CheckoutSidebar
						:items="getCartItems"
						:shipping-price="shippingPrice"
						:total-discount-value="cart.totalDiscountValue"
						:total-items="cart.totalItems"
						:total-items-unique="cart.totalItemsUnique"
						:total-price="cart.totalPrice"
						:total-vat-value="cart.totalVatValue"
						class="container p-2 md:p-10 bg-white text-white dark:bg-slate-800 dark:text-black rounded-lg"
					>
						<template #pay-ways>
							<CheckoutPayWays />
						</template>
						<template #items>
							<CheckoutItems :items="getCartItems"></CheckoutItems>
						</template>
						<template #button>
							<div class="grid items-center">
								<button
									:aria-busy="isSubmitting"
									:disabled="submitButtonDisabled"
									class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
									type="submit"
								>
									{{ $t('pages.checkout.form.submit') }}
								</button>
							</div>
						</template>
					</CheckoutSidebar>
				</form>
			</template>
			<Empty v-else :text="$t('pages.checkout.empty')" />
		</PageBody>
	</PageWrapper>
</template>

<style lang="scss" scoped>
.form-select {
	background-image: none;
	border-radius: 4px;
	box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
	display: block;
	font-size: 14px;
	height: 43px;
	line-height: 1.428571429;
	padding: 11px 12px;
	transition: all 0.3s ease-in-out;
	vertical-align: middle;
	width: 100%;
}
</style>
