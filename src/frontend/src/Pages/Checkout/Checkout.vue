<template>
	<CheckoutStripeModal ref="checkoutStripeModal" :unique-id="'checkoutStripeModal'">
		<div class="stripe-content">
			<GrooveImage
				:alt="'Stripe Logo'"
				:src="`${myContext.backendBaseUrl}/backend/static/images/powered_by_stripe.svg`"
				:use-media-stream="false"
				:img-class="'stripe-content-img_logo'"
				:img-height="268"
				:img-width="462"
			/>
			<StripeElements
				v-if="myContext.stripeLoaded"
				v-slot="{ elements, instance }"
				ref="elms"
				:stripe-key="myContext.stripeKey"
				:instance-options="myContext.instanceOptions"
				:elements-options="myContext.elementsOptions"
			>
				<StripeElement
					ref="card"
					:elements="elements"
					:options="myContext.cardOptions"
					:instance="instance"
				/>
			</StripeElements>
			<template v-if="myContext.cartTotalLength">
				<div class="checkout-grid-pay-button mt-4">
					<button
						class="btn btn-outline-primary-one green-bg"
						title="Pay Now"
						type="button"
						@click="myContext.onSubmit"
					>
						Confirm your purchase
					</button>
				</div>
			</template>
		</div>
	</CheckoutStripeModal>
	<div class="page-checkout container mt-7 mb-5">
		<Breadcrumbs :bread-crumb-path="myContext.breadCrumbPath" />
		<div class="checkout-grid-container content-min-height">
			<div class="checkout-grid-order-user-details">
				<div class="checkout-grid-content">
					<h2 class="subtitle mb-4">Shipping details</h2>
					<form
						v-if="!isEmpty(myContext.customerDetailsData)"
						@submit="myContext.onSubmit"
						class="form-class checkout-grid-form"
						id="customerDetailsForm"
						name="customerDetailsForm"
					>
						<div class="checkout-grid-form-part-left">
							<div class="firstName col-12 mb-3">
								<label for="firstName" class="label">First Name</label>
								<div class="_container">
									<input
										v-model="myContext.firstName"
										id="firstName"
										name="firstName"
										type="text"
										class="_input"
									/>
								</div>
								<span class="validation-errors">{{ myContext.errors.firstName }}</span>
							</div>
							<div class="phone col-12 mb-3">
								<label for="phone" class="label">Phone</label>
								<div class="_container">
									<input
										v-model="myContext.phone"
										id="phone"
										name="phone"
										type="number"
										class="_input"
									/>
								</div>
								<span class="validation-errors">{{ myContext.errors.phone }}</span>
							</div>
							<div class="city col-12 mb-3">
								<label for="city" class="label">City</label>
								<div class="_container">
									<input
										v-model="myContext.city"
										id="city"
										name="city"
										type="text"
										class="_input"
									/>
								</div>
								<span class="validation-errors">{{ myContext.errors.city }}</span>
							</div>
							<div class="address col-12 mb-3">
								<label for="address" class="label">Address</label>
								<div class="_container">
									<input
										v-model="myContext.address"
										id="address"
										name="address"
										type="text"
										class="_input"
									/>
								</div>
								<span class="validation-errors">{{ myContext.errors.address }}</span>
							</div>
						</div>
						<div class="checkout-grid-form-part-right">
							<div class="lastName col-12 mb-3">
								<label for="lastName" class="label">Last Name</label>
								<div class="_container">
									<input
										v-model="myContext.lastName"
										id="lastName"
										name="lastName"
										type="text"
										class="_input"
									/>
								</div>
								<span class="validation-errors">{{ myContext.errors.lastName }}</span>
							</div>
							<div class="email col-12 mb-3">
								<label for="email" class="label">Email</label>
								<div class="_container">
									<input
										v-model="myContext.email"
										id="email"
										name="email"
										type="email"
										class="_input"
									/>
								</div>
								<span class="validation-errors">{{ myContext.errors.lastName }}</span>
							</div>
							<div class="zipcode col-12 mb-3">
								<label for="zipcode" class="label">Zipcode</label>
								<div class="_container">
									<input
										v-model="myContext.zipcode"
										id="zipcode"
										name="zipcode"
										type="text"
										class="_input"
									/>
								</div>
								<span class="validation-errors">{{ myContext.errors.zipcode }}</span>
							</div>
							<div class="place col-12 mb-3">
								<label for="place" class="label">Place</label>
								<div class="_container">
									<input
										v-model="myContext.place"
										id="place"
										name="place"
										type="text"
										class="_input"
									/>
								</div>
								<span class="validation-errors">{{ myContext.errors.place }}</span>
							</div>
						</div>
						<div class="checkout-grid-country-region col-12">
							<div class="form-outline">
								<label class="form-label" for="inputCountry">Country</label>
								<select
									id="inputCountry"
									v-model="myContext.country"
									class="form-select"
									name="country"
									@change="myContext.restRegions"
								>
									<option disabled value="choose">Choose...</option>
									<option
										v-for="country in myContext.availableCountries"
										:key="country.alpha_2"
										:value="country.alpha_2"
									>
										{{ country.name }}
									</option>
								</select>
							</div>
							<div class="form-outline">
								<label class="form-label" for="inputRegion">Region</label>
								<select
									id="inputRegion"
									ref="regionElement"
									v-model="myContext.region"
									class="form-select"
									name="region"
								>
									<option disabled value="choose">Choose...</option>
									<option
										v-for="region in myContext.regionsBasedOnAlpha"
										:key="region.alpha"
										:value="region.alpha"
									>
										{{ region.name }}
									</option>
								</select>
							</div>
						</div>
						<div class="customer_notes col-12">
							<label for="customerNotes" class="label">Customer Notes</label>
							<div class="_container">
								<textarea
									v-model="myContext.customerNotes"
									:maxlength="10000"
									:rows="6"
									id="customerNotes"
									name="customerNotes"
									class="_input"
								/>
							</div>
							<span class="validation-errors">{{ myContext.errors.customerNotes }}</span>
						</div>
						<template v-if="myContext.cartTotalLength">
							<div class="checkout-grid-pay-button">
								<button class="btn btn-outline-primary-one green-bg" title="Pay Now">
									Confirm your purchase
								</button>
							</div>
						</template>
					</form>
				</div>
			</div>
			<Suspense>
				<template #default>
					<CheckoutPayWays
						:cart-total-price="myContext.cartTotalPrice"
						:cart-total-price-for-pay-way="myContext.cartTotalPriceForPayWay"
					/>
				</template>
				<template #fallback>
					<span>Loading...</span>
				</template>
			</Suspense>
			<CheckoutProductContainer
				:cart="myContext.cart"
				:cart-total-length="myContext.cartTotalLength"
				:cart-total-price="myContext.cartTotalPrice"
				:cart-total-price-for-pay-way="myContext.cartTotalPriceForPayWay"
				:selected-pay-way="myContext.selectedPayWay"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import {
	loadStripe,
	Stripe,
	StripeCardElement,
	StripeCardElementOptions,
	StripeCardNumberElement,
	StripeConstructorOptions,
	StripeElementsOptions
} from '@stripe/stripe-js'
import * as zod from 'zod'
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import AppModule from '@/State/App/AppModule'
import { useToast } from 'vue-toastification'
import CartModule from '@/State/Cart/CartModule'
import { useField, useForm } from 'vee-validate'
import { cloneDeep, isEmpty, merge } from 'lodash'
import { getModule } from 'vuex-module-decorators'
import { toFormValidator } from '@vee-validate/zod'
import PayWayModel from '@/State/Payway/PayWayModel'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import CartItemModel from '@/State/Cart/CartItemModel'
import PayWayModule from '@/State/Payway/PayWayModule'
import CountryModel from '@/State/Country/CountryModel'
import RegionsModel from '@/State/Country/RegionsModel'
import UserModule from '@/State/User/Profile/UserModule'
import CountryModule from '@/State/Country/CountryModule'
import { PayWaysEnum } from '@/State/Payway/Enum/PayWaysEnum'
import { StripeElement, StripeElements } from 'vue-stripe-js'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import UserProfileModel from '@/State/User/Profile/UserProfileModel'
import { HTMLElementEvent } from '@/State/Common/Types/HelpingTypes'
import CheckoutStripeModal from '@/Utilities/CheckoutStripeModal.vue'
import CartItemCheckoutModel from '@/State/Cart/CartItemCheckoutModel'
import { Options as Component, setup, Vue } from 'vue-class-component'
import CheckoutPayWays from '@/Components/Checkout/CheckoutPayWays.vue'
import { computed, ComputedRef, onBeforeMount, onUnmounted, ref } from 'vue'
import StripeCardModule from '@/Libraries/Stripe/Components/StripeCardModule'
import CheckoutOrderApiData from '@/State/Cart/Interface/CheckoutOrderApiData'
import ProductFavouriteModule from '@/State/Product/Favourite/ProductFavouriteModule'
import CheckoutProductContainer from '@/Components/Checkout/CheckoutProductContainer.vue'

