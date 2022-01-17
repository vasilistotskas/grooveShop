<template>
  <div class="page-checkout container mt-7 mb-5 ">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath"/>
    <div class="checkout-grid-container content-min-height">
      <div class="checkout-grid-order-user-details">
        <div class="checkout-grid-content">
          <h2 class="subtitle">Shipping details</h2>
          <p class="has-text-grey mb-4">* All fields are required</p>
          <FormProvider
              id="userDetailsForm"
              :errors="formManager.errors"
              :form="formManager.form"
              :form-class="'form-class checkout-grid-form'"
              name="userDetailsForm"
              title=""
              @submit="handleSubmit()"
          >
            <div class="checkout-grid-form-part-left">
              <div class="first_name col-12 mb-3">
                <label :for="formManager.form.first_name.$uid" class="label">First Name</label>
                <BaseInput
                    :id="formManager.form.first_name.$uid"
                    v-model="formManager.form.first_name.$value"
                    :has-error="formManager.form.first_name.$hasError"
                    :placeholder="customerDetails.first_name"
                    :validating="formManager.form.first_name.$validating"
                />
                <ValidationErrors
                    :errors="formManager.form.first_name.$errors"
                    class="validation-errros"
                />
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.last_name.$uid" class="label">Last Name</label>
                <BaseInput
                    :id="formManager.form.last_name.$uid"
                    v-model="formManager.form.last_name.$value"
                    :has-error="formManager.form.last_name.$hasError"
                    :placeholder="customerDetails.last_name"
                    :validating="formManager.form.last_name.$validating"
                />
                <ValidationErrors
                    :errors="formManager.form.last_name.$errors"
                    class="validation-errros"
                />
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.email.$uid" class="label">Email</label>
                <BaseInput
                    :id="formManager.form.email.$uid"
                    v-model="formManager.form.email.$value"
                    :has-error="formManager.form.email.$hasError"
                    :placeholder="customerDetails.email"
                    :validating="formManager.form.email.$validating"
                />
                <ValidationErrors
                    :errors="formManager.form.email.$errors"
                    class="validation-errros"
                />
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.phone.$uid" class="label">Phone</label>
                <BaseInput
                    :id="formManager.form.phone.$uid"
                    v-model="formManager.form.phone.$value"
                    :has-error="formManager.form.phone.$hasError"
                    :placeholder="customerDetails.phone"
                    :validating="formManager.form.phone.$validating"
                />
                <ValidationErrors
                    :errors="formManager.form.phone.$errors"
                    class="validation-errros"
                />
              </div>
            </div>

            <div class="checkout-grid-form-part-right">
              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.address.$uid" class="label">Address</label>
                <BaseInput
                    :id="formManager.form.address.$uid"
                    v-model="formManager.form.address.$value"
                    :has-error="formManager.form.address.$hasError"
                    :placeholder="customerDetails.address"
                    :validating="formManager.form.address.$validating"
                />
                <ValidationErrors
                    :errors="formManager.form.address.$errors"
                    class="validation-errros"
                />
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.zipcode.$uid" class="label">Zipcode</label>
                <BaseInput
                    :id="formManager.form.zipcode.$uid"
                    v-model="formManager.form.zipcode.$value"
                    :has-error="formManager.form.zipcode.$hasError"
                    :placeholder="customerDetails.zipcode"
                    :validating="formManager.form.zipcode.$validating"
                />
                <ValidationErrors
                    :errors="formManager.form.zipcode.$errors"
                    class="validation-errros"
                />
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.place.$uid" class="label">Place</label>
                <BaseInput
                    :id="formManager.form.place.$uid"
                    v-model="formManager.form.place.$value"
                    :has-error="formManager.form.place.$hasError"
                    :placeholder="customerDetails.place"
                    :validating="formManager.form.place.$validating"
                />
                <ValidationErrors
                    :errors="formManager.form.place.$errors"
                    class="validation-errros"
                />
              </div>

              <div class="checkout-grid-country-region">
                <div class="form-outline">
                  <label class="form-label" for="inputCountry">Country</label>
                  <select id="inputCountry" v-model="customerDetails.country" class="form-select" name="country"
                          @change="restRegions"
                  >
                    <option disabled value="choose">Choose...</option>
                    <option
                        v-for="country in availableCountries"
                        :key="country.alpha_2"
                        :value="country.alpha_2"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </div>

                <div class="form-outline">
                  <label class="form-label" for="inputRegion">Region</label>
                  <select id="inputRegion" ref="regionElement" v-model="customerDetails.region" class="form-select"
                          name="region"
                  >
                    <option disabled value="choose">Choose...</option>
                    <option
                        v-for="region in regionsBasedOnAlpha"
                        :key="region.alpha"
                        :value="region.alpha"
                    >
                      {{ region.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </FormProvider>

          <div id="stripe-card" ref="stripleElement" class="mb-5 mt-3"></div>
          <template v-if="cartTotalLength">
            <div class="checkout-grid-pay-button">
              <button class="btn btn-outline-primary-one" type="button" @click="submitForm">Pay with Stripe</button>
            </div>
          </template>
        </div>
      </div>

      <div class="checkout-grid-order-info">
        <div class="checkout-grid-title mb-4">
          <h2 class="title">Your Items</h2>
        </div>
        <div class="checkout-grid-head">
          <div v-for="item in cart"
               :key="item.product.id"
               class="checkout-grid-head-part-two"
          >
            <div class="checkout-grid-head-part-two-product-image">
              <RouterLink :to="'/product' + item.product.absolute_url" aria-label="Product">
                <span>
                  <img :src="mediaStreamImage('products', item.product.main_image_filename, '100', '100')"
                       height="100" width="100" :alt="item.product.name">
                </span>
              </RouterLink>
            </div>
            <div class="checkout-grid-head-part-two-product-info">
              <RouterLink :to="'/product' + item.product.absolute_url" aria-label="Product">
                <span class="checkout-grid-head-part-two-product-info-name">{{ item.product.name }}</span>
              </RouterLink>
              <span class="checkout-grid-head-part-two-product-info-price">Item Price: ${{ item.product.price }}</span>
              <span class="checkout-grid-head-part-two-product-info-quantity">Qty: {{ item.quantity }}</span>
            </div>
            <div class="checkout-grid-head-part-two-product-total">
              <span>${{ itemTotal(item).toFixed(2) }}</span>
            </div>
          </div>
        </div>
        <div class="checkout-grid-head-part-three">
          <span>Total:</span>
          <span>${{ cartTotalPrice.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import router from '@/routes';
import {cloneDeep} from 'lodash';
import {useToast} from 'vue-toastification';
import {Options, Vue} from 'vue-class-component';
import CartItemModel from '@/state/cart/CartItemModel';
import CountryModel from '@/state/country/CountryModel';
import RegionsModel from '@/state/country/RegionsModel';
import BaseInput from '@/components/Form/BaseInput.vue';
import FormProvider from '@/components/Form/FormProvider.vue';
import SubmitButtons from '@/components/Form/SubmitButtons.vue';
import UserDetailsModel from '@/state/user/data/UserDetailsModel';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';
import {useValidation, ValidationError} from 'vue3-form-validation';
import ValidationErrors from '@/components/Form/ValidationErrors.vue';
import {min, exactly, required, email} from '@/components/Form/Utils';

const toast = useToast();

let {
  validateFields
} = useValidation({});

@Options({
  name: 'Checkout',
  components: {
    FormProvider,
    BaseInput,
    SubmitButtons,
    ValidationErrors,
    Breadcrumbs
  }
})
export default class Checkout extends Vue {

  $refs!: {
    stripleElement: HTMLFormElement;
  };
  customerDetails = new UserDetailsModel()
  card = {};
  formManager = {
    validateFields
  } = useValidation({
    first_name: {
      $value: '',
      $rules: [
        required('First Name is required'),
        min(2)('First Name has to be longer than 1 characters')
      ]
    },
    last_name: {
      $value: '',
      $rules: [
        required('Last Name is required'),
        min(2)('Last Name has to be longer than 1 characters')
      ]
    },
    email: {
      $value: '',
      $rules: [
        required('Email is required'),
        email('Please enter a valid email address')
      ]
    },
    phone: {
      $value: '',
      $rules: [
        required('Phone is required'),
        exactly(10)('Phone number has to be 10 characters')
      ]
    },
    zipcode: {
      $value: '',
      $rules: [
        required('Zipcode is required'),
        exactly(5)('Zipcode has to be 5 characters')
      ]
    },
    address: {
      $value: '',
      $rules: [
        required('Address is required'),
        min(2)('City has to be longer than 1 characters')
      ]
    },
    place: {
      $value: '',
      $rules: [
        required('Place is required'),
        min(2)('Place has to be longer than 1 characters')
      ]
    }
  });

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb;
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params);
  }

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated'];
  }

  get availableCountries(): CountryModel {
    return store.getters['country/getCountries'];
  }

  get regionsBasedOnAlpha(): RegionsModel {
    return store.getters['country/getRegionsBasedOnAlpha'];
  }

  get cart(): Array<CartItemModel> {
    return store.getters['cart/getCart'];
  }

  get userData(): UserDetailsModel {
    if (this.isAuthenticated) {
      return store.getters['user/data/getUserData'];
    }
    return new UserDetailsModel;
  }

  get cartTotalLength(): number {
    return store.getters['cart/getCartTotalLength'];
  }

  get cartTotalPrice(): number {
    return store.getters['cart/getCartTotalPrice'];
  }

  get stripeResultToken(): string {
    return store.getters['stripeCard/getResultToken'];
  }

  async created(): Promise<void> {
    await Promise.all([
      await store.dispatch('country/getCountriesFromRemote'),
      store.dispatch('stripeIban/initIBANComponent'),
      store.dispatch('stripeCard/initStripeComponent')
    ]);
  }

  async mounted(): Promise<void> {
    document.title = 'Checkout';
    if (this.isAuthenticated) {
      await store.dispatch('user/data/userDataFromRemote');
    }
    this.customerDetailsInitialize();
  }

  itemTotal(item: CartItemModel): number {
    return item.quantity * item.product.price;
  }

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/';
    const imageNameFileTypeRemove = imageName.substring(0, imageName.lastIndexOf('.')) || imageName;
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/' + imageNameFileTypeRemove + '/' + width + '/' + height;
  }

  async restRegions(e: any): Promise<void> {
    const countryAlpha2Key = e.target.value;
    await store.dispatch('country/findRegionsBasedOnAlphaFromInput', countryAlpha2Key);
    this.customerDetails.region = 'choose';
  }

  async submitForm(): Promise<void> {
    try {
      await store.dispatch('stripeCard/createStripeToken');
      if (this.stripeResultToken) {
        await this.handleSubmit(this.stripeResultToken);
      }
    } catch (e) {
      console.log(e);
    }
  }

  handleSubmit = async (token: any) => {
    const items = [];
    try {
      for (let i = 0; i < this.cart.length; i++) {
        const item = this.cart[i];
        const obj = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity
        };
        items.push(obj);
      }

      const formData: any = await validateFields();
      const apiData = {
        user_id: this.customerDetails.id ? this.customerDetails.id : this.userData.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        address: formData.address,
        zipcode: formData.zipcode,
        place: formData.place,
        phone: formData.phone,
        country: this.customerDetails.country,
        region: this.customerDetails.region,
        items,
        stripe_token: token.id
      };
      if (this.customerDetails.country === 'choose') {
        toast.error('The country field is missing!');
      } else if (this.customerDetails.region === 'choose') {
        toast.error('The region field is missing!');
      } else {
        await store.dispatch('cart/createOrder', apiData);
      }

    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message);
      }
    }
  };

  public customerDetailsInitialize(): void {
    this.customerDetails = cloneDeep(this.userData);

    if (this.isAuthenticated) {
      if (this.customerDetails.first_name !== null) {
        this.formManager.form.first_name.$value = cloneDeep(this.userData.first_name);
      }
      if (this.customerDetails.last_name !== null) {
        this.formManager.form.last_name.$value = cloneDeep(this.userData.last_name);
      }
      if (this.customerDetails.phone !== null) {
        this.formManager.form.phone.$value = String(cloneDeep(this.userData.phone) as unknown as string);
      }
      if (this.customerDetails.place !== null) {
        this.formManager.form.place.$value = cloneDeep(this.userData.place);
      }
      if (this.customerDetails.email !== null) {
        this.formManager.form.email.$value = cloneDeep(this.userData.email);
      }
      if (this.customerDetails.zipcode !== null) {
        this.formManager.form.zipcode.$value = String(cloneDeep(this.userData.zipcode) as unknown as string);
      }
      if (this.customerDetails.address !== null) {
        this.formManager.form.address.$value = cloneDeep(this.userData.address);
      }

      if (!this.customerDetails.country) {
        this.customerDetails.country = 'choose';
        this.customerDetails.region = 'choose';
      }
    } else {
      this.customerDetails.address = '';
      this.customerDetails.city = '';
      this.customerDetails.country = '';
      this.customerDetails.email = '';
      this.customerDetails.first_name = '';
      this.customerDetails.last_name = '';
      this.customerDetails.phone = 0;
      this.customerDetails.place = '';
      this.customerDetails.region = '';
      this.customerDetails.zipcode = 0;
      this.customerDetails.country = 'choose';
      this.customerDetails.region = 'choose';
    }
  }

}
</script>

