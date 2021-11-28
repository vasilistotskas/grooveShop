<template>
  <div class="row">
    <div class="col-lg-3">
      <ProfileImage
          :src="profileImageUrl"
          :fullname="fullname"
          v-model="userDetails.image"/>
    </div>
    <div class="col-lg-9">
      <div class="card">
        <div class="card-body">
          <FormProvider
              id="userDetailsForm"
              name="userDetailsForm"
              title=""
              :formClass="'no-margins'"
              :form="formManager.form"
              :errors="formManager.errors"
              @submit="handleSubmit()">
            <div class="row">
              <div class="first_name col-md-6 mb-3">
                <label :for="formManager.form.first_name.$uid" class="label">First Name</label>
                <BaseInput
                    v-model="formManager.form.first_name.$value"
                    :has-error="formManager.form.first_name.$hasError"
                    :validating="formManager.form.first_name.$validating"
                    :placeholder="userDetails.first_name"
                    :id="formManager.form.first_name.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.first_name.$errors"/>
              </div>

              <div class="last_name col-md-6 mb-3">
                <label :for="formManager.form.last_name.$uid" class="label">Last Name</label>
                <BaseInput
                    v-model="formManager.form.last_name.$value"
                    :has-error="formManager.form.last_name.$hasError"
                    :validating="formManager.form.last_name.$validating"
                    :placeholder="userDetails.last_name"
                    :id="formManager.form.last_name.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.last_name.$errors"/>
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.phone.$uid" class="label">Phone</label>
                <BaseInput
                    v-model="formManager.form.phone.$value"
                    :has-error="formManager.form.phone.$hasError"
                    :validating="formManager.form.phone.$validating"
                    :placeholder="userDetails.phone"
                    :id="formManager.form.phone.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.phone.$errors"/>
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.city.$uid" class="label">City</label>
                <BaseInput
                    v-model="formManager.form.city.$value"
                    :has-error="formManager.form.city.$hasError"
                    :validating="formManager.form.city.$validating"
                    :placeholder="userDetails.city"
                    :id="formManager.form.city.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.city.$errors"/>
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.zipcode.$uid" class="label">Zipcode</label>
                <BaseInput
                    v-model="formManager.form.zipcode.$value"
                    :has-error="formManager.form.zipcode.$hasError"
                    :validating="formManager.form.zipcode.$validating"
                    :placeholder="userDetails.zipcode"
                    :id="formManager.form.zipcode.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.zipcode.$errors"/>
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.address.$uid" class="label">Address</label>
                <BaseInput
                    v-model="formManager.form.address.$value"
                    :has-error="formManager.form.address.$hasError"
                    :validating="formManager.form.address.$validating"
                    :placeholder="userDetails.address"
                    :id="formManager.form.address.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.address.$errors"/>
              </div>

              <div class="last_name col-12 mb-3">
                <label :for="formManager.form.place.$uid" class="label">Place</label>
                <BaseInput
                    v-model="formManager.form.place.$value"
                    :has-error="formManager.form.place.$hasError"
                    :validating="formManager.form.place.$validating"
                    :placeholder="userDetails.place"
                    :id="formManager.form.place.$uid"/>
                <ValidationErrors
                    class="validation-errros"
                    :errors="formManager.form.place.$errors"/>
              </div>

              <div class="col-md-6">
                <label for="inputCountry" class="form-label">Country</label>
                <select name="country" id="inputCountry" class="form-select" v-model="userDetails.country" @change="restRegions">
                  <option disabled value="choose">Choose...</option>
                  <option
                      v-for="country in availableCountries"
                      :key="country.alpha_2"
                      :value="country.alpha_2">
                    {{ country.name }}
                  </option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="inputRegion" class="form-label">Region</label>
                <select name="region" id="inputRegion" class="form-select" v-model="userDetails.region">
                  <option disabled value="choose">Choose...</option>
                  <option
                      v-for="region in regionsBasedOnAlpha"
                      :key="region.alpha"
                      :value="region.alpha">
                    {{ region.name }}
                  </option>
                </select>
              </div>

              <div class="col-12 text-end mt-5">
                <SubmitButtons
                    class="buttons float-end"
                    gap="2rem"
                    :submitText="submitButtonText"
                    @reset="formManager.resetFields()"
                    :submitting="formManager.submitting"/>
              </div>
            </div>

          </FormProvider>
        </div>
      </div>

    </div>
  </div>
</template>


<script lang="ts">
import store from '@/store'
import {cloneDeep} from "lodash"
import { useToast } from "vue-toastification"
import { Options , Vue} from "vue-class-component"
import RegionsModel from "@/state/country/RegionsModel"
import CountryModel from "@/state/country/CountryModel"
import BaseInput from "@/components/Form/BaseInput.vue"
import {equal, min, exactly, required} from "@/components/Form/Utils"
import FormProvider from "@/components/Form/FormProvider.vue"
import ProfileImage from "@/components/User/ProfileImage.vue"
import SubmitButtons from "@/components/Form/SubmitButtons.vue"
import UserDetailsModel from '@/state/user/data/UserDetailsModel'
import {useValidation, ValidationError} from "vue3-form-validation"
import ValidationErrors from "@/components/Form/ValidationErrors.vue"

