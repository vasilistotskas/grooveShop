<script lang="ts" setup>
import { toFormValidator } from '@vee-validate/zod'
import { FieldContext, useField, useForm } from 'vee-validate'
import { ZodCheckout } from '~/zod/checkout/checkout'
import { useCartStore } from '~/stores/cart'
import { useCountryStore } from '~/stores/country'
import { useRegionStore } from '~/stores/region'

const { t } = useLang()

const cartStore = useCartStore()
const countryStore = useCountryStore()
const regionStore = useRegionStore()

const { cart } = storeToRefs(cartStore)
const { countries } = storeToRefs(countryStore)
const { regions } = storeToRefs(regionStore)

const {
	pending: countryPending,
	refresh: countryRefresh,
	error: countriesError
} = await useAsyncData('country', () => countryStore.fetchCountries())

const onCountryChange = (event: Event) => {
	if (!(event.target instanceof HTMLSelectElement)) return
	regionStore.fetchRegions({
		alpha2: event.target.value
	})
}

const cartItems = computed(() => cart.value?.cartItems || [])

const validationSchema = toFormValidator(ZodCheckout)
const { handleSubmit, errors, submitCount } = useForm({
	validationSchema
})

const { value: firstName }: FieldContext<string> = useField('firstName')
const { value: lastName }: FieldContext<string> = useField('lastName')
const { value: address }: FieldContext<string> = useField('address')
const { value: city }: FieldContext<string> = useField('city')
const { value: email }: FieldContext<string> = useField('email')
const { value: phone }: FieldContext<string> = useField('phone')
const { value: place }: FieldContext<string> = useField('place')
const { value: zipcode }: FieldContext<string> = useField('zipcode')
const { value: country }: FieldContext<string> = useField('country')
const { value: region }: FieldContext<string> = useField('region')
const { value: customerNotes }: FieldContext<string> = useField('customerNotes')

const tooManyAttempts = computed(() => {
	return submitCount.value >= 10
})

const onSubmit = handleSubmit((e) => {
	// console.log(e)
})

