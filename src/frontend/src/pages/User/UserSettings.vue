<template>
  <FormProvider v-if="userData && Object.keys(userData).length > 0" id="userProfileForm" :errors="formManager.errors" :form="formManager.form" name="userProfileForm" title="" @submit="handleSubmit()">
    <div class="grid-account-setting-fields">
      <div class="first_name">
        <label :for="formManager.form.first_name.$uid" class="label">First Name</label>
        <FormBaseInput
          :id="formManager.form.first_name.$uid"
          v-model="formManager.form.first_name.$value"
          :has-error="formManager.form.first_name.$hasError"
          :placeholder="userProfile.first_name"
          :validating="formManager.form.first_name.$validating"
        />
        <FormValidationErrors :errors="formManager.form.first_name.$errors" class="validation-errros" />
      </div>

      <div class="last_name">
        <label :for="formManager.form.last_name.$uid" class="label">Last Name</label>
        <FormBaseInput
          :id="formManager.form.last_name.$uid"
          v-model="formManager.form.last_name.$value"
          :has-error="formManager.form.last_name.$hasError"
          :placeholder="userProfile.last_name"
          :validating="formManager.form.last_name.$validating"
        />
        <FormValidationErrors :errors="formManager.form.last_name.$errors" class="validation-errros" />
      </div>

      <div class="phone">
        <label :for="formManager.form.phone.$uid" class="label">Phone</label>
        <FormBaseInput
          :id="formManager.form.phone.$uid"
          v-model="formManager.form.phone.$value"
          :has-error="formManager.form.phone.$hasError"
          :placeholder="userProfile.phone"
          :validating="formManager.form.phone.$validating"
        />
        <FormValidationErrors :errors="formManager.form.phone.$errors" class="validation-errros" />
      </div>

      <div class="city">
        <label :for="formManager.form.city.$uid" class="label">City</label>
        <FormBaseInput
          :id="formManager.form.city.$uid"
          v-model="formManager.form.city.$value"
          :has-error="formManager.form.city.$hasError"
          :placeholder="userProfile.city"
          :validating="formManager.form.city.$validating"
        />
        <FormValidationErrors :errors="formManager.form.city.$errors" class="validation-errros" />
      </div>

      <div class="zipcode">
        <label :for="formManager.form.zipcode.$uid" class="label">Zipcode</label>
        <FormBaseInput
          :id="formManager.form.zipcode.$uid"
          v-model="formManager.form.zipcode.$value"
          :has-error="formManager.form.zipcode.$hasError"
          :placeholder="userProfile.zipcode"
          :validating="formManager.form.zipcode.$validating"
        />
        <FormValidationErrors :errors="formManager.form.zipcode.$errors" class="validation-errros" />
      </div>

      <div class="address">
        <label :for="formManager.form.address.$uid" class="label">Address</label>
        <FormBaseInput
          :id="formManager.form.address.$uid"
          v-model="formManager.form.address.$value"
          :has-error="formManager.form.address.$hasError"
          :placeholder="userProfile.address"
          :validating="formManager.form.address.$validating"
        />
        <FormValidationErrors :errors="formManager.form.address.$errors" class="validation-errros" />
      </div>

      <div class="place">
        <label :for="formManager.form.place.$uid" class="label">Place</label>
        <FormBaseInput
          :id="formManager.form.place.$uid"
          v-model="formManager.form.place.$value"
          :has-error="formManager.form.place.$hasError"
          :placeholder="userProfile.place"
          :validating="formManager.form.place.$validating"
        />
        <FormValidationErrors :errors="formManager.form.place.$errors" class="validation-errros" />
      </div>

      <div class="country">
        <label class="form-label" for="inputCountry">Country</label>
        <select id="inputCountry" v-model="userProfile.country" class="form-select" name="country" @change="restRegions">
          <option disabled value="choose">Choose...</option>
          <option v-for="country in availableCountries" :key="country.alpha_2" :value="country.alpha_2">
            {{ country.name }}
          </option>
        </select>
      </div>

      <div class="region">
        <label class="form-label" for="inputRegion">Region</label>
        <select id="inputRegion" v-model="userProfile.region" class="form-select" name="region">
          <option disabled value="choose">Choose...</option>
          <option v-for="region in regionsBasedOnAlpha" :key="region.alpha" :value="region.alpha">
            {{ region.name }}
          </option>
        </select>
      </div>

      <div class="button">
        <FormSubmitButtons :submit-text="submitButtonText" :submitting="formManager.submitting" class="buttons float-end" gap="2rem" @reset="formManager.resetFields()" />
      </div>
    </div>
  </FormProvider>
