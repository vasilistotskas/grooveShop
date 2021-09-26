<template>
  <div class="row" v-if="userDetails && Object.keys(userDetails).length > 0">
    <div class="col-lg-3">
      <div class="py-11 px-5 text-center mb-5 box">
        <img v-bind:src="'http://127.0.0.1:8000' + userDetails.image" class="mb-5 rounded-circle" alt="User Avatar" width="72" height="72">
        <h2 class="fw-bold">{{ fullName }}</h2>
      </div>
    </div>
    <div class="col-lg-9">
      <div class="box">
        <form class="row g-3">
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
            <select name="county" id="inputCountry" class="form-select" v-model="userDetails.country_name">
              <option disabled value="">Choose...</option>
              <option :value="userDetails.country_name">{{ userDetails.country_name }}</option>
<!--              <option v-for="(countiesValue, countyKey, index) in availableCounties"-->
<!--                      :key="index" :value="countyKey">{{ countiesValue }}</option>-->
            </select>
          </div>

          <div class="col-md-6">
            <label for="inputCounty" class="form-label">County</label>
            <select v-model="userDetails.county" id="inputCounty" class="form-select">
              <option disabled>Choose...</option>
              <option :value="userDetails.county">{{ userDetails.county }}</option>
            </select>
          </div>

          <div class="col-12 text-end">
            <button type="submit" class="button is-success">Update</button>
          </div>
        </form>
      </div>

    </div>
  </div>


</template>


<script>

export default {
  name: 'AccountSettings',
  beforeCreate() {
    this.$store.dispatch('getUserDetails')
  },
  mounted() {
    document.title = 'My Settings | grooveShop'
  },
  computed: {
    userDetails: {
      get() {
        return this.$store.getters['getStateUserDetails']
      },
      set(value) {
        this.$store.commit('updateUserDetails', value)
      }
    },
    fullName: {
      get() {
        return this.userDetails.first_name + ' ' + this.userDetails.last_name
      },
    }
  }
}
</script>