<style lang="scss" scoped>
.checkout-grid-container {
  display: grid;
  grid-template-columns: 60% 38%;
  gap: 25px;

  a, h2 {
    color: $primary-color-2;
  }

  .checkout-grid-order-user-details, .checkout-grid-order-info {
    background-color: $primary-color-7;
    padding: 15px 30px 30px;
    border-radius: 10px;
  }

  .checkout-grid-order-user-details {
    max-height: 555px;
  }

  .checkout-grid-order-info {
    height: fit-content;
  }

  .checkout-grid-title {
    border-bottom: 2px solid $primary-color-4;
    h2.title {
      padding-bottom: 10px;
    }
  }
  .checkout-grid-head {
    display: grid;
    gap: 10px;
    max-height: 378px;
    overflow: auto;

    &-part {
      &-two, &-three {
        border-radius: 5px;
        align-items: center;
        justify-items: center;
        padding: 5px;
      }

      &-one {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border-radius: 5px;
        align-items: center;
        justify-items: center;
        padding: 5px;
        font-size: 20px;
      }

      &-two {
        position: relative;
        display: grid;
        grid-template-columns: 30% 50% 20%;
        border-bottom: 2px solid $primary-color-4;
        &-product {
          &-image {

          }
          &-info {
            display: grid;
            grid-template-rows: auto;
            width: 100%;
            gap: 5px;
            align-items: center;
            padding: 15px;
              &-name {
                font-weight: 500;
              }
              &-price {
                color: $primary-color-5;
                font-size: 14px;
              }
              &-quantity {
                color: $primary-color-5;
                font-size: 15px;
              }
          }
          &-total {
            position: absolute;
            display: grid;
            bottom: 10px;
            right: 10px;
            justify-self: end;
            align-self: end;
            span {
              font-weight: 500;
              color: #191919;
            }
          }
        }

      }

      &-three {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin-top: 15px;
        span {
          color: #191919;
          font-weight: 500;
          font-size: 22px;
          &:first-child {
            justify-self: start;
          }
          &:nth-child(2) {
            justify-self: end;
          }
        }
      }
    }
  }

  .checkout-grid-content {
    display: grid;

    button {
      justify-self: end;
      align-self: end;
    }
  }

  .checkout-grid-country-region {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: center;
    justify-items: center;
    .form-outline {
      width: 100%;
    }
  }

  .checkout-grid-pay-button {
    display: grid;
    justify-self: end;
  }
}


</style>