</template>

<script lang="ts">
import store from '@/store'
import { cloneDeep } from 'lodash'
import { exactly, min } from '@/components/Form/Utils'
import RegionsModel from '@/state/country/RegionsModel'
import CountryModel from '@/state/country/CountryModel'
import FormProvider from '@/components/Form/FormProvider.vue'
import FormBaseInput from '@/components/Form/FormBaseInput.vue'
import { Options as Component, Vue } from 'vue-class-component'
import UserProfileModel from '@/state/user/data/UserProfileModel'
import { useValidation, ValidationError } from 'vue3-form-validation'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'

let { validateFields } = useValidation({})

@Component({
  name: 'UserSettings',
  components: {
    FormProvider,
    FormBaseInput,
    FormSubmitButtons,
    FormValidationErrors,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
})
export default class UserSettings extends Vue {
  userProfile = new UserProfileModel()
  userData = new UserProfileModel()
  submitButtonText = 'Update'
  formManager = ({ validateFields } = useValidation({
    first_name: {
      $value: '',
      $rules: [min(2)('First Name has to be longer than 1 characters')],
    },
    last_name: {
      $value: '',
      $rules: [min(2)('Last Name has to be longer than 1 characters')],
    },
    phone: {
      $value: '',
      $rules: [exactly(10)('Phone number has to be 10 characters')],
    },
    city: {
      $value: '',
      $rules: [
        // min(2)("City has to be longer than 1 characters")
      ],
    },
    zipcode: {
      $value: '',
      $rules: [
        // exactly(5)("Zipcode has to be 5 characters")
      ],
    },
    address: {
      $value: '',
      $rules: [
        // min(2)("City has to be longer than 1 characters")
      ],
    },
    place: {
      $value: '',
      $rules: [
        // min(2)("Place has to be longer than 1 characters")
      ],
    },
  }))

  get isAuthenticated(): boolean {
    return store.getters['auth/isAuthenticated']
  }

  get availableCountries(): Array<CountryModel> {
    return store.getters['country/getCountries']
  }

  get regionsBasedOnAlpha(): RegionsModel {
    return store.getters['country/getRegionsBasedOnAlpha']
  }

  async mounted(): Promise<void> {
    document.title = 'My Settings'

    this.userProfileInitialize()
  }

  async restRegions(e: any): Promise<void> {
    const countryAlpha2Key = e.target.value
    await store.dispatch('country/findRegionsBasedOnAlphaFromInput', countryAlpha2Key)
    this.userProfile.region = 'choose'
  }

  handleSubmit = async () => {
    try {
      const formData: any = await validateFields()
      const apiData = {
        user_id: 1,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        place: formData.place,
        city: formData.city,
        zipcode: formData.zipcode,
        address: formData.address,
        country: this.userProfile.country,
        region: this.userProfile.region,
      }

      await store.dispatch('user/updateUserProfile', apiData)
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }

  public userProfileInitialize(): void {
    if (this.isAuthenticated) {
      this.userProfile = cloneDeep(this.userData)
      if (this.userProfile.first_name !== null) {
        this.formManager.form.first_name.$value = cloneDeep(this.userData.first_name)
      }
      if (this.userProfile.last_name !== null) {
        this.formManager.form.last_name.$value = cloneDeep(this.userData.last_name)
      }
      if (this.userProfile.phone !== null) {
        this.formManager.form.phone.$value = String(cloneDeep(this.userData.phone) as unknown as string)
      }
      if (this.userProfile.place !== null) {
        this.formManager.form.place.$value = cloneDeep(this.userData.place)
      }
      if (this.userProfile.city !== null) {
        this.formManager.form.city.$value = cloneDeep(this.userData.city)
      }
      if (this.userProfile.zipcode !== null) {
        this.formManager.form.zipcode.$value = String(cloneDeep(this.userData.zipcode) as unknown as string)
      }
      if (this.userProfile.address !== null) {
        this.formManager.form.address.$value = cloneDeep(this.userData.address)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/User/UserSettings';
</style>
