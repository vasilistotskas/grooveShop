<template>
  <div class="row" v-if="userDetails && Object.keys(userDetails).length > 0">
    <div class="col-lg-3">
      <ProfileImage
          :src="userDetails.image"
          :fullname="fullName"
          v-model="userDetails.image"
      />
    </div>
    <div class="col-lg-9">
      <div class="box">
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
            <input v-model="userDetails.phone" type="text" class="form-control" id="inputPhone">
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
            <select name="country" id="inputCountry" class="form-select" v-model="userDetails.country" @change="resetRegion">
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

          <div class="notification is-danger mt-4" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="col-12 text-end mt-5">
            <button type="submit" class="button is-success" @click.prevent="submitForm">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>


</template>


<script>
import ProfileImage from '@/components/User/ProfileImage'

export default {
  name: 'AccountSettings',
  components: {
    ProfileImage
  },
  data() {
    return {
      errors: []
    }
  },
  beforeCreate() {
    this.$store.dispatch('getCountries')
  },
  mounted() {
    document.title = 'My Settings | grooveShop'
    this.$store.dispatch('getUserDetails')
  },
  computed: {
    userDetails: {
      get() {
        return this.$store.getters['getStateUserDetails']
      }
    },
    fullName: {
      get() {
        let first_name = this.userDetails.first_name
        let last_name = this.userDetails.last_name

        if (first_name === null) {
          first_name = ''
        }

        if (last_name === null) {
          last_name = ''
        }

        return first_name + ' ' + last_name
      },
    },
    availableCountries: {
      get() {
        return this.$store.getters['getStateCountries']
      }
    },
    regionsBasedOnAlpha: {
      get() {
        return this.$store.getters['getStateRegionsBasedOnAlpha']
      }
    }
  },
  watch:{
    'userDetails.country': function (newVal, oldVal){
      this.$store.dispatch('getRegionsBasedOnAlpha', newVal)
    }
  },
  methods: {
    resetRegion() {
      this.userDetails.region = 'choose'
    },
    submitForm() {
      this.errors = []
      if (this.userDetails.region === 'choose') {
        this.errors.push('The region field is missing!')
      }
      if (!this.errors.length) {
        try {
          this.updateUserProfile()
        } catch (error) {
          throw error
        }
      }
    },
    updateUserProfile() {
      const data = new FormData(document.getElementById('userDetailsForm'))

      if (this.userDetails.address !== null){
        data.append('address', this.userDetails.address)
      }
      if (this.userDetails.email !== null){
        data.append('email', this.userDetails.email)
      }
      if (this.userDetails.first_name !== null){
        data.append('first_name', this.userDetails.first_name)
      }
      if (this.userDetails.last_name !== null){
        data.append('last_name', this.userDetails.last_name)
      }
      if (this.userDetails.phone !== null){
        data.append('phone', this.userDetails.phone)
      }
      if (this.userDetails.place !== null){
        data.append('place', this.userDetails.place)
      }
      if (this.userDetails.city !== null){
        data.append('city', this.userDetails.city)
      }
      if (this.userDetails.zipcode !== null){
        data.append('zipcode', this.userDetails.zipcode)
      }

      if (this.userDetails.country !== null){
        data.append('country', this.userDetails.country)
        data.append('region', this.userDetails.region)
      }

      this.$store.dispatch('updateUserDetailsAction', data)
          .then(success => {
            toast({
              message: 'Success',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>