const toast = useToast()

@Component({
	name: 'Checkout',
	components: {
		Breadcrumbs,
		CheckoutProductContainer,
		CheckoutPayWays,
		CheckoutStripeModal,
		GrooveImage,
		StripeElements,
		StripeElement
	}
})
export default class Checkout extends Vue {
	myContext = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: 'Checkout',
				description: 'Checkout'
			}))
		)
		const authModule = getModule(AuthModule)
		const cartModule = getModule(CartModule)
		const payWayModule = getModule(PayWayModule)
		const stripeCardModule = getModule(StripeCardModule)
		const countryModule = getModule(CountryModule)
		const userModule = getModule(UserModule)
		const appModule = getModule(AppModule)
		const productFavouriteModule = getModule(ProductFavouriteModule)

		const isAuthenticated: ComputedRef<boolean> = computed(
			() => authModule.isAuthenticated
		)
		const backendBaseUrl: ComputedRef<string | undefined> = computed(
			() => appModule.backendBaseUrl
		)
		const selectedPayWay: ComputedRef<PayWayModel> = computed(
			() => payWayModule.getSelectedPayWay
		)
		const stripeKey = computed(() => stripeCardModule.getStripeKey)
		const stripeLoaded = ref(false)

		onBeforeMount(() => {
			const stripePromise = loadStripe(stripeKey.value)
			stripePromise.then(() => {
				stripeLoaded.value = true
			})
		})

		payWayModule.setSelectedPayWay(new PayWayModel())

		Promise.all([
			countryModule.findRegionsBasedOnAlphaForLoggedCustomer(userModule.getUserData),
			productFavouriteModule.fetchUserFavouritesFromRemote(userModule.getUserData.id),
			cartModule.cartTotalPriceForPayWayAction(
				selectedPayWay.value as unknown as PayWayModel
			)
		])

		const availableCountries: ComputedRef<Array<CountryModel>> = computed(
			() => countryModule.getCountries
		)
		const regionsBasedOnAlpha: ComputedRef<Array<RegionsModel>> = computed(
			() => countryModule.getRegionsBasedOnAlpha
		)
		const cart: ComputedRef<Array<CartItemModel>> = computed(() => cartModule.getCart)
		const cartTotalLength: ComputedRef<number> = computed(
			() => cartModule.getCartTotalLength
		)
		const cartTotalPrice: ComputedRef<number> = computed(
			() => cartModule.getCartTotalPrice
		)
		const cartTotalPriceForPayWay: ComputedRef<number> = computed(
			() => cartModule.getCartTotalPriceForPayWay
		)
		const stripeResultToken = computed(() => stripeCardModule.getResultToken)
		const userData: ComputedRef<UserProfileModel> = computed(() =>
			isAuthenticated.value ? userModule.getUserData : new UserProfileModel()
		)

		let customerDetailsData = new UserProfileModel({
			address: '',
			city: '',
			email: '',
			first_name: '',
			last_name: '',
			phone: 0,
			place: '',
			zipcode: '',
			country: 'choose',
			region: 'choose'
		})

		const customerDetailsInitialize = () => {
			customerDetailsData = cloneDeep(userData.value)

			if (isAuthenticated.value) {
				if (customerDetailsData.country === '') {
					customerDetailsData.country = 'choose'
					customerDetailsData.region = 'choose'
				}
			} else {
				customerDetailsData.address = ''
				customerDetailsData.city = ''
				customerDetailsData.email = ''
				customerDetailsData.first_name = ''
				customerDetailsData.last_name = ''
				customerDetailsData.phone = 0
				customerDetailsData.place = ''
				customerDetailsData.zipcode = ''
				customerDetailsData.country = 'choose'
				customerDetailsData.region = 'choose'
			}
			return customerDetailsData
		}
		customerDetailsInitialize()

		const elms = ref(null as unknown as Stripe)
		const card = ref({} as unknown as StripeCardElement | StripeCardNumberElement)
		const customerNotes = ref('')

		const instanceOptions: StripeConstructorOptions = {
			// https://stripe.com/docs/js/initializing#init_stripe_js-options
		}
		const elementsOptions: StripeElementsOptions = {
			// https://stripe.com/docs/js/elements_object/create#stripe_elements-options
		}
		const cardOptions: StripeCardElementOptions = {
			value: {
				postalCode: '12345'
			},
			style: {
				base: {
					color: 'white'
				}
			}
		}

		const validationSchema = toFormValidator(
			zod.object({
				address: zod.string().min(3).max(100),
				city: zod.string().min(3).max(100),
				email: zod.string().email({ message: 'Must be a valid email' }),
				firstName: zod.string().min(3).max(100),
				lastName: zod.string().min(3).max(100),
				phone: zod
					.number()
					.positive({ message: 'Must be a positive phone' })
					.int({ message: 'Must be an integer' }),
				place: zod.string().min(3).max(100),
				zipcode: zod.string().min(3).max(100),
				customerNotes: zod.string().default('test')
			})
		)

		const breadCrumbPath = router.currentRoute.value.meta.breadcrumb

		const buildCartItems: () => Array<CartItemCheckoutModel> = () => {
			const items = []
			for (let i = 0; i < cart.value.length; i++) {
				const item = cart.value[i]
				const obj = {
					product: item.product.id,
					quantity: item.quantity,
					price: item.product.price * item.quantity
				} as never
				items.push(obj)
			}
			return items
		}

		async function restRegions(e: HTMLElementEvent<HTMLTextAreaElement>): Promise<void> {
			const countryAlpha2Key = e.target?.value
			await countryModule.findRegionsBasedOnAlphaFromInput(countryAlpha2Key)
			customerDetailsData.region = 'choose'
		}

		const { handleSubmit, errors } = useForm({
			validationSchema,
			initialValues: {
				address: customerDetailsData?.address,
				city: customerDetailsData?.city,
				email: customerDetailsData?.email,
				firstName: customerDetailsData?.first_name,
				lastName: customerDetailsData?.last_name,
				phone: customerDetailsData?.phone,
				place: customerDetailsData?.place,
				zipcode: customerDetailsData?.zipcode,
				country: customerDetailsData.country,
				region: customerDetailsData.region,
				customerNotes: ''
			}
		})

		const { value: address } = useField('address')
		const { value: city } = useField('city')
		const { value: email } = useField('email')
		const { value: firstName } = useField('firstName')
		const { value: lastName } = useField('lastName')
		const { value: phone } = useField('phone')
		const { value: place } = useField('place')
		const { value: zipcode } = useField('zipcode')
		const { value: country } = useField('country')
		const { value: region } = useField('region')

		const onSubmit = handleSubmit(async (values) => {
			try {
				const items = buildCartItems()
				if (selectedPayWay.value.name === PayWaysEnum.CREDIT_CARD) {
					const cardElement = card.value
					const instance = elms.value
					await instance.createToken(cardElement).then((result: object) => {
						stripeCardModule.setResultToken(result)
					})
					if (stripeResultToken.value) {
						return createOrder(values, items)
					}
				} else {
					return createOrder(values, items)
				}
			} catch (e) {
				console.log(e)
			}
		})

		function createOrder(values, items: Array<CartItemCheckoutModel>): void {
			const apiData: CheckoutOrderApiData = {
				user_id: customerDetailsData.id ? customerDetailsData.id : userData.value.id,
				pay_way: selectedPayWay.value.name,
				first_name: values.firstName,
				last_name: values.lastName,
				email: values.email,
				address: values.address,
				zipcode: values.zipcode,
				place: values.place,
				phone: values.phone,
				city: values.city,
				country: values.country,
				region: values.region,
				customer_notes: values.customerNotes,
				items
			}

			if (selectedPayWay.value.name === PayWaysEnum.CREDIT_CARD) {
				const stripeToken = {
					stripe_token: stripeResultToken.value.id
				}
				merge(apiData, stripeToken)
			}

			if (customerDetailsData.country === 'choose') {
				toast.error('The Country field is missing!')
			} else if (customerDetailsData.region === 'choose') {
				toast.error('The region field is missing!')
			} else if (Object.keys(selectedPayWay.value).length <= 0) {
				toast.error('You have to select a pay way method')
			} else {
				cartModule.createOrder(apiData)
			}
		}

		onUnmounted(() => payWayModule.setSelectedPayWay(new PayWayModel()))

		return {
			validationSchema,
			onSubmit,
			errors,
			city,
			email,
			firstName,
			lastName,
			phone,
			place,
			zipcode,
			address,
			country,
			region,
			customerNotes,
			userData,
			isAuthenticated,
			backendBaseUrl,
			availableCountries,
			regionsBasedOnAlpha,
			cart,
			cartTotalLength,
			cartTotalPrice,
			cartTotalPriceForPayWay,
			stripeResultToken,
			selectedPayWay,
			breadCrumbPath,
			buildCartItems,
			restRegions,
			stripeLoaded,
			stripeKey,
			instanceOptions,
			elementsOptions,
			cardOptions,
			customerDetailsData,
			meta
		}
	})
	get isEmpty(): typeof isEmpty {
		return isEmpty
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Form/FormProvider';
@import '@/Assets/Styles/Components/Form/FormBaseTextarea';
@import '@/Assets/Styles/Components/Form/FormBaseInput';
@import '@/Assets/Styles/Pages/Checkout/Checkout';
</style>