definePageMeta({
	layout: 'page',
	middleware: ['breadcrumbs']
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
	<PageWrapper>
		<PageTitle :text="$t('pages.checkout.title')" class="capitalize" />
		<PageBody>
			<PageError v-if="countriesError" :error="countriesError"></PageError>
			<template v-if="cartItems.length">
				<form
					id="checkoutForm"
					class="_form grid grid-cols-2 gap-4"
					name="checkoutForm"
					@submit="onSubmit"
				>
					<div class="grid">
						<label class="text-gray-700 dark:text-gray-200 mb-2" for="firstName">{{
							$t('pages.checkout.form.first_name')
						}}</label>
						<div class="grid">
							<FormTextInput
								id="firstName"
								v-model="firstName"
								class="text-gray-700 dark:text-gray-200 mb-2"
								name="firstName"
								type="text"
								:placeholder="$t('pages.checkout.form.first_name')"
								autocomplete="firstName"
							/>
						</div>
						<span class="text-gray-700 dark:text-gray-200">{{ errors.firstName }}</span>
					</div>

					<div class="grid">
						<label class="text-gray-700 dark:text-gray-200 mb-2" for="lastName">{{
							$t('pages.checkout.form.last_name')
						}}</label>
						<div class="grid">
							<FormTextInput
								id="lastName"
								v-model="lastName"
								class="text-gray-700 dark:text-gray-200 mb-2"
								name="lastName"
								type="text"
								:placeholder="$t('pages.checkout.form.last_name')"
								autocomplete="lastName"
							/>
						</div>
						<span class="text-gray-700 dark:text-gray-200">{{ errors.lastName }}</span>
					</div>

					<div class="grid">
						<label class="text-gray-700 dark:text-gray-200 mb-2" for="address">{{
							$t('pages.checkout.form.address')
						}}</label>
						<div class="grid">
							<FormTextInput
								id="address"
								v-model="address"
								class="text-gray-700 dark:text-gray-200 mb-2"
								name="address"
								type="text"
								:placeholder="$t('pages.checkout.form.address')"
								autocomplete="address"
							/>
						</div>
						<span class="text-gray-700 dark:text-gray-200">{{ errors.address }}</span>
					</div>

					<div class="grid">
						<label class="text-gray-700 dark:text-gray-200 mb-2" for="city">{{
							$t('pages.checkout.form.city')
						}}</label>
						<div class="grid">
							<FormTextInput
								id="city"
								v-model="city"
								class="text-gray-700 dark:text-gray-200 mb-2"
								name="city"
								type="text"
								:placeholder="$t('pages.checkout.form.city')"
								autocomplete="city"
							/>
						</div>
						<span class="text-gray-700 dark:text-gray-200">{{ errors.city }}</span>
					</div>

					<div class="grid">
						<label class="text-gray-700 dark:text-gray-200 mb-2" for="email">{{
							$t('pages.checkout.form.email')
						}}</label>
						<div class="grid">
							<FormTextInput
								id="email"
								v-model="email"
								class="text-gray-700 dark:text-gray-200 mb-2"
								name="email"
								type="text"
								:placeholder="$t('pages.checkout.form.email')"
								autocomplete="email"
							/>
						</div>
						<span class="text-gray-700 dark:text-gray-200">{{ errors.email }}</span>
					</div>

					<div class="grid">
						<label class="text-gray-700 dark:text-gray-200 mb-2" for="phone">{{
							$t('pages.checkout.form.phone')
						}}</label>
						<div class="grid">
							<FormTextInput
								id="phone"
								v-model="phone"
								class="text-gray-700 dark:text-gray-200 mb-2"
								name="phone"
								type="text"
								:placeholder="$t('pages.checkout.form.phone')"
								autocomplete="phone"
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
								class="text-gray-700 dark:text-gray-200 mb-2"
								name="place"
								type="text"
								:placeholder="$t('pages.checkout.form.place')"
								autocomplete="place"
							/>
						</div>
						<span class="text-gray-700 dark:text-gray-200">{{ errors.place }}</span>
					</div>

					<div class="grid">
						<label class="text-gray-700 dark:text-gray-200 mb-2" for="zipcode">{{
							$t('pages.checkout.form.zipcode')
						}}</label>
						<div class="grid">
							<FormTextInput
								id="zipcode"
								v-model="zipcode"
								class="text-gray-700 dark:text-gray-200 mb-2"
								name="zipcode"
								type="text"
								:placeholder="$t('pages.checkout.form.zipcode')"
								autocomplete="zipcode"
							/>
						</div>
						<span class="text-gray-700 dark:text-gray-200">{{ errors.zipcode }}</span>
					</div>

					<div class="grid">
						<label class="text-gray-700 dark:text-gray-200 mb-2" for="country">{{
							$t('pages.checkout.form.country')
						}}</label>
						<div class="grid">
							<select
								id="country"
								v-model="country"
								class="form-select text-gray-700 dark:text-gray-300 bg-gray-100/[0.8] dark:bg-slate-800/[0.8] border border-gray-200"
								name="country"
								@change="onCountryChange"
							>
								<option disabled value="choose">
									{{ $t('pages.checkout.form.choose.country') }}
								</option>
								<option
									v-for="cntry in countries.results"
									:key="cntry.alpha2"
									class="text-gray-700 dark:text-gray-300"
									:value="cntry.alpha2"
								>
									{{ cntry.name }}
								</option>
							</select>
						</div>
						<span class="text-gray-700 dark:text-gray-200">{{ errors.country }}</span>
					</div>

					<div class="grid">
						<label class="text-gray-700 dark:text-gray-200 mb-2" for="region">{{
							$t('pages.checkout.form.region')
						}}</label>
						<div class="grid">
							<select
								id="region"
								ref="regionSelectElement"
								v-model="region"
								class="form-select text-gray-700 dark:text-gray-300 bg-gray-100/[0.8] dark:bg-slate-800/[0.8] border border-gray-200"
								name="region"
							>
								<option disabled value="choose">
									{{ $t('pages.checkout.form.choose.region') }}
								</option>
								<option
									v-for="rgn in regions.results"
									:key="rgn.alpha"
									class="text-gray-700 dark:text-gray-300"
									:value="rgn.alpha"
								>
									{{ rgn.name }}
								</option>
							</select>
						</div>
						<span class="text-gray-700 dark:text-gray-200">{{ errors.region }}</span>
					</div>

					<div class="grid">
						<label class="text-gray-700 dark:text-gray-200 mb-2" for="customerNotes">{{
							$t('pages.checkout.form.customer_notes')
						}}</label>
						<div class="grid">
							<textarea
								id="customerNotes"
								v-model="customerNotes"
								class="w-full text-gray-700 dark:text-gray-200 bg-gray-100/[0.8] dark:bg-slate-800/[0.8] border border-gray-200"
								name="customerNotes"
								type="text"
								rows="4"
								:placeholder="$t('pages.checkout.form.customer_notes')"
							/>
						</div>
					</div>

					<div class="grid items-end">
						<Button v-if="!tooManyAttempts" type="button">
							{{ $t('pages.checkout.form.submit') }}
						</Button>
						<Button v-else type="button" disabled>
							{{ $t('pages.checkout.form.too_many_attempts') }}
						</Button>
					</div>
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
