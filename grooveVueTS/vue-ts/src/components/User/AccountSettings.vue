<template>
  <div class="row">
    <div class="col-lg-3">
      <ProfileImage
          :src="profileImageUrl"
          :fullname="fullname"
          v-model="userDetails.image"
      />
    </div>
    <div class="col-lg-9">
      <div class="card">
        <div class="card-body">
          <form id="userDetailsForm" name="userDetailsForm" class="row g-3">
            <div class="col-md-6">
              <label for="inputFirstName" class="form-label">First Name</label>
              <input v-model="userDetails.first_name" type="text" class="form-control" id="inputFirstName">
            </div>
            <div class="col-md-6">
              <label for="inputLastName" class="form-label">Last Name</label>
              <input v-model="userDetails.last_name" type="text" class="form-control" id="inputLastName">
            </div>
            <div class="col-12">
              <label for="inputPhone" class="form-label">Phone</label>
              <input v-model="userDetails.phone" type="number" class="form-control" id="inputPhone">
            </div>
            <div class="col-md-9">
              <label for="inputCity" class="form-label">City</label>
              <input v-model="userDetails.city" type="text" class="form-control" id="inputCity">
            </div>
            <div class="col-md-3">
              <label for="inputZipcode" class="form-label">Zipcode</label>
              <input v-model="userDetails.zipcode" type="text" class="form-control" id="inputZipcode">
            </div>
            <div class="col-12">
              <label for="inputAddress" class="form-label">Address</label>
              <input v-model="userDetails.address" type="text" class="form-control" id="inputAddress">
            </div>
            <div class="col-12">
              <label for="inputPlace" class="form-label">Place</label>
              <input v-model="userDetails.place" type="text" class="form-control" id="inputPlace">
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
              <button type="submit" class="btn btn-success float-end" @click.prevent="submitForm">Update</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>


<script lang="ts">
import { Options , Vue} from "vue-class-component"
import store from '@/store'
import UserDetailsModel from '@/state/user/data/UserDetailsModel'
import RegionsModel from "@/state/country/RegionsModel"
import {cloneDeep} from "lodash"
import CountryModel from "@/state/country/CountryModel"
import ProfileImage from "@/components/User/ProfileImage.vue"
import { useToast } from "vue-toastification"

const toast = useToast();

@Options({
  name: "AccountSettings",
  components: {
    ProfileImage
  }
})

export default class AccountSettings extends Vue {

  userDetails = new UserDetailsModel()
  profileImageUrl: string = ''

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
    await store.dispatch('user/data/userDataFromRemote')
    await store.dispatch('country/findRegionsBasedOnAlphaForLoggedCustomer')
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
    }
  }

  private submitForm(): void {
    if (this.userDetails.region === 'choose') {
      toast.error("The region field is missing!")
    }
    try {
      this.updateUserProfile()
    } catch (error) {
      throw error
    }
  }

  protected updateUserProfile(): void {
    const formEl = document.getElementById('userDetailsForm') as HTMLFormElement;
    const data = new FormData(formEl)

    if (this.userDetails.address != null){
      data.append('address', this.userDetails.address)
    }
    if (this.userDetails.email != null){
      data.append('email', this.userDetails.email)
    }
    if (this.userDetails.first_name != null){
      data.append('first_name', this.userDetails.first_name)
    }
    if (this.userDetails.last_name != null){
      data.append('last_name', this.userDetails.last_name)
    }
    if (this.userDetails.phone != null){
      const phone = this.userDetails.phone as unknown as string
    }
    if (this.userDetails.place != null){
      data.append('place', this.userDetails.place)
    }
    if (this.userDetails.city != null){
      data.append('city', this.userDetails.city)
    }
    if (this.userDetails.zipcode != null){
      const zipcode = this.userDetails.zipcode as unknown as string
      data.append('zipcode', zipcode)
    }

    if (this.userDetails.country != null){
      data.append('country', this.userDetails.country)
      data.append('region', this.userDetails.region)
    }

    store.dispatch('user/data/updateUserDetails', data)
  }

}
</script>
