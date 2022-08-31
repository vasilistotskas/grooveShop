<template>
  <CheckoutStripeModal ref="checkoutStripeModal" :unique-id="'checkoutStripeModal'">
    <div class="stripe-content">
      <GrooveImage
        :alt="'Stripe Logo'"
        :src="'http://localhost:8010/backend/static/images/powered_by_stripe.svg'"
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
                <label for="firstName" class="label" data-v-547a8e9b="">First Name</label>
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
                <label for="phone" class="label" data-v-547a8e9b="">Phone</label>
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
                <label for="city" class="label" data-v-547a8e9b="">City</label>
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
                <label for="address" class="label" data-v-547a8e9b="">Address</label>
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
                <label for="lastName" class="label" data-v-547a8e9b="">Last Name</label>
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
                <label for="email" class="label" data-v-547a8e9b="">Email</label>
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
                <label for="zipcode" class="label" data-v-547a8e9b="">Zipcode</label>
                <div class="_container">
                  <input
                    v-model="myContext.zipcode"
                    id="zipcode"
                    name="zipcode"
                    type="number"
                    class="_input"
                  />
                </div>
                <span class="validation-errors">{{ myContext.errors.zipcode }}</span>
              </div>
              <div class="place col-12 mb-3">
                <label for="place" class="label" data-v-547a8e9b="">Place</label>
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
                  v-model="myContext.customerDetailsData.country"
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
                  v-model="myContext.customerDetailsData.region"
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
              <label for="customerNotes" class="label" data-v-547a8e9b="">Customer Notes</label>
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
  StripeElementsOptions,
} from '@stripe/stripe-js'
import * as zod from 'zod'
import router from '@/routes'
import { useToast } from 'vue-toastification'
import CartModule from '@/state/cart/CartModule'
import { useForm, useField } from 'vee-validate'
import { cloneDeep, merge, isEmpty } from 'lodash'
import { getModule } from 'vuex-module-decorators'
import { toFormValidator } from '@vee-validate/zod'
import PayWayModel from '@/state/payway/PayWayModel'
import UserModule from '@/state/user/data/UserModule'
import AuthModule from '@/state/auth/auth/AuthModule'
import CartItemModel from '@/state/cart/CartItemModel'
import PayWayModule from '@/state/payway/PayWayModule'
import CountryModel from '@/state/country/CountryModel'
import RegionsModel from '@/state/country/RegionsModel'
import CountryModule from '@/state/country/CountryModule'
import { PayWaysEnum } from '@/state/payway/Enum/PayWaysEnum'
import { StripeElements, StripeElement } from 'vue-stripe-js'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import UserProfileModel from '@/state/user/data/UserProfileModel'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import { HTMLElementEvent } from '@/state/common/Types/HelpingTypes'
import CartItemCheckoutModel from '@/state/cart/CartItemCheckoutModel'
import { Options as Component, setup, Vue } from 'vue-class-component'
import CheckoutPayWays from '@/components/Checkout/CheckoutPayWays.vue'
import { computed, ComputedRef, onBeforeMount, onUnmounted, ref } from 'vue'
import StripeCardModule from '@/libraries/Stripe/Components/StripeCardModule'
import CheckoutOrderApiData from '@/state/cart/Interface/CheckoutOrderApiData'
import CheckoutStripeModal from '@/components/Utilities/CheckoutStripeModal.vue'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import ProductFavouriteModule from '@/state/product/favourite/ProductFavouriteModule'
import CheckoutProductContainer from '@/components/Checkout/CheckoutProductContainer.vue'

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
    StripeElement,
  },
})
export default class Checkout extends Vue {
  myContext = setup(() => {
    document.title = 'Checkout'
    const authModule = getModule(AuthModule)
    const cartModule = getModule(CartModule)
    const payWayModule = getModule(PayWayModule)
    const stripeCardModule = getModule(StripeCardModule)
    const countryModule = getModule(CountryModule)
    const userModule = getModule(UserModule)
    const productFavouriteModule = getModule(ProductFavouriteModule)

    const isAuthenticated: ComputedRef<boolean> = computed(() => authModule.isAuthenticated)
    const selectedPayWay: ComputedRef<PayWayModel> = computed(() => payWayModule.getSelectedPayWay)
    const stripeKey = computed(() => stripeCardModule.getStripeKey)
    const stripeLoaded = ref(false)

    onBeforeMount(() => {
      const stripePromise = loadStripe(stripeKey.value)
      stripePromise.then(() => {
        stripeLoaded.value = true
      })
    })

    Promise.all([
      countryModule.fetchCountriesFromRemote(),
      isAuthenticated ??
        userModule.fetchUserDataFromRemote().then((response) => {
          if (response) {
            countryModule.findRegionsBasedOnAlphaForLoggedCustomer(userModule.getUserData)
            productFavouriteModule.fetchUserFavouritesFromRemote(response.data[0].user)
          }
        }),
      cartModule.cartTotalPriceForPayWayAction(selectedPayWay as unknown as PayWayModel),
    ])

    const availableCountries: ComputedRef<Array<CountryModel>> = computed(
      () => countryModule.getCountries
    )
    const regionsBasedOnAlpha: ComputedRef<Array<RegionsModel>> = computed(
      () => countryModule.getRegionsBasedOnAlpha
    )
    const cart: ComputedRef<Array<CartItemModel>> = computed(() => cartModule.getCart)
    const cartTotalLength: ComputedRef<number> = computed(() => cartModule.getCartTotalLength)
    const cartTotalPrice: ComputedRef<number> = computed(() => cartModule.getCartTotalPrice)
    const cartTotalPriceForPayWay: ComputedRef<number> = computed(
      () => cartModule.getCartTotalPriceForPayWay
    )
    const stripeResultToken = computed(() => stripeCardModule.getResultToken)
    const userData: ComputedRef<UserProfileModel> = computed(() =>
      isAuthenticated ? userModule.getUserData : new UserProfileModel()
    )

    let customerDetailsData = new UserProfileModel()

    const customerDetailsInitialize = () => {
      customerDetailsData = cloneDeep(userData.value)

      if (isAuthenticated) {
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
        customerDetailsData.region = ''
        customerDetailsData.zipcode = 0
        customerDetailsData.country = 'choose'
        customerDetailsData.region = 'choose'
      }
      return customerDetailsData
    }
    customerDetailsInitialize()

    const elms = ref(null as unknown as Stripe)
    const card = ref({} as unknown as StripeCardElement | StripeCardNumberElement)

    const instanceOptions: StripeConstructorOptions = {
      // https://stripe.com/docs/js/initializing#init_stripe_js-options
    }
    const elementsOptions: StripeElementsOptions = {
      // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
    }
    const cardOptions: StripeCardElementOptions = {
      value: {
        postalCode: '12345',
      },
      style: {
        base: {
          color: 'white',
        },
      },
    }

    const validationSchema = toFormValidator(
      zod.object({
        address: zod.string().nonempty('This is required'),
        city: zod.string().nonempty('This is required'),
        email: zod
          .string()
          .nonempty('This is required')
          .email({ message: 'Must be a valid email' }),
        firstName: zod.string().nonempty('This is required'),
        lastName: zod.string().nonempty('This is required'),
        phone: zod
          .number()
          .positive({ message: 'Must be a positive phone' })
          .int({ message: 'Must be an integer' }),
        place: zod.string().nonempty('This is required'),
        zipcode: zod
          .number()
          .positive({ message: 'Must be a positive zipcode' })
          .int({ message: 'Must be an integer' }),
        customerNotes: zod.string().optional(),
      })
    )

    const breadCrumbPath: () => Array<BreadcrumbItemInterface> = () => {
      const currentRouteMetaBreadcrumb: () => Array<BreadcrumbItemInterface> = router.currentRoute
        .value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
      return currentRouteMetaBreadcrumb()
    }

    const buildCartItems: () => Array<CartItemCheckoutModel> = () => {
      const items = []
      for (let i = 0; i < cart.value.length; i++) {
        const item = cart.value[i]
        const obj = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
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
        address: customerDetailsData.address,
        city: customerDetailsData.city,
        email: customerDetailsData.email,
        firstName: customerDetailsData.first_name,
        lastName: customerDetailsData.last_name,
        phone: customerDetailsData.phone,
        place: customerDetailsData.place,
        zipcode: customerDetailsData.zipcode,
        customerNotes: '',
      },
    })

    const { value: address } = useField('address')
    const { value: city } = useField('city')
    const { value: email } = useField('email')
    const { value: firstName } = useField('firstName')
    const { value: lastName } = useField('lastName')
    const { value: phone } = useField('phone')
    const { value: place } = useField('place')
    const { value: zipcode } = useField('zipcode')
    const { value: customerNotes } = useField('customerNotes')

    const onSubmit = handleSubmit(async (values) => {
      try {
        const items = buildCartItems()
        if (selectedPayWay.value.name === PayWaysEnum.CREDIT_CARD) {
          const cardElement = card.value
          const instance = elms.value
          await instance.createToken(cardElement).then((result: object) => {
            stripeCardModule.setResultToken(result)
          })
          if (stripeResultToken) {
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
        country: customerDetailsData.country,
        region: customerDetailsData.region,
        customer_notes: values.customerNotes,
        items,
      }

      if (selectedPayWay.value.name === PayWaysEnum.CREDIT_CARD) {
        const stripeToken = {
          stripe_token: stripeResultToken.value.id,
        }
        merge(apiData, stripeToken)
      }

      if (customerDetailsData.country === 'choose') {
        toast.error('The country field is missing!')
      } else if (customerDetailsData.region === 'choose') {
        toast.error('The region field is missing!')
      } else if (Object.keys(selectedPayWay).length <= 0) {
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
      customerNotes,
      userData,
      isAuthenticated,
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
    }
  })
  get isEmpty(): typeof isEmpty {
    return isEmpty
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Form/FormProvider';
@import '@/assets/styles/components/Form/FormBaseTextarea';
@import '@/assets/styles/components/Form/FormBaseInput';
@import '@/assets/styles/pages/Checkout/Checkout';
</style>