const toast = useToast()

let {
  form,
  submitting,
  validating,
  errors,
  hasError,
  validateFields,
  resetFields,
  add,
  remove
} = useValidation({})

@Options({
  name: "AccountSettings",
  components: {
    ProfileImage,
    FormProvider,
    BaseInput,
    SubmitButtons,
    ValidationErrors
  }
})

export default class AccountSettings extends Vue {

  formManager = {
    form,
    submitting,
    validating,
    errors,
    hasError,
    validateFields,
    resetFields,
    add,
    remove
  } = useValidation({
    first_name: {
      $value: "",
      $rules: [
        min(2)("First Name has to be longer than 1 characters")
      ]
    },
    last_name: {
      $value: "",
      $rules: [
        min(2)("Last Name has to be longer than 1 characters")
      ]
    },
    phone: {
      $value: "",
      $rules: [
        exactly(10)("Phone number has to be 10 characters")
      ]
    },
    city: {
      $value: "",
      $rules: [
        min(2)("City has to be longer than 1 characters")
      ]
    },
    zipcode: {
      $value: "",
      $rules: [
        exactly(5)("Zipcode has to be 5 characters")
      ]
    },
    address: {
      $value: "",
      $rules: [
        min(2)("City has to be longer than 1 characters")
      ]
    },
    place: {
      $value: "",
      $rules: [
        min(2)("Place has to be longer than 1 characters")
      ]
    }
  })

  userDetails = new UserDetailsModel()
  profileImageUrl: string = ''
  submitButtonText: string = 'Update'

  get isAuthenticated(): boolean {
    return store.getters['user/data/getIsAuthenticated']
  }

  get fullname(): string {
    let first_name = this.userDetails.first_name
    let last_name = this.userDetails.last_name

    if (first_name == null) {
      first_name = ''
    }

    if (last_name == null) {
      last_name = ''
    }

    return first_name + ' ' + last_name
  }

  get userData(): UserDetailsModel {
    if(this.isAuthenticated) {
      return store.getters['user/data/getUserData']
    }
    return new UserDetailsModel
  }

  get availableCountries(): CountryModel {
    return store.getters['country/getCountries']
  }

  get regionsBasedOnAlpha(): RegionsModel {
    return store.getters['country/getRegionsBasedOnAlpha']
  }

  beforeCreate(): void {
    store.dispatch('country/getCountriesFromRemote')
  }

  created() {
    this.$watch(
        () => this.userData,
        (image:UserDetailsModel) => {
          this.profileImageUrl = image.image_url
        }
    )
  }

  async mounted(): Promise<void> {
    document.title = 'My Settings | grooveShop'
    await Promise.all([
      await store.dispatch('user/data/userDataFromRemote'),
      store.dispatch('country/findRegionsBasedOnAlphaForLoggedCustomer')
    ])
    this.userDetailsInitialize()
  }

  async restRegions(e: any): Promise<void> {
    const countryAlpha2Key = e.target.value
    await store.dispatch('country/findRegionsBasedOnAlphaFromInput', countryAlpha2Key)
    this.userDetails.region = 'choose'
  }

  private userDetailsInitialize(): void {
    if (this.isAuthenticated) {
      this.userDetails = cloneDeep(this.userData)
      if (this.userDetails.first_name != null){
        this.formManager.form.first_name.$value = cloneDeep(this.userData.first_name)
      }
      if (this.userDetails.last_name != null){
        this.formManager.form.last_name.$value = cloneDeep(this.userData.last_name)
      }
      if (this.userDetails.phone != null){
        this.formManager.form.phone.$value = String(<unknown | string>cloneDeep(this.userData.phone) as unknown as string)
      }
      if (this.userDetails.place != null){
        this.formManager.form.place.$value = cloneDeep(this.userData.place)
      }
      if (this.userDetails.city != null){
        this.formManager.form.city.$value = cloneDeep(this.userData.city)
      }
      if (this.userDetails.zipcode != null){
        this.formManager.form.zipcode.$value = String(<unknown | string>cloneDeep(this.userData.zipcode) as unknown as string)
      }
      if (this.userDetails.address != null){
        this.formManager.form.address.$value = cloneDeep(this.userData.address)
      }
    }
  }

  private submitForm(): void {
    if (this.userDetails.region === 'choose') {
      toast.error("The region field is missing!")
    }
    this.handleSubmit()
  }

  handleSubmit = async () => {
    try {
      const formData:any = await validateFields()
      const apiData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        place: formData.place,
        city: formData.city,
        zipcode: formData.zipcode,
        address: formData.address,
        country: this.userDetails.country,
        region: this.userDetails.region
      }
      await store.dispatch('user/data/updateUserDetails', apiData)

    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }

}
</script